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
  id?: string
  name?: string
  quotes?: any[]
  slug?: string
}

export interface CharacterLoadMatch {
  id: string
}

export interface CharacterListMatch {
  house?: Record<string, any>
  id?: string
  name?: string
  quotes?: any[]
  slug?: string
}

export interface House {
  id?: string
  members?: any[]
  name?: string
  slug?: string
}

export interface HouseLoadMatch {
  id: string
}

export interface HouseListMatch {
  id?: string
  members?: any[]
  name?: string
  slug?: string
}

export interface Random {
  character?: Record<string, any>
  id?: string
  name?: string
  sentence?: string
  slug?: string
}

export interface RandomLoadMatch {
  id: number
}

