<?php
declare(strict_types=1);

// Typed models for the GameOfThronesQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Author entity data model. */
class Author
{
    public ?array $character = null;
    public ?string $sentence = null;
}

/** Request payload for Author#list. */
class AuthorListMatch
{
    public string $character;
    public int $count;
}

/** Character entity data model. */
class Character
{
    public ?array $house = null;
    public ?string $name = null;
    public ?array $quotes = null;
    public ?string $slug = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public string $id;
}

/** Request payload for Character#list. */
class CharacterListMatch
{
    public ?array $house = null;
    public ?string $name = null;
    public ?array $quotes = null;
    public ?string $slug = null;
}

/** House entity data model. */
class House
{
    public ?array $members = null;
    public ?string $name = null;
    public ?string $slug = null;
}

/** Request payload for House#load. */
class HouseLoadMatch
{
    public string $id;
}

/** Request payload for House#list. */
class HouseListMatch
{
    public ?array $members = null;
    public ?string $name = null;
    public ?string $slug = null;
}

/** Random entity data model. */
class Random
{
    public ?array $character = null;
    public ?string $name = null;
    public ?string $sentence = null;
    public ?string $slug = null;
}

/** Request payload for Random#load. */
class RandomLoadMatch
{
    public ?int $id = null;
}

