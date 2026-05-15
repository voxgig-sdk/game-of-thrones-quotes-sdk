<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK base feature

class GameOfThronesQuotesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GameOfThronesQuotesContext $ctx, array $options): void {}
    public function PostConstruct(GameOfThronesQuotesContext $ctx): void {}
    public function PostConstructEntity(GameOfThronesQuotesContext $ctx): void {}
    public function SetData(GameOfThronesQuotesContext $ctx): void {}
    public function GetData(GameOfThronesQuotesContext $ctx): void {}
    public function GetMatch(GameOfThronesQuotesContext $ctx): void {}
    public function SetMatch(GameOfThronesQuotesContext $ctx): void {}
    public function PrePoint(GameOfThronesQuotesContext $ctx): void {}
    public function PreSpec(GameOfThronesQuotesContext $ctx): void {}
    public function PreRequest(GameOfThronesQuotesContext $ctx): void {}
    public function PreResponse(GameOfThronesQuotesContext $ctx): void {}
    public function PreResult(GameOfThronesQuotesContext $ctx): void {}
    public function PreDone(GameOfThronesQuotesContext $ctx): void {}
    public function PreUnexpected(GameOfThronesQuotesContext $ctx): void {}
}
