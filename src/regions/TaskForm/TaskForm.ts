const template: string = `<form>
    <div>
        <label for="name">Name:</label>
        <input type="text" placeholder="Enter task name..." name="name"required>
    </div>
    <div>
        <label for="priority">Priority:</label>
        <select name="priority">
            <option value="">Task priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
        </select>
    </div>
    <div>
        <label for="deadline">Deadline:</label>
        <input type="date" placeholder="30-06-2020" name="deadline" required>
    </div>
    <div>
        <input type="submit" value="+">
    </div>
</form>`;

export class TaskForm extends HTMLElement {
    shadowRoot!: ShadowRoot;

    public static TAG: string = 'kk-task-form';

    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define(TaskForm.TAG, TaskForm);
