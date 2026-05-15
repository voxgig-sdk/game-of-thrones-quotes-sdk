<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility: feature_add

class GameOfThronesQuotesFeatureAdd
{
    public static function call(GameOfThronesQuotesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
