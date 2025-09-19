<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['firstname'], $data['lastname'], $data['email'], $data['message'])) {
            return new JsonResponse(['error' => 'Champs manquants'], 400);
        }

        $contact = new Contact();
        $contact->setFirstname($data['firstname']);
        $contact->setLastname($data['lastname']);
        $contact->setEmail($data['email']);
        $contact->setContent($data['message']);

        $em->persist($contact);
        $em->flush();

        return new JsonResponse(['success' => true, 'message' => 'Message enregistré avec succès !']);
    }

    #[Route('/api/contacts', name: 'api_contacts', methods: ['GET'])]
    public function list(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $secret = $request->headers->get('X-API-TOKEN');

        if ($secret !== $_ENV['API_SECRET']) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        $contacts = $em->getRepository(Contact::class)->findAll();

        $data = array_map(fn($c) => [
            'id' => $c->getId(),
            'firstname' => $c->getFirstname(),
            'lastname' => $c->getLastname(),
            'email' => $c->getEmail(),
            'content' => $c->getContent(),
        ], $contacts);

        return new JsonResponse($data);
    }

}
