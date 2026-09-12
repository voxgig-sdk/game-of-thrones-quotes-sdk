import { AuthorEntity } from './entity/AuthorEntity';
import { CharacterEntity } from './entity/CharacterEntity';
import { HouseEntity } from './entity/HouseEntity';
import { RandomEntity } from './entity/RandomEntity';
export type * from './GameOfThronesQuotesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GameOfThronesQuotesEntityBase } from './GameOfThronesQuotesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GameOfThronesQuotesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Author(entopts?: Record<string, any>): AuthorEntity;
    Character(entopts?: Record<string, any>): CharacterEntity;
    House(entopts?: Record<string, any>): HouseEntity;
    Random(entopts?: Record<string, any>): RandomEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GameOfThronesQuotesSDK;
    tester(testopts?: any, sdkopts?: any): GameOfThronesQuotesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GameOfThronesQuotesSDK;
export { stdutil, config, BaseFeature, GameOfThronesQuotesEntityBase, GameOfThronesQuotesSDK, SDK, };
