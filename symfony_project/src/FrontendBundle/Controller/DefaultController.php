<?php

namespace FrontendBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use BackendBundle\Entity\Job;



class DefaultController extends Controller
{
    public function indexAction()
    {
        $job = new Job();

        $form = $this->createFormBuilder($job)
            ->add('name', TextType::class)
            ->add('save', SubmitType::class, array('label' => 'Create task'))
            ->getForm();

        return $this->render('FrontendBundle:Default:index.html.twig',
            array(
                'form' => $form->createView(),
                'jobs' => array())
        );
    }

    public function listAction(Request $request)
    {
        $arrJobs = json_decode($request->get('jobs'), true);

        return $this->render('FrontendBundle:Default:list.html.twig',
            array('jobs' => $arrJobs));
    }

}
