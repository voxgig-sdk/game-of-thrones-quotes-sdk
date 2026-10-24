<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK configuration

class GameOfThronesQuotesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GameOfThronesQuotes",
                "slug" => "game-of-thrones-quotes",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.gameofthronesquotes.xyz/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "author" => [],
                    "character" => [],
                    "house" => [],
                    "random" => [],
                ],
            ],
            "entity" => [
        'author' => [
          'fields' => [
            [
              'name' => 'character',
              'title' => 'Character',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sentence',
              'title' => 'Sentence',
              'type' => '`$STRING`',
              'short' => 'The quote text',
            ],
          ],
          'name' => 'author',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/author/{character}/{count}',
                  'segments' => [
                    [
                      'lit' => 'author',
                    ],
                    [
                      'var' => 'character',
                    ],
                    [
                      'var' => 'count',
                    ],
                  ],
                  'parts' => [
                    'author',
                    '{character}',
                    '{count}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'character',
                        'orig' => 'character',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'tyrion',
                      ],
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 2,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'character',
                      'count',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'character' => [
          'fields' => [
            [
              'name' => 'house',
              'title' => 'House',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Full name of the character',
            ],
            [
              'name' => 'quotes',
              'title' => 'Quotes',
              'type' => '`$ARRAY`',
              'short' => 'Quotes by this character',
            ],
            [
              'name' => 'slug',
              'title' => 'Slug',
              'type' => '`$STRING`',
              'short' => 'URL-friendly identifier for the character',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'character',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/characters',
                  'segments' => [
                    [
                      'lit' => 'characters',
                    ],
                  ],
                  'parts' => [
                    'characters',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/character/{character}',
                  'segments' => [
                    [
                      'lit' => 'character',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'character',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'character' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'character',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'jon',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'house' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'members',
              'title' => 'Members',
              'type' => '`$ARRAY`',
              'short' => 'Members belonging to this house',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Full name of the house',
            ],
            [
              'name' => 'slug',
              'title' => 'Slug',
              'type' => '`$STRING`',
              'short' => 'URL-friendly identifier for the house',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'house',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/houses',
                  'segments' => [
                    [
                      'lit' => 'houses',
                    ],
                  ],
                  'parts' => [
                    'houses',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/house/{house}',
                  'segments' => [
                    [
                      'lit' => 'house',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'house',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'house' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'house',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'lannister',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'random' => [
          'fields' => [
            [
              'name' => 'character',
              'title' => 'Character',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sentence',
              'title' => 'Sentence',
              'type' => '`$STRING`',
              'short' => 'The quote text',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'random',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random/{count}',
                  'segments' => [
                    [
                      'lit' => 'random',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'random',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'count' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 5,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random',
                  'segments' => [
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'parts' => [
                    'random',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GameOfThronesQuotesFeatures::make_feature($name);
    }
}
