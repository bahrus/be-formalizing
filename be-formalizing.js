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
        propDefaults: {
            byob: true,
            triggerInsertPosition: 'afterbegin',
            buttonContent: '⚗️'
        },
        propInfo: {
            ...propInfo,
            trigger: {
                ro: true
            }
        },
        positractions: [resolved, rejected],
        compacts:{
            when_triggerInsertPosition_changes_invoke_addFormalizeBtn: 0
        },
        actions:{
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            }
        },
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async addFormalizeBtn(self){
        let byob = true;
        const {triggerInsertPosition, enhancedElement} = self;
        const {findAdjacentElement} = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = /** @type {HTMLButtonElement | null} */ (findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger'));
        if(trigger === null){
            byob = false;
            trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.classList.add('be-formalizing-trigger');
            trigger.ariaLabel = 'Configure form.';
            trigger.title = 'Configure form.';
            enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
        }
        return /** @type {PAP} */ ({
            trigger: new WeakRef(trigger),
            resolved: true,
            byob
        });

    }

    /**
     * 
     * @param {BAP} self 
     */
    setBtnContent(self){
        const {buttonContent, trigger} = self;
        const triggerEl = trigger.deref();
        if(triggerEl === undefined) return;
        //TODO: use trusted types
        triggerEl.textContent = buttonContent;
    }
}

await BeFormalizing.bootUp();
export { BeFormalizing }