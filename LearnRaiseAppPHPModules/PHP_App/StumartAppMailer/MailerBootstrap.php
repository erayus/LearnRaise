<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:04 PM
 */
declare(strict_types=1);


namespace StumartApp\Mailer;


use Silex\Application;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\TwigServiceProvider;
use StumartApp\Core\Config\Database;
use StumartApp\Mailer\Controller\HomeController;
use Symfony\Component\HttpFoundation\Request;

class MailerBootstrap
{
    /**
     * @var Application
     */
    private $_app;

    /**
     * @var bool
     */
    private $_isDev;

    /**
     * @var Request
     */
    private $_request;

    /**
     * @var Database
     */
    private $_db;

    public function __construct(bool $dev, Request $request, Database $db)
    {
        $this->_app = new Application([
            'debug' => $dev
        ]);
        $this->_isDev = $dev;
        $this->_request = $request;
        $this->_db = $db;
    }

    public function registerService(): MailerBootstrap {
        $this->_app->register(new TwigServiceProvider(), [
            'twig.path' => SYSTEM_PATH . "/templates"
        ]);
        $this->_app->register(new DoctrineServiceProvider(), [
            'db.options' => $this->_db->getDBConfigs()
        ]);
        return $this;
    }

    public function main(): void {
        $this->registerService();
        $this->privateMount();
        $this->_app->run();
    }

    public function privateMount(): MailerBootstrap {
        $this->_app->mount("/", new HomeController($this->_request));
        return $this;
    }
}