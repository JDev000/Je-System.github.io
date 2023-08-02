export class CreateForm extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).innerHTML =
            `
    <style>
            * {
                box-sizing: border-box;
                margin: 0;      
                padding: 0;
            }

            body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

     
            .form-container{
                position: fixed;
                z-index: 1;
                left: 50%;
                top: 50%;
                background: gray;
                border-radius: .4rem;
                padding: 2rem;
                width: 100%;
            }
    </style>

            <div class="form-container">
                <form></form>
            </div>
   
         `
    }
}




customElements.define('create-form', CreateForm);