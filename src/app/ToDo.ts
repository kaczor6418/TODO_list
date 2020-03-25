const template: string = `<main>
    <header>
        <kk-task-form></kk-task-form>
    </header>
</main>`;

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
