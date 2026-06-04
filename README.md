# GameOfThronesQuotes SDK

Fetch random quotes, character lines, and house rosters from HBO's Game of Thrones

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Game of Thrones Quotes API

The Game of Thrones Quotes API is a free, no-auth service maintained by [Shevabam](https://github.com/shevabam) that serves quotations from the HBO television series *Game of Thrones*, along with metadata about the characters who said them and the houses they belong to.

What you get from the API:

- A single random quote via `/random`, or a batch via `/random/{count}`
- Quotes by a specific character via `/author/{slug}/{count}` (for example, `/author/tyrion/2`)
- A character profile with all their quotes via `/character/{slug}` (for example, `/character/jon`)
- A list of every character with their quotes via `/characters`
- A list of all noble houses and their members via `/houses`, or a specific house via `/house/{slug}` (for example, `/house/lannister`)

The service is described as free and no API key is required. License terms are not stated on the homepage, so treat the data as fan-curated and check the project's GitHub repository for current status before relying on it in production.

## Try it

**TypeScript**
```bash
npm install game-of-thrones-quotes
```

**Python**
```bash
pip install game-of-thrones-quotes-sdk
```

**PHP**
```bash
composer require voxgig/game-of-thrones-quotes-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go
```

**Ruby**
```bash
gem install game-of-thrones-quotes-sdk
```

**Lua**
```bash
luarocks install game-of-thrones-quotes-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GameOfThronesQuotesSDK } from 'game-of-thrones-quotes'

const client = new GameOfThronesQuotesSDK({})

// List all authors
const authors = await client.Author().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o game-of-thrones-quotes-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "game-of-thrones-quotes": {
      "command": "/abs/path/to/game-of-thrones-quotes-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Author** | Quote lookups scoped to a named speaker, returning a configurable number of their lines via `/author/{slug}/{count}`. | `/author/{character}/{count}` |
| **Character** | Character profiles with biographical metadata and all associated quotes, served from `/character/{slug}` and `/characters`. | `/characters` |
| **House** | Noble houses of Westeros and their member rosters, served from `/houses` and `/house/{slug}`. | `/houses` |
| **Random** | Randomly selected quote(s) from any speaker, served from `/random` and `/random/{count}`. | `/random/{count}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from gameofthronesquotes_sdk import GameOfThronesQuotesSDK

client = GameOfThronesQuotesSDK({})

# List all authors
authors, err = client.Author(None).list(None, None)
```

### PHP

```php
<?php
require_once 'gameofthronesquotes_sdk.php';

$client = new GameOfThronesQuotesSDK([]);

// List all authors
[$authors, $err] = $client->Author(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go"

client := sdk.NewGameOfThronesQuotesSDK(map[string]any{})

// List all authors
authors, err := client.Author(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "GameOfThronesQuotes_sdk"

client = GameOfThronesQuotesSDK.new({})

# List all authors
authors, err = client.Author(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("game-of-thrones-quotes_sdk")

local client = sdk.new({})

-- List all authors
local authors, err = client:Author(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GameOfThronesQuotesSDK.test()
const result = await client.Author().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GameOfThronesQuotesSDK.test(None, None)
result, err = client.Author(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GameOfThronesQuotesSDK::test(null, null);
[$result, $err] = $client->Author(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Author(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GameOfThronesQuotesSDK.test(nil, nil)
result, err = client.Author(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Author(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Game of Thrones Quotes API

- Upstream: [https://gameofthronesquotes.xyz/](https://gameofthronesquotes.xyz/)

---

Generated from the Game of Thrones Quotes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
