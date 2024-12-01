/** @import {Actions, PAP, AllProps, AP, BAP, ITyper, IFormDialog} from './ts-refs/be-formalizing/types.d.ts' */;

/**
 * @implements {IFormDialog}
 */
export class FormDialog{
    /**
     * @type {BAP}
     */
    selfRef;

    /**
     * 
     * @param {BAP} self 
     */
    constructor(self){
        this.selfRef = new WeakRef(self);
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
    <select name=method>
        <option value=GET selected>GET</option>
        <option value=POST>POST</option>
        <option value=DELETE>DELETE</option>
        <option value=PUSH>PUSH</option>
    </select>
</form>
                `; 
                dialog.querySelector('[value="default"]')?.addEventListener('click', e => {
                    this.applyDialog(e);
                }, { signal: this.#dialogAC.signal });
                document.body.appendChild(dialog);         
            }else{
                this.#dialog = globalThis[guid];
            }
        }
        this.#dialog.showModal();
    }
}

const guid =  'OinOhhTL10uuAObZAiEx2w';