import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "author",
    "accessor": "Author",
    "op": "list",
    "method": "GET",
    "path": "/author/{character}/{count}",
    "args": [
      {
        "name": "character",
        "wire": "character",
        "value": "tyrion"
      },
      {
        "name": "count",
        "wire": "count",
        "value": 2
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "sentence": "x",
        "character": {
          "name": "x",
          "slug": "x"
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "character",
    "accessor": "Character",
    "op": "list",
    "method": "GET",
    "path": "/characters",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "name": "x",
        "slug": "x",
        "house": {
          "name": "x",
          "slug": "x"
        },
        "quotes": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "character",
    "accessor": "Character",
    "op": "load",
    "method": "GET",
    "path": "/character/{character}",
    "args": [
      {
        "name": "id",
        "wire": "character",
        "value": "jon"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "Jon Snow",
      "slug": "jon",
      "house": {
        "name": "House Stark of Winterfell",
        "slug": "stark"
      },
      "quotes": [
        "If I fall, don't bring me back."
      ]
    },
    "idField": "id"
  },
  {
    "entity": "house",
    "accessor": "House",
    "op": "list",
    "method": "GET",
    "path": "/houses",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "slug": "x",
        "name": "x",
        "members": [
          {
            "name": "x",
            "slug": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "house",
    "accessor": "House",
    "op": "load",
    "method": "GET",
    "path": "/house/{house}",
    "args": [
      {
        "name": "id",
        "wire": "house",
        "value": "lannister"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "slug": "lannister",
      "name": "House Lannister of Casterly Rock",
      "members": [
        {
          "name": "Tyrion Lannister",
          "slug": "tyrion"
        },
        {
          "name": "Cersei Lannister",
          "slug": "cersei"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "random",
    "accessor": "Random",
    "op": "load",
    "method": "GET",
    "path": "/random/{count}",
    "args": [
      {
        "name": "id",
        "wire": "count",
        "value": 5
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "sentence": "x",
        "character": {
          "name": "x",
          "slug": "x"
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "random",
    "accessor": "Random",
    "op": "load",
    "method": "GET",
    "path": "/random",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "sentence": "If I fall, don't bring me back.",
      "character": {
        "name": "Jon Snow",
        "slug": "jon"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
