<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GameOfThronesQuotesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GameOfThronesQuotesBaseFeature();
            case "test":
                return new GameOfThronesQuotesTestFeature();
            default:
                return new GameOfThronesQuotesBaseFeature();
        }
    }
}
