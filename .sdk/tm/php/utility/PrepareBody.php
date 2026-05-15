<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility: prepare_body

class GameOfThronesQuotesPrepareBody
{
    public static function call(GameOfThronesQuotesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
