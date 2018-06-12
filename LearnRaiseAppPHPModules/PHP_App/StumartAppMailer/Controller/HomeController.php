<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:16 PM
 */
declare(strict_types=1);

namespace StumartApp\Mailer\Controller;

use Silex\ControllerCollection;
use StumartApp\Mailer\Helper\EmailHelper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends BaseController
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    public function setup(): ControllerCollection
    {
        $app = $this->app();
        $controllers = $app['controllers_factory'];

        $controllers->get("/", function() {
            return new Response("Hello World");
        });

        $controllers->get("/send-mail/{id}", function($id) {
            return $this->sendEmail((int) $id);
        });


        return $controllers;
    }

    public function sendEmail(int $id): JsonResponse {
        $json = array(
            'success' => true,
        );
        $id = $this->sanitizer()->numericFilter($id);
        $email = $this->request()->get("email");
        $mailHelper = new EmailHelper("kianbomba@gmail.com");
//        $json['success'] = $mailHelper->sendVerifyToken("abcd");
        return $this->sendJson($json);
    }
}