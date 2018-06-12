<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:17 PM
 */
declare(strict_types=1);

namespace StumartApp\Mailer\Helper;

use PHPMailer\PHPMailer\PHPMailer;

class EmailHelper
{
    /**
     * @var PHPMailer
     */
    private $_mailer;

    /**
     * @var string
     */
    private $_email;

    public function __construct(string $_email)
    {
        $_mailer = new PHPMailer();
        $this->_email = $_email;
    }

    private function setup(): void {
        $this->_mailer->SMTPDebug = 2;
        $this->_mailer->isSMTP();
        $this->_mailer->Host = 'smtp1.example.com;smtp2.example.com';
        $this->_mailer->SMTPAuth = true;
        $this->_mailer->Username = 'user@example.com';
        $this->_mailer->Password = 'secret';
        $this->_mailer->SMTPSecure = 'tls';
        $this->_mailer->Port = 587;
    }

    public function sendVerifyToken(string $token): bool{
        $this->setup();
        $this->_mailer->Subject = "Verify Your account";
        $this->_mailer->Body = "Please Click on the link here to verify";
        return $this->_mailer->send();
    }
}