<?php
/**
 * Created by IntelliJ IDEA.
 * User: kiannguyen
 * Date: 18/09/17
 * Time: 10:35 PM
 */
declare(strict_types=1);


namespace StumartApp\Core\Utils;


class Sanitizer
{
    public function __construct()
    {
    }

    public function numericFilter(int $id): int {
        $options = array(
            'options' => array ('default' => 0)
        );
        return (int) filter_var($id, FILTER_SANITIZE_NUMBER_INT, $options);

    }
}