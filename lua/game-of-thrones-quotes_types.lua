-- Typed models for the GameOfThronesQuotes SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Author
---@field character? table
---@field sentence? string

---@class AuthorListMatch
---@field character string
---@field count number

---@class Character
---@field house? table
---@field name? string
---@field quotes? table
---@field slug? string

---@class CharacterLoadMatch
---@field id string

---@class CharacterListMatch
---@field house? table
---@field name? string
---@field quotes? table
---@field slug? string

---@class House
---@field members? table
---@field name? string
---@field slug? string

---@class HouseLoadMatch
---@field id string

---@class HouseListMatch
---@field members? table
---@field name? string
---@field slug? string

---@class Random
---@field character? table
---@field name? string
---@field sentence? string
---@field slug? string

---@class RandomLoadMatch
---@field id? number

local M = {}

return M
