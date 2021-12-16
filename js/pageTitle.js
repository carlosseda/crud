class PageTitle extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.title = '';

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('title', event.detail.title);
        }));
    }

    static get observedAttributes() { return ['title']; }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.shadow.querySelector('h2').textContent = newValue;
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            h2 {   
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                font-size: 2em;
                font-weight: 600;
                margin: 0;
                text-decoration: none;
                text-align:center;
            }
        </style>

        <h2>${this.getAttribute('title')}</h2>
        `;	
    }
}

customElements.define('page-title-component', PageTitle);
