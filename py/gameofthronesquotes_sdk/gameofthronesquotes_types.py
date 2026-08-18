# Typed models for the GameOfThronesQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Author(TypedDict, total=False):
    character: dict
    sentence: str


class AuthorListMatch(TypedDict):
    character: str
    count: int


class Character(TypedDict, total=False):
    house: dict
    name: str
    quotes: list
    slug: str


class CharacterLoadMatch(TypedDict):
    id: str


class CharacterListMatch(TypedDict, total=False):
    house: dict
    name: str
    quotes: list
    slug: str


class House(TypedDict, total=False):
    members: list
    name: str
    slug: str


class HouseLoadMatch(TypedDict):
    id: str


class HouseListMatch(TypedDict, total=False):
    members: list
    name: str
    slug: str


class Random(TypedDict, total=False):
    character: dict
    name: str
    sentence: str
    slug: str


class RandomLoadMatch(TypedDict):
    id: int
