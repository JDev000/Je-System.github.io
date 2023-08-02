export class NavBar extends HTMLElement {
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

            nav {
                
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: .5rem;
            }
            

            nav ul li {
                list-style: none;
                text-transform: capitalize;
            }

            nav ul button {
                padding: .3rem;
                border: none;
                border-radius: .2rem;
                box-shadow: 0 0 1px rgb(162, 159, 159);
                background: rgb(255, 255, 255);
                color: black;
                transition: all ease-in-out .3s;
            }
    </style>


    <nav>
        <ul>
            <li>Je System</li>
        </ul>
        <ul>
            <button id='log-out' type='button'>Log Out</button>
        </ul>
    </nav>


    
         `
    }


    connectedCallback() {
        const logOutButton = this.shadowRoot.querySelector('#log-out');
        logOutButton.addEventListener('click', () => {
            window.location.href='http://127.0.0.1:5500/form.html';
        });
      }

      
}



customElements.define('nav-bar', NavBar);