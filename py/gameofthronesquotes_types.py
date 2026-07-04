# Typed models for the GameOfThronesQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Author:
    character: Optional[dict] = None
    sentence: Optional[str] = None


@dataclass
class AuthorListMatch:
    character: str
    count: int


@dataclass
class Character:
    house: Optional[dict] = None
    name: Optional[str] = None
    quote: Optional[list] = None
    slug: Optional[str] = None


@dataclass
class CharacterLoadMatch:
    id: str


@dataclass
class CharacterListMatch:
    house: Optional[dict] = None
    name: Optional[str] = None
    quote: Optional[list] = None
    slug: Optional[str] = None


@dataclass
class House:
    member: Optional[list] = None
    name: Optional[str] = None
    slug: Optional[str] = None


@dataclass
class HouseLoadMatch:
    id: str


@dataclass
class HouseListMatch:
    member: Optional[list] = None
    name: Optional[str] = None
    slug: Optional[str] = None


@dataclass
class Random:
    character: Optional[dict] = None
    sentence: Optional[str] = None


@dataclass
class RandomLoadMatch:
    id: int

