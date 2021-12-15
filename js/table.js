class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.api = 'http://141.94.27.118:8080/api';

        document.addEventListener("newData",( event =>{
            this.loadData();
        }));

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', this.api + event.detail.url);
        }));
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {
        this.loadData();
    }

    attributeChangedCallback(){
        this.loadData();
    }

    loadData() {

        let url = this.getAttribute('url');

        if(url){

            fetch(url, { 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }) 
            .then(response => response.json())
            .then(json => {
                this.data = json.data;
                this.render();
            })
            .catch(error => console.log(error));
        }
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid hsl(0, 0%, 87%);
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                padding: 8px;
                text-align: left;
            }
        </style>
        <table>
            <thead>
                ${this.getTableHeader()}
            </thead>
            <tbody>
                ${this.getTableData()}
            </tbody>
        </table>`;        
    }

    getTableHeader() {

        let header = '';

        Object.entries(this.data[0]).forEach(([key, value]) => {
            header += `<th>${key}</th>`;
        });

        return `<tr>${header}</tr>`;
    }

    getTableData() {

        let data = '';

        this.data.forEach(element => {

            data += `<tr>`;

            Object.entries(element).forEach(([key, value]) => {
                data += `<td>${value}</td>`;
            });

            data += `</tr>`;
        });

        return data;
    }           
}

customElements.define('table-component', Table);
