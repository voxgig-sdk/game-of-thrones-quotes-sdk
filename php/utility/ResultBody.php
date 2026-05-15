<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility: result_body

class GameOfThronesQuotesResultBody
{
    public static function call(GameOfThronesQuotesContext $ctx): ?GameOfThronesQuotesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
