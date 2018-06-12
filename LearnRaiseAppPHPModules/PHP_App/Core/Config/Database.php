<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:39 PM
 */
declare(strict_types=1);


namespace StumartApp\Core\Config;


class Database
{
    private $_db;
    private $_host;
    private $_port;
    private $_driver  = "pdo_mysql";
    private $_username;
    private $_password;
    public function __construct(string $file)
    {
        $str_data = file_get_contents($file);
        $data = json_decode($str_data, true);
        $this->_db = $data['dbname'];
        $this->_host = $data['host'];
        $this->_port = $data['port'];
        $this->_username = $data['username'];
        $this->_password = $data['password'];
    }

    public function getHost(): string {
        return $this->_host;
    }

    public function getUsername(): string {
        return $this->_username;
    }

    public function getDBConfigs(): array {
        return [
            'driver' => $this->_driver,
            'host' => $this->_host,
            'dbname' => $this->_db,
            'user' => $this->_username,
            'password' => $this->_password,
            'port' => $this->_port
        ];
    }
}