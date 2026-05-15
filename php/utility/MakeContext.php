<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GameOfThronesQuotesMakeContext
{
    public static function call(array $ctxmap, ?GameOfThronesQuotesContext $basectx): GameOfThronesQuotesContext
    {
        return new GameOfThronesQuotesContext($ctxmap, $basectx);
    }
}
