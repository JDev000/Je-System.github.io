export class TableItems extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        /* Your table-items styles */

        .table-container {
          margin: 2rem 0 2rem 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        table {
          text-align: center;
          height: 5rem;
          width: min(100%, 45rem);
          margin: 0 3rem;
          border-bottom: 1px solid gray;
          scroll-behavior: smooth;
          overflow: scroll;
        }

        th {
          padding: .4rem;
          border: 1px solid gray;
        }

        tr {
          background: rgb(255, 255, 255);
        }

        td {
          padding: 1rem;
          margin: 5rem;
        }
        
        .action-buttons {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 1rem;
        }

        .action-buttons button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          border-radius: 4px;
          margin-left: 10px;
          cursor: pointer;
        }

        .action-buttons button.reset {
          background-color: #E57373; /* Nice red color for reset button */
        }

        td img {
          max-width: 100px; /* Adjust the width as needed */
          max-height: 100px; /* Adjust the height as needed */
          border-radius: 0;
          object-fit: cover; /* Ensures the image retains its aspect ratio and covers the entire area */
        }



        @media screen and (max-width: 600px){

          table{
            font-size: .6rem;
          }

          th {
      
            border: 1px solid gray;
            padding: .5rem;
            
          }
  
          tr {
            background: rgb(255, 255, 255);
          }
  
          td {
            padding: .5rem;
            margin: 3rem;
          }
        }

     
      </style>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>GWP</th>
              <th>Old School</th>
              <th>Face</th>
            </tr>
          </thead>

          <tbody></tbody>

          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
      
      <div class="action-buttons">
        <button class="reset">Reset</button>
        <button class="download">Download JSON</button>
      </div>
    `;
  }

  connectedCallback() {
    this.tbody = this.shadowRoot.querySelector('tbody');

    // Load data from local storage if available
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.forEach((item) => {
        this.addTableRow(
          item.ID,
          item.firstName,
          item.lastName,
          item.Level,
          item.GWP,
          item.oldSchool,
          item.imageURL
        );
      });
    }

    // Add event listeners for the buttons
    const downloadButton = this.shadowRoot.querySelector('.download');
    const resetButton = this.shadowRoot.querySelector('.reset');
    downloadButton.addEventListener('click', () => this.downloadTableData());
    resetButton.addEventListener('click', () => this.resetTableData());
  }

  addTableRow(ID, firstName, lastName, Level, GWP, oldSchool, imageURL) {
    const existingRow = this.tbody.querySelector(`[data-id="${ID}"]`);

    // Prevent cloning of existing row
    if (existingRow) {
      return;
    }

    const row = document.createElement('tr');
    row.setAttribute('data-id', ID);

    const idCell = document.createElement('td');
    idCell.textContent = `${ID}`;

    const nameCell = document.createElement('td');
    nameCell.textContent = `${firstName} ${lastName}`;

    const levelCell = document.createElement('td');
    levelCell.textContent = `${Level}`;

    const gwpCell = document.createElement('td');
    gwpCell.textContent = `${GWP}`;

    const oldSchoolCell = document.createElement('td');
    oldSchoolCell.textContent = `${oldSchool}`;

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = imageURL;
    image.alt = `${firstName} ${lastName}`;
    imageCell.appendChild(image);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(levelCell);
    row.appendChild(gwpCell);
    row.appendChild(oldSchoolCell);
    row.appendChild(imageCell);

    this.tbody.appendChild(row);

    // Save data to local storage
    const rowData = {
      ID,
      firstName,
      lastName,
      Level,
      GWP,
      oldSchool,
      imageURL,
    };

    let savedData = localStorage.getItem('tableData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const existingIndex = parsedData.findIndex((item) => item.ID === ID);

      // Prevent duplicates
      if (existingIndex !== -1) {
        parsedData.splice(existingIndex, 1);
      }

      parsedData.push(rowData);
      savedData = JSON.stringify(parsedData);
    } else {
      savedData = JSON.stringify([rowData]);
    }

    localStorage.setItem('tableData', savedData);
    console.log(savedData);
  }

  getTableDataAsJson() {
    const savedData = localStorage.getItem('tableData');
    if (!savedData) return null;

    const jsonData = JSON.parse(savedData);
    return jsonData;
  }

  // Function to create a download button
  createDownloadButton() {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download JSON';
    downloadButton.classList.add('download');
    return downloadButton;
  }

  // Function to create a reset button
  createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('reset');
    return resetButton;
  }

  // Function to trigger the download process
  downloadTableData() {
    const jsonData = this.getTableDataAsJson();
    if (jsonData) {
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'table-data.json';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      console.log('No data available to download.');
    }
  }

  // Function to reset table data and local storage
  resetTableData() {
    this.tbody.innerHTML = '';
    localStorage.removeItem('tableData');
  }
}

customElements.define('table-items', TableItems);
