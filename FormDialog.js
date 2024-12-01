// @ts-check
/** @import {Actions, PAP, AllProps, AP, BAP, ITyper, IFormDialog} from './ts-refs/be-formalizing/types.d.ts' */;

/**
 * @implements {IFormDialog}
 * @implements {EventListenerObject}
 */
export class FormDialog{
    /**
     * @type {WeakRef<BAP>}
     */
    #selfRef;

    /**
     * 
     * @param {BAP} self 
     */
    constructor(self){
        this.#selfRef = new WeakRef(self);
    }

    /**
     * @type {HTMLDialogElement}
     */
    #dialog;

    #dialogAC = new AbortController();
    openDialog(){
        if(this.#dialog === undefined){
            if(globalThis[guid] === undefined){
                const dialog = document.createElement('dialog');
                dialog.id = guid;
                this.#dialog = dialog;
                dialog.innerHTML = String.raw `
<form method="dialog">
    <fieldset>
        <legend>Standard Form Props</legend>
        <label>
            Method:
            <select name=method>
                <option value=GET selected>GET</option>
                <option value=POST>POST</option>
                <option value=DELETE>DELETE</option>
                <option value=PUSH>PUSH</option>
            </select>
        </label>
    </fieldset>
    <fieldset>
        <legend>BeReformable Props</legend>
        <label>
            Base Attribute:
            <select>
                <option value="be-reformable" selected>be-reformable</option>
                <option value="🍺">🍺</option>
            </select>
        <label>
            Path: 
            <input name=path>
        </label>
    </fieldset>
    <button value="cancel">Cancel</button>
    <button value="default">Apply</button>
</form>
<style>
    #${guid} {
        label,select {
            display:block;
        }

        
    }
</style>
                `;
                const self = this.#selfRef.deref();
                if(self === undefined) throw 404;
                const {enhancedElement} = self; 
                this.#methodSelector(dialog).value = enhancedElement.method.toUpperCase() || 'GET';
                dialog.querySelector('[value="default"]')?.addEventListener('click', this, { signal: this.#dialogAC.signal });
                document.body.appendChild(dialog);         
            }else{
                this.#dialog = globalThis[guid];
            }
        }
        this.#dialog.showModal();
    }

    /**
     * 
     * @param {HTMLDialogElement} dialog 
     */
    #methodSelector(dialog){
        const methodSelector = /** @type {HTMLSelectElement | null} */ (dialog.querySelector('select[name="method"]'));
        if(methodSelector === null) throw 404;
        return methodSelector;
    }

    /**
     * 
     * @param {Event} e 
     */
    handleEvent(e) {
        const self = this.#selfRef.deref();
        if(self === undefined) throw 404;
        const {enhancedElement} = self;
        const target = e.target;
        if(!(target instanceof HTMLButtonElement )) return;
        const dialog = target.closest('dialog');
        if(dialog === null) throw 404;
        enhancedElement.method = this.#methodSelector(dialog).value;
    }
}

const guid =  'OinOhhTL10uuAObZAiEx2w';