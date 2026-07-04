// Typed models for the GameOfThronesQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Author is the typed data model for the author entity.
type Author struct {
	Character *map[string]any `json:"character,omitempty"`
	Sentence *string `json:"sentence,omitempty"`
}

// AuthorListMatch is the typed request payload for Author.ListTyped.
type AuthorListMatch struct {
	Character string `json:"character"`
	Count int `json:"count"`
}

// Character is the typed data model for the character entity.
type Character struct {
	House *map[string]any `json:"house,omitempty"`
	Name *string `json:"name,omitempty"`
	Quote *[]any `json:"quote,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id string `json:"id"`
}

// CharacterListMatch mirrors the character fields as an all-optional match
// filter (Go analog of Partial<Character>).
type CharacterListMatch struct {
	House *map[string]any `json:"house,omitempty"`
	Name *string `json:"name,omitempty"`
	Quote *[]any `json:"quote,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// House is the typed data model for the house entity.
type House struct {
	Member *[]any `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// HouseLoadMatch is the typed request payload for House.LoadTyped.
type HouseLoadMatch struct {
	Id string `json:"id"`
}

// HouseListMatch mirrors the house fields as an all-optional match
// filter (Go analog of Partial<House>).
type HouseListMatch struct {
	Member *[]any `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// Random is the typed data model for the random entity.
type Random struct {
	Character *map[string]any `json:"character,omitempty"`
	Sentence *string `json:"sentence,omitempty"`
}

// RandomLoadMatch is the typed request payload for Random.LoadTyped.
type RandomLoadMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
