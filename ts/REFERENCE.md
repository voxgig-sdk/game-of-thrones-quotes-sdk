# GameOfThronesQuotes TypeScript SDK Reference

Complete API reference for the GameOfThronesQuotes TypeScript SDK.


## GameOfThronesQuotesSDK

### Constructor

```ts
new GameOfThronesQuotesSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GameOfThronesQuotesSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GameOfThronesQuotesSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GameOfThronesQuotesSDK` instance in test mode.


### Instance Methods

#### `Author(data?: object)`

Create a new `Author` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthorEntity` instance.

#### `Character(data?: object)`

Create a new `Character` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CharacterEntity` instance.

#### `House(data?: object)`

Create a new `House` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HouseEntity` instance.

#### `Random(data?: object)`

Create a new `Random` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RandomEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GameOfThronesQuotesSDK.test()`.

**Returns:** `GameOfThronesQuotesSDK` instance in test mode.


---

## AuthorEntity

```ts
const author = client.author
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | ``$OBJECT`` | No |  |
| `sentence` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.author.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthorEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameOfThronesQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CharacterEntity

```ts
const character = client.character
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `house` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `quote` | ``$ARRAY`` | No |  |
| `slug` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.character.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.character.load({ id: 'character_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CharacterEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameOfThronesQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HouseEntity

```ts
const house = client.house
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `member` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `slug` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.house.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.house.load({ id: 'house_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HouseEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameOfThronesQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RandomEntity

```ts
const random = client.random
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | ``$OBJECT`` | No |  |
| `sentence` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.random.load({ id: 'random_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RandomEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameOfThronesQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GameOfThronesQuotesSDK({
  feature: {
    test: { active: true },
  }
})
```

