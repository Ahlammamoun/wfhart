<?php

namespace App\Controller;

use App\Entity\Assessment;
use App\Entity\Candidat;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/assessments')]
class AssessmentController extends AbstractController
{
    #[Route('', name: 'get_assessments', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $assessments = $em->getRepository(Assessment::class)->findAll();

        $data = [];
        foreach ($assessments as $assessment) {
            $data[] = [
                'id' => $assessment->getId(),
                'candidatId' => $assessment->getCandidat()?->getId(),
                'resultJson' => json_decode($assessment->getResultJson(), true),
                'summary' => $assessment->getSummary(),
                'createdAt' => $assessment->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_assessment', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['candidatId'])) {
            return $this->json(['error' => 'candidatId is required'], 400);
        }

        $candidat = $em->getRepository(Candidat::class)->find($data['candidatId']);
        if (!$candidat) {
            return $this->json(['error' => 'Candidat not found'], 404);
        }

        $results = $data['resultJson'] ?? [];
        if (!is_array($results)) {
            return $this->json(['error' => 'resultJson must be an object'], 400);
        }

        $assessment = new Assessment();
        $assessment->setCandidat($candidat);
        $assessment->setResultJson($results); // ← array direct, plus de json_encode

        $assessment->setSummary($this->generatePersonalityProfile($results));
        $assessment->setCreatedAt(new \DateTimeImmutable());

        $em->persist($assessment);
        $em->flush();

        return $this->json([
            'status' => 'Assessment created!',
            'id' => $assessment->getId(),
            'candidatId' => $candidat->getId()
        ], 201);
    }

    #[Route('/candidat/{id}', name: 'get_assessments_by_candidat', methods: ['GET'])]
    public function byCandidat(int $id, EntityManagerInterface $em): JsonResponse
    {
        $candidat = $em->getRepository(Candidat::class)->find($id);
        if (!$candidat) {
            return $this->json(['error' => 'Candidat not found'], 404);
        }

        $data = [];
        foreach ($candidat->getAssessments() as $assessment) {
            $data[] = [
                'id' => $assessment->getId(),
                'resultJson' => json_decode($assessment->getResultJson(), true),
                'summary' => $assessment->getSummary(),
                'createdAt' => $assessment->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    private function generatePersonalityProfile(array $results): string
    {
        $creativity = $results['creativity'] ?? 0;
        $teamwork = $results['teamwork'] ?? 0;
        $rigor = $results['rigor'] ?? 0;
        $curiosity = $results['curiosity'] ?? 0;

        // --- Profils types ---
        if ($creativity >= 4 && $curiosity >= 4) {
            return "Innovateur : créatif et curieux, aime explorer de nouvelles idées.";
        }

        if ($teamwork >= 4 && $curiosity >= 4) {
            return "Leader collaboratif : sociable, curieux et capable de fédérer un groupe.";
        }

        if ($rigor >= 4 && $creativity <= 2) {
            return "Analyste méthodique : organisé, logique et fiable.";
        }

        if ($teamwork <= 2 && $rigor >= 3) {
            return "Indépendant pragmatique : préfère travailler seul, efficace et orienté résultats.";
        }

        if ($curiosity >= 5 && $rigor <= 2) {
            return "Explorateur : avide de découvertes, préfère la flexibilité à la structure.";
        }

        // --- Par défaut ---
        return "Profil équilibré : qualités variées sans trait dominant marqué.";
    }

}

