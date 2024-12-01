// @ts-check
import { resolved, rejected, propInfo} from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, ITyper} from './ts-refs/be-formalizing/types.d.ts' */;

/**
 * @implements {Actions}
 * 
 */
class BeFormalizing extends BE {
        /**
     * @type {BEConfig<BAP, Actions & IEnhancement>}
     */
    static config = {
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async addFormalizeBtn(self){
        return /** @type {PAP} */ ({
        });
    }
}

await BeFormalizing.bootUp();
export { BeFormalizing }