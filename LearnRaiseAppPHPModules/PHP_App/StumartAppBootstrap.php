<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:02 PM
 */


declare(strict_types=1);
define("SYSTEM_PATH", dirname(__FILE__));
require_once SYSTEM_PATH . "/vendor/autoload.php";

use Symfony\Component\HttpFoundation\Request;
use StumartApp\Mailer\MailerBootstrap;
use StumartApp\Core\Config\Database;

class StumartAppBootstrap
{
    private $_devMode = true;

    /**
     * @var Request
     */
    private $_request;

    /**
     * @var Database
     */
    private $_db;

    public function __construct(){
        $this->_request = new Request($_GET, $_POST, [], $_COOKIE, $_FILES, $_SERVER);
        $this->_db = new Database(SYSTEM_PATH . "/Config/db.conf.json");
    }

    public function runMailer(): void {
        $mailer = new MailerBootstrap($this->_devMode, $this->_request,$this->_db);
        $mailer->main();
    }
}