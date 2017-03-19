<?php

namespace BackendBundle\Controller;
use BackendBundle\Entity\Job;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;



use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    // returns jobs list json
    public function indexAction()
    {
        $data = $this->getDoctrine()
            ->getRepository(Job::class)
            ->getJobs();

        return new Response(
            json_encode($data),
            $data ? Response::HTTP_OK : Response::HTTP_NO_CONTENT,
            array('Content-Type' => 'application/json')
        );
    }

    // creates job and returns json
    public function createJobAction(Request $request)
    {
        $job = new Job();

        $job->setName($request->get('name'));
        $validator = $this->get('validator');
        $errors = $validator->validate($job);
        if (count($errors) > 0) {
            $msg = (string) $errors;
            $status = false;
        } else {
            if ($status = $this->getDoctrine()->
                getRepository(Job::class)
                    ->createJob($job)) {
                $msg = 'Tarea creada correctamente';
            } else {
                $status = false;
                $msg = 'Ya existe una tarea con ese nombre';
            }
        }

        return new Response(
            json_encode($msg),
            $status ? Response::HTTP_CREATED : Response::HTTP_BAD_REQUEST,
            array('Content-Type' => 'application/json')
        );
    }
}
