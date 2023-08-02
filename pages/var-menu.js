export class VarMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        /* Your var-menu styles */
        nav {
          background: rgb(236, 236, 236);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: .1rem
        }

        nav ul {
          margin: 0 5rem;
          padding: 1rem;
        }

        nav ul button {
          margin: 2rem .2rem;
          padding: .4rem;
          border: none;
          border-radius: .2rem;
          box-shadow: 0 0 1px rgb(162, 159, 159);
          background: rgb(255, 255, 255);
          color: black;
          transition: all ease-in-out .3s;
        }

        nav ul button:hover {
          background: rgba(255, 255, 255, .3);
        }

        .E-form {
          display: none;
          width: min(100%, 30rem);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 1px solid #706D6D;
          padding: 1rem 1.5rem;
        }

        .E-form .head-form {
          margin-bottom: 2rem;
        }

        .head-form h1 {
          font-size: 2rem;
          color: #706D6D;
        }

        .head-form img {
          height: 6rem;
          width: 6rem;
          border-radius: .4rem;
          margin-top: 1rem;
        }

        .head-mid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }

        label {
          font-weight: bold;
          color: #706D6D;
          display: block;
          margin: .3rem 0;
          opacity: .7;
          font-size: .8rem;
          transition: all ease-in-out .3s;
          pointer-events: none;
          transform-origin: top left;
        }

        input {
          outline: none;
          padding: .4rem;
          border: none;
          border-radius: .2rem;
          box-shadow: 0 0 1px rgb(162, 159, 159);
          width: min(100%, 23.8rem);
        }


        #enroll-btn {
          color: #706D6D;
          margin-top: 1rem;
          padding: .3rem 1rem;
          float: right;
        }

        .file-input-container {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column
        }
        
        .custom-button {
          background-color: #e6e6e6;
          color: #333;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        
        .custom-button:focus {
          outline: none;
        }
        
        #img-input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
          height: 100%;
          width: 100%;
        }
        
        @media screen and (max-width: 600px){
          nav{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            
          }

          nav ul{
            width: 100%;
            display: flex;
            justify-content: center;
          }

          nav ul button{
            margin: .3rem;
            padding: .4rem;
            font-size: .6rem;
          }
        }
        
      </style>

      <nav>
        <ul>
          <button>Dashboard</button>
          <button>Icon</button>
          <button>Sort</button>
        </ul>
        <ul>
          <button id='create-form'>+ Create</button>
        </ul>
      </nav>

      <div class='E-form'>
        <div class='head-form'>
          <h1>Enrollment Form</h1>
          <div class='file-input-container'>
            <button class='custom-button'>Upload your Image</button>
            <input id='img-input' type='file' accept='image/*'>
            <img id='preview-img' alt=''>
          </div>
        </div>

        <div class='head-mid'>
          <div id='first-name'>
            <label for='name'>First name:</label>
            <div>
              <input id='input-field' type='text' name='name' placeholder='Enter your first name'>
            </div>
          </div>
          <div id='last-name'>
            <label for='last-name'>Last name:</label>
            <div>
              <input id='last-name-input' type='text' name='last-name' placeholder='Enter your last name'>
            </div>
          </div>
        </div>

        <div id='id'>
          <label for='id'>ID:</label>
          <div>
            <input id='id-input' type='text' name='id' placeholder='Enter your ID'>
          </div>
        </div>

        <div id='level'>
          <label for='level'>Level:</label>
          <div>
            <input id='level-input' type='text' name='level' placeholder='Enter your Level'>
          </div>
        </div>

        <div id='gwp'>
          <label for='gwp'>GWP:</label>
          <div>
            <input id='gwp-input' type='text' name='gwp' placeholder='Enter your GWP'>
          </div>
        </div>

        <div id='old-school'>
          <label for='old-school'>Old School:</label>
          <div>
            <input id='old-school-input' type='text' name='old-school' placeholder='Enter your Old School'>
          </div>
        </div>

        <div class='head-foot'>
          <button id='enroll-btn' type='button'>Enroll</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const EForm = this.shadowRoot.querySelector('.E-form');
    const imgInput = this.shadowRoot.querySelector('#img-input');
    const previewImg = this.shadowRoot.querySelector('#preview-img');
    const createForm = this.shadowRoot.querySelector('#create-form');
    const enrollBTN = this.shadowRoot.querySelector('#enroll-btn');
    const inputFields = this.shadowRoot.querySelectorAll('input[name]');

    createForm.addEventListener('click', () => {
      EForm.style.display = 'block';
    });

    imgInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        previewImg.src = reader.result;
      });

      if (file) {
        reader.readAsDataURL(file);
      } else {
        previewImg.src = '';
      }
    });

    inputFields.forEach((input) => {
      input.addEventListener('click', () => {
        input.style.boxShadow = 'none';
      });
    });

    enrollBTN.addEventListener('click', () => {
      const firstName = this.shadowRoot.querySelector('#input-field').value;
      const lastName = this.shadowRoot.querySelector('#last-name-input').value;
      const id = this.shadowRoot.querySelector('#id-input').value;
      const level = this.shadowRoot.querySelector('#level-input').value;
      const gwp = this.shadowRoot.querySelector('#gwp-input').value;
      const oldSchool = this.shadowRoot.querySelector('#old-school-input').value;

      if (firstName && lastName && id && level && gwp && oldSchool) {
        const tableItems = document.querySelector('table-items');
        tableItems.addTableRow(id, firstName, lastName, level, gwp, oldSchool, previewImg.src);
        EForm.style.display = 'none';
      } else {
        alert('Please fill in all the fields.');
      }
    });
  }
}

customElements.define('var-menu', VarMenu);
