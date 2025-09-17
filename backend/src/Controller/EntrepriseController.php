<?php

namespace App\Controller;

use App\Entity\Entreprise;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/entreprises')]
class EntrepriseController extends AbstractController
{
    #[Route('', name: 'get_entreprises', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $entreprises = $em->getRepository(Entreprise::class)->findAll();

        $data = [];
        foreach ($entreprises as $entreprise) {
            $data[] = [
                'id' => $entreprise->getId(),
                'name' => $entreprise->getName(),
                'sector' => $entreprise->getSector(),
                'location' => $entreprise->getLocation(),
                'description' => $entreprise->getDescription(),
                'createdAt' => $entreprise->getCreatedAt()->format('Y-m-d H:i:s'),
                'userCount' => count($entreprise->getUsers()),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_entreprise', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'])) {
            return $this->json(['error' => 'Email is required for recruiter user'], 400);
        }

        // Vérifier si un User existe déjà
        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if ($user) {
            return $this->json(['error' => 'A recruiter with this email already exists'], 400);
        }

        // Créer l'entreprise
        $entreprise = new Entreprise();
        $entreprise->setName($data['name'] ?? '');
        $entreprise->setSector($data['sector'] ?? null);
        $entreprise->setLocation($data['location'] ?? null);
        $entreprise->setDescription($data['description'] ?? null);
        $entreprise->setCreatedAt(new \DateTimeImmutable());

        $em->persist($entreprise);

        // Créer un recruteur associé à cette entreprise
        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(password_hash('changeme123', PASSWORD_BCRYPT)); // provisoire
        $user->setRoles(['ROLE_RECRUITER']);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setEntreprise($entreprise);

        $em->persist($user);

        $em->flush();

        return $this->json([
            'status' => 'Entreprise created!',
            'id' => $entreprise->getId(),
            'recruiterUserId' => $user->getId()
        ], 201);
    }
}
