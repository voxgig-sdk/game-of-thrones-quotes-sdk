import { GameOfThronesQuotesEntityBase } from '../GameOfThronesQuotesEntityBase';
import type { GameOfThronesQuotesSDK } from '../GameOfThronesQuotesSDK';
import type { Control } from '../types';
import type { Random, RandomLoadMatch } from '../GameOfThronesQuotesTypes';
declare class RandomEntity extends GameOfThronesQuotesEntityBase<Random> {
    constructor(client: GameOfThronesQuotesSDK, entopts: any);
    make(this: RandomEntity): RandomEntity;
    load(this: any, reqmatch?: RandomLoadMatch, ctrl?: Control): Promise<RandomEntity>;
}
export { RandomEntity };
