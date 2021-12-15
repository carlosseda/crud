class FilterTable extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
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
        <form>
            <input type="text" id="search" placeholder="Buscar...">
        </form>`;  
        
        this.shadow.querySelector('#search').addEventListener('keyup', (event) => {
            
            document.dispatchEvent(new CustomEvent('filterSearch', {
                detail: {
                    search: event.target.value,
                }
            }));
        });
    }      
}

customElements.define('filtertable-component', FilterTable);
