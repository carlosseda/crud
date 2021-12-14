class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        return new Proxy (this, {
            get (...args) {
              console.log ('get', ...args);
              return Reflect.get (...args);
            } 
        });

        document.addEventListener("newData",( event =>{
            this.connectedCallback();
        }));
    }

    connectedCallback() {

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

        let headers = this.getAttribute('headers');
        let header = '';

        Object.entries(this.data[0]).forEach(([key, value]) => {
            if(headers.includes(key)){
                header += `<th>${key}</th>`;
            }
        });

        return `<tr>${header}</tr>`;
    }

    getTableData() {

        let headers = this.getAttribute('headers');
        let data = '';

        this.data.forEach(element => {

            data += `<tr>`;

            Object.entries(element).forEach(([key, value]) => {
                if(headers.includes(key)){
                    data += `<td>${value}</td>`;
                }
            });

            data += `</tr>`;
        });

        return data;
    }           
}

customElements.define('table-component', Table);
