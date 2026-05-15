<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility: result_headers

class GameOfThronesQuotesResultHeaders
{
    public static function call(GameOfThronesQuotesContext $ctx): ?GameOfThronesQuotesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
