class TablePagination extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.totalPage = '';
        this.currentPage = '';
        this.lastPage = '';
        this.firstPageUrl = '';
        this.previousPageUrl = '';
        this.nextPageUrl = '';
        this.lastPageUrl = '';

        document.addEventListener("loadTable",( event =>{
            this.setAttribute('totalPage', event.detail.totalPage);
            this.setAttribute('currentPage', event.detail.currentPage);
            this.setAttribute('lastPage', event.detail.lastPage);
            this.setAttribute('firstPageUrl', event.detail.firstPageUrl);
            this.setAttribute('previousPageUrl', event.detail.previousPageUrl);
            this.setAttribute('nextPageUrl', event.detail.nextPageUrl);
            this.setAttribute('lastPageUrl', event.detail.lastPageUrl);
        }));
    }

    static get observedAttributes() { 
        
        return [
            'loadTable',
            'currentPage',
            'lastPage',
            'firstPageUrl',
            'previousPageUrl',
            'nextPageUrl',
            'lastPageUrl'
        ]; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(){
        this.loadData();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 1em;
            }

            input {
                border: none;
                border-bottom: 1px solid hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                font-size: 1.2em;
                padding: 0.6em;
                text-align: left;
                width: 95%;
            }
            input:focus {
                outline: none;
            }
        </style>

        <div class="table-pagination">
            <div class="table-pagination-info">
                <div class="table-pagination-total"><p>${this.totalPage} registros</p></div>
                <div class="table-pagination-pages"><p>Mostrando la página ${this.currentPage} de ${this.lastPage}</p></div>
            </div>
            <div class="table-pagination-buttons">
                <p>
                    <span class="table-pagination-button" id="first-page">Primera</span>
                    <span class="table-pagination-button" id="previous-page">Anterior</span>
                    <span class="table-pagination-button" id="next-page">Siguiente</span>
                    <span class="table-pagination-button" id="last-page">Última</span>
                </p>
            </div>
        </div>`;  
        
        this.shadow.querySelector('#search').addEventListener('keyup', (event) => {
            
            document.dispatchEvent(new CustomEvent('filterSearch', {
                detail: {
                    search: event.target.value,
                }
            }));
        });
    }      
}

customElements.define('table-pagination-component', TablePagination);
