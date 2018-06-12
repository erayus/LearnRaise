<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:02 PM
 */

define("APP_PATH", dirname(dirname(__DIR__)));

require_once APP_PATH . "/PHP_App/StumartAppBootstrap.php" ;

$app = new StumartAppBootstrap();
$app->runMailer();