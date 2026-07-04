// Typed models for the GameOfThronesQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Author {
  character?: Record<string, any>
  sentence?: string
}

export interface AuthorListMatch {
  character: string
  count: number
}

export interface Character {
  house?: Record<string, any>
  name?: string
  quote?: any[]
  slug?: string
}

export interface CharacterLoadMatch {
  id: string
}

export type CharacterListMatch = Partial<Character>

export interface House {
  member?: any[]
  name?: string
  slug?: string
}

export interface HouseLoadMatch {
  id: string
}

export type HouseListMatch = Partial<House>

export interface Random {
  character?: Record<string, any>
  sentence?: string
}

export interface RandomLoadMatch {
  id: number
}

