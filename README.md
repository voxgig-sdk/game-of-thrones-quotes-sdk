# GameOfThronesQuotes SDK

Game of Thrones Quotes API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { GameOfThronesQuotesSDK } from 'game-of-thrones-quotes'

const client = new GameOfThronesQuotesSDK({
  apikey: process.env.GAME-OF-THRONES-QUOTES_APIKEY,
})

// List all authors
const authors = await client.Author().list()
console.log(authors.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Author** |  | `/author/{character}/{count}` |
| **Character** |  | `/characters` |
| **House** |  | `/houses` |
| **Random** |  | `/random/{count}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from gameofthronesquotes_sdk import GameOfThronesQuotesSDK

client = GameOfThronesQuotesSDK({
    "apikey": os.environ.get("GAME-OF-THRONES-QUOTES_APIKEY"),
})

# List all authors
authors, err = client.Author().list()
print(authors)
```

### PHP

```php
<?php
require_once 'gameofthronesquotes_sdk.php';

$client = new GameOfThronesQuotesSDK([
    "apikey" => getenv("GAME-OF-THRONES-QUOTES_APIKEY"),
]);

// List all authors
[$authors, $err] = $client->Author()->list();
print_r($authors);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go"

client := sdk.NewGameOfThronesQuotesSDK(map[string]any{
    "apikey": os.Getenv("GAME-OF-THRONES-QUOTES_APIKEY"),
})

// List all authors
authors, err := client.Author(nil).List(nil, nil)
fmt.Println(authors)
```

### Ruby

```ruby
require_relative "GameOfThronesQuotes_sdk"

client = GameOfThronesQuotesSDK.new({
  "apikey" => ENV["GAME-OF-THRONES-QUOTES_APIKEY"],
})

# List all authors
authors, err = client.Author().list
puts authors
```

### Lua

```lua
local sdk = require("game-of-thrones-quotes_sdk")

local client = sdk.new({
  apikey = os.getenv("GAME-OF-THRONES-QUOTES_APIKEY"),
})

-- List all authors
local authors, err = client:Author():list()
print(authors)
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
client = GameOfThronesQuotesSDK.test()
result, err = client.Author().load({"id": "test01"})
```

### PHP

```php
$client = GameOfThronesQuotesSDK::test();
[$result, $err] = $client->Author()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Author(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GameOfThronesQuotesSDK.test
result, err = client.Author().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Author():load({ id = "test01" })
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

---

Generated from the Game of Thrones Quotes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
