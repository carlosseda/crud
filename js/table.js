//Create a webcomponent to show a table, with a json from a fetch:
// {
//     "success": true,
//     "data": [
//         {
//             "id": 18,
//             "name": "Carlos",
//             "email": "carlossedagambin@gmail.com",
//             "email_verified_at": null,
//             "created_at": "2021-12-11 12:31:57",
//             "updated_at": "2021-12-11 12:31:57",
//             "deleted_at": null,
//             "roles": [
//                 {
//                     "id": 1,
//                     "name": "Admin",
//                     "guard_name": "api",
//                     "created_at": "2021-12-09 10:37:24",
//                     "updated_at": "2021-12-09 10:37:24",
//                     "pivot": {
//                         "model_id": 18,
//                         "role_id": 1,
//                         "model_type": "App\\User"
//                     }
//                 }
//             ]
//         },
//         {
//             "id": 19,
//             "name": "luciano aras",
//             "email": "latardito@gmail.com",
//             "email_verified_at": null,
//             "created_at": "2021-12-13 14:43:33",
//             "updated_at": "2021-12-13 14:43:33",
//             "deleted_at": null,
//             "roles": [
//                 {
//                     "id": 1,
//                     "name": "Admin",
//                     "guard_name": "api",
//                     "created_at": "2021-12-09 10:37:24",
//                     "updated_at": "2021-12-09 10:37:24",
//                     "pivot": {
//                         "model_id": 19,
//                         "role_id": 1,
//                         "model_type": "App\\User"
//                     }
//                 }
//             ]
//         }
//     ],
//     "message": "Users retrieved successfully."
// }

class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid hsl(0, 0%, 87%);
                color: hsl(0, 0%, 100%);
                padding: 8px;
                text-align: left;
            }
        </style>`;
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

        this.shadow.innerHTML = `
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
