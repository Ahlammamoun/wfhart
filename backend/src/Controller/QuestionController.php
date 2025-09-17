<?php

namespace App\Controller;

use App\Repository\QuestionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class QuestionController extends AbstractController
{
    #[Route('/api/questions', name: 'api_questions', methods: ['GET'])]
    public function list(QuestionRepository $repo): JsonResponse
    {
        $questions = $repo->findAll();

        $data = array_map(fn($q) => [
            'id' => $q->getId(),
            'text' => $q->getText(),
            'trait' => $q->getTrait(),
        ], $questions);

        return $this->json($data);
    }
}
