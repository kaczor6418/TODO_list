const template: string = `<div>
    <h2>Hello</h2>
</div>`;

export class HelloWC extends HTMLElement {
    shadowRoot!: ShadowRoot;

    public static TAG = 'hello-wc';

    constructor() {
        super();
        console.log('heelo wc');
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = template;

    }
}
customElements.define(HelloWC.TAG, HelloWC);
