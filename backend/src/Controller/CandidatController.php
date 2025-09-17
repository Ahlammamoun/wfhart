<?php

namespace App\Controller;

use App\Entity\Candidat;
use App\Entity\User;
use App\Repository\AssessmentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/candidats')]
class CandidatController extends AbstractController
{
    #[Route('', name: 'get_candidats', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $candidats = $em->getRepository(Candidat::class)->findAll();

        $data = [];
        foreach ($candidats as $candidat) {
            $data[] = [
                'id' => $candidat->getId(),
                'firstname' => $candidat->getFirstname(),
                'lastname' => $candidat->getLastname(),
                'email' => $candidat->getEmail(),
                'cvUrl' => $candidat->getCvUrl(),
                'softSkills' => $candidat->getSoftSkills(),
                'createdAt' => $candidat->getCreatedAt()->format('Y-m-d H:i:s'),
                'userId' => $candidat->getUser()?->getId(),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_candidat', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'])) {
            return $this->json(['error' => 'Email is required'], 400);
        }

        // Vérifier si un User existe déjà avec cet email
        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user) {
            // Créer un nouveau User
            $user = new User();
            $user->setEmail($data['email']);
            $user->setPassword(password_hash('changeme123', PASSWORD_BCRYPT)); // provisoire
            $user->setRoles(['ROLE_CANDIDATE']);
            $user->setCreatedAt(new \DateTimeImmutable());

            $em->persist($user);
        }

        // Vérifier si ce User a déjà un Candidat
        $existingCandidat = $em->getRepository(Candidat::class)->findOneBy(['user' => $user]);
        if ($existingCandidat) {
            return $this->json([
                'error' => 'A candidat already exists for this user'
            ], 400);
        }

        // Créer le Candidat
        $candidat = new Candidat();
        $candidat->setFirstname($data['firstname'] ?? '');
        $candidat->setLastname($data['lastname'] ?? '');
        $candidat->setEmail($data['email']);
        $candidat->setCvUrl($data['cvUrl'] ?? null);
        $candidat->setSoftSkills($data['softSkills'] ?? []);
        $candidat->setCreatedAt(new \DateTimeImmutable());
        $candidat->setUser($user);

        $em->persist($candidat);
        $em->flush();

        return $this->json([
            'status' => 'Candidat created!',
            'id' => $candidat->getId(),
            'userId' => $user->getId()
        ], 201);
    }

    #[Route('/{id}', name: 'get_candidat', methods: ['GET'])]
    public function show(Candidat $candidat): JsonResponse
    {
        return $this->json([
            'id' => $candidat->getId(),
            'firstname' => $candidat->getFirstname(),
            'lastname' => $candidat->getLastname(),
            'email' => $candidat->getEmail(),
            'cvUrl' => $candidat->getCvUrl(),
            'softSkills' => $candidat->getSoftSkills(),
            'createdAt' => $candidat->getCreatedAt()->format('Y-m-d H:i:s'),
            'userId' => $candidat->getUser()?->getId(),
        ]);
    }

    #[Route('/{id}/assessments', name: 'get_candidat_assessments', methods: ['GET'])]
    public function assessments(Candidat $candidat, AssessmentRepository $repo): JsonResponse
    {
        $assessments = $repo->findBy(['candidat' => $candidat]);

        $data = array_map(fn($a) => [
            'id' => $a->getId(),
            'summary' => $a->getSummary(),
            'resultJson' => $a->getResultJson(),
            'createdAt' => $a->getCreatedAt()->format('Y-m-d H:i:s'),
        ], $assessments);

        return $this->json($data);
    }
}
