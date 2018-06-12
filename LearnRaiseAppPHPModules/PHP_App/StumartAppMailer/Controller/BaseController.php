<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:18 PM
 */
declare(strict_types=1);


namespace StumartApp\Mailer\Controller;


use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Silex\ControllerCollection;
use StumartApp\Core\Utils\Sanitizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

abstract class BaseController implements ControllerProviderInterface
{
    /**
     * @var Request
     */
    private $_request;

    /**
     * @var Application
     */
    private $_app;

    /**
     * @var Sanitizer
     */
    private $_sanitizer;

    /**
     * BaseController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->_request = $request;
        $this->_sanitizer = new Sanitizer();
    }

    /**
     * @return Request
     */
    protected final function request(): Request
    {
        return $this->_request;
    }

    protected final function app(): Application
    {
        return $this->_app;
    }

    public function connect(Application $app)
    {
        $this->_app = $app;
        $controllers = $this->setup();
        return $controllers;
    }

    protected final function sendJson(array $json): JsonResponse {
        $jsonResponse = new JsonResponse($json);
        $jsonResponse->headers->set("Content-type", "application/json");
        return $jsonResponse;
    }

    protected final function sanitizer(): Sanitizer {
        return $this->_sanitizer;
    }

    public abstract function setup(): ControllerCollection;
}