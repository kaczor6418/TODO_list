const template: string = `<h2>Hello</h2>`;

export class ToDo extends HTMLElement {
    shadowRoot!: ShadowRoot;

    public static TAG = 'kk-to-do';

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

}
customElements.define(ToDo.TAG, ToDo);
