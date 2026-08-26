# GameOfThronesQuotes Golang SDK Reference

Complete API reference for the GameOfThronesQuotes Golang SDK.


## GameOfThronesQuotesSDK

### Constructor

```go
func NewGameOfThronesQuotesSDK(options map[string]any) *GameOfThronesQuotesSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GameOfThronesQuotesSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GameOfThronesQuotesSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Author(data map[string]any) GameOfThronesQuotesEntity`

Create a new `Author` entity instance. Pass `nil` for no initial data.

#### `Character(data map[string]any) GameOfThronesQuotesEntity`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `House(data map[string]any) GameOfThronesQuotesEntity`

Create a new `House` entity instance. Pass `nil` for no initial data.

#### `Random(data map[string]any) GameOfThronesQuotesEntity`

Create a new `Random` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AuthorEntity

```go
author := client.Author(nil)
fmt.Println(author.GetName()) // "author"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `map[string]any` | No |  |
| `sentence` | `string` | No | The quote text |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Author(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CharacterEntity

```go
character := client.Character(nil)
fmt.Println(character.GetName()) // "character"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `house` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No | Full name of the character |
| `quotes` | `[]any` | No | Quotes by this character |
| `slug` | `string` | No | URL-friendly identifier for the character |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Character(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Character(nil).Load(map[string]any{"id": "character_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HouseEntity

```go
house := client.House(nil)
fmt.Println(house.GetName()) // "house"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `members` | `[]any` | No | Members belonging to this house |
| `name` | `string` | No | Full name of the house |
| `slug` | `string` | No | URL-friendly identifier for the house |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.House(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.House(nil).Load(map[string]any{"id": "house_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HouseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RandomEntity

```go
random := client.Random(nil)
fmt.Println(random.GetName()) // "random"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No | Full name of the character |
| `sentence` | `string` | No | The quote text |
| `slug` | `string` | No | URL-friendly identifier for the character |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Random(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RandomEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGameOfThronesQuotesSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

