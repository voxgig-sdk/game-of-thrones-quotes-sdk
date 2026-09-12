import { GameOfThronesQuotesEntityBase } from '../GameOfThronesQuotesEntityBase';
import type { GameOfThronesQuotesSDK } from '../GameOfThronesQuotesSDK';
import type { Control } from '../types';
import type { House, HouseLoadMatch, HouseListMatch } from '../GameOfThronesQuotesTypes';
declare class HouseEntity extends GameOfThronesQuotesEntityBase<House> {
    constructor(client: GameOfThronesQuotesSDK, entopts: any);
    make(this: HouseEntity): HouseEntity;
    load(this: any, reqmatch?: HouseLoadMatch, ctrl?: Control): Promise<HouseEntity>;
    list(this: any, reqmatch?: HouseListMatch, ctrl?: Control): Promise<HouseEntity[]>;
}
export { HouseEntity };
