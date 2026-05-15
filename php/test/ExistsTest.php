<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK exists test

require_once __DIR__ . '/../gameofthronesquotes_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GameOfThronesQuotesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
