class TablePagination extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.total = '';
        this.currentPage = '';
        this.lastPage = '';
        this.firstPageUrl = '';
        this.previousPageUrl = '';
        this.nextPageUrl = '';
        this.lastPageUrl = '';

        document.addEventListener("loadTable",( event =>{
            this.setAttribute('total', event.detail.total);
            this.setAttribute('currentPage', event.detail.currentPage);
            this.setAttribute('lastPage', event.detail.lastPage);
            this.setAttribute('firstPageUrl', event.detail.firstPageUrl);
            this.setAttribute('previousPageUrl', event.detail.previousPageUrl);
            this.setAttribute('nextPageUrl', event.detail.nextPageUrl);
            this.setAttribute('lastPageUrl', event.detail.lastPageUrl);
        }));
    }

    static get observedAttributes() { 
        
        return ['totalPage','currentPage','lastPage']; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(){
        this.shadow.querySelector('#total-page').textContent = this.getAttribute('totalPage');
        this.shadow.querySelector('#current-page').textContent = this.getAttribute('currentPage');
        this.shadow.querySelector('#last-page').textContent = this.getAttribute('lastPage');
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            .table-pagination .table-pagination-info{
                color: hsl(0, 0%, 100%);
                display: flex;
                font-family: 'Ubuntu', sans-serif;
                justify-content: space-between;
            }
        
            .table-pagination .table-pagination-buttons p{
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu', sans-serif;
                margin: 0;
            }
        
            .table-pagination .table-pagination-button{
                cursor: pointer;
                margin-right: 1em;
            }
        
            .table-pagination .table-pagination-button:hover{
                color: hsl(19, 100%, 50%);
            }
        
            .table-pagination .table-pagination-button.inactive{
                    color: hsl(0, 0%, 69%);
                }
            }
        </style>

        <div class="table-pagination">
            <div class="table-pagination-info">
                <div class="table-pagination-total"><p><span id="total-page">${this.getAttribute('total')} registros</p></div>
                <div class="table-pagination-pages"><p>Mostrando la página <span id="current-page">${this.getAttribute('currentPage')}</span> de <span id="last-page">${this.getAttribute('lastPage')}</span></p></div>
            </div>
            <div class="table-pagination-buttons">
                <p>
                    <span class="table-pagination-button" id="firstPageUrl">Primera</span>
                    <span class="table-pagination-button" id="previousPageUrl">Anterior</span>
                    <span class="table-pagination-button" id="nextPageUrl">Siguiente</span>
                    <span class="table-pagination-button" id="lastPageUrl">Última</span>
                </p>
            </div>
        </div>`;  


        let tablePaginationButtons = this.shadow.querySelectorAll(".table-pagination-button");

        tablePaginationButtons.forEach(tablePaginationButton => {

            tablePaginationButton.addEventListener("click", (event) => {

                if(this.getAttribute(tablePaginationButton.id) != null){
                    document.dispatchEvent(new CustomEvent('paginateAction', {
                        detail: {
                            url: this.getAttribute(tablePaginationButton.id),
                        }
                    }));
                }
            });

        });
    }      
}

customElements.define('table-pagination-component', TablePagination);
