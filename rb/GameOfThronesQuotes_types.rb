# frozen_string_literal: true

# Typed models for the GameOfThronesQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Author entity data model.
#
# @!attribute [rw] character
#   @return [Hash, nil]
#
# @!attribute [rw] sentence
#   @return [String, nil]
Author = Struct.new(
  :character,
  :sentence,
  keyword_init: true
)

# Request payload for Author#list.
#
# @!attribute [rw] character
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer]
AuthorListMatch = Struct.new(
  :character,
  :count,
  keyword_init: true
)

# Character entity data model.
#
# @!attribute [rw] house
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
Character = Struct.new(
  :house,
  :name,
  :quote,
  :slug,
  keyword_init: true
)

# Request payload for Character#load.
#
# @!attribute [rw] id
#   @return [String]
CharacterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Character#list.
#
# @!attribute [rw] house
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
CharacterListMatch = Struct.new(
  :house,
  :name,
  :quote,
  :slug,
  keyword_init: true
)

# House entity data model.
#
# @!attribute [rw] member
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
House = Struct.new(
  :member,
  :name,
  :slug,
  keyword_init: true
)

# Request payload for House#load.
#
# @!attribute [rw] id
#   @return [String]
HouseLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for House#list.
#
# @!attribute [rw] member
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
HouseListMatch = Struct.new(
  :member,
  :name,
  :slug,
  keyword_init: true
)

# Random entity data model.
#
# @!attribute [rw] character
#   @return [Hash, nil]
#
# @!attribute [rw] sentence
#   @return [String, nil]
Random = Struct.new(
  :character,
  :sentence,
  keyword_init: true
)

# Request payload for Random#load.
#
# @!attribute [rw] id
#   @return [Integer, nil]
RandomLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

