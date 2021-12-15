class Menu extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url="http://141.94.27.118:8080/api/display-menu/";
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {

        let url = this.url + this.getAttribute("menu");

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
            ul {   
                list-style: none;
                margin: 0;
                padding: 0;
            }
            li {
                display: inline-block;
                margin: 0;
                padding: 0;
            }
            a {
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                font-size: 1.2em;
                padding: 0.5em;
                text-decoration: none;
            }
            a:hover {
                color: hsl(0, 0%, 100%);
            }

            @media (max-width: 768px) {
                a {
                    font-size: 1em;
                }
            }

            @media (max-width: 480px) {
                a {
                    font-size: 0.8em;
                }
            }
        </style>
        <ul>${this.getChildren()}</ul>`;	

        let menuItems = this.shadow.querySelectorAll("a");

        menuItems.forEach(menuItem => {

            menuItem.addEventListener("click", () => {
                console.log(menuItem.url);
            });

        });
    }

    getChildren() {

        let html = '';

        this.data.forEach(child => {
            html += `<li><a href="#" url="${child.custom_url}">${child.link_name}</a></li>`;
        });

        return html;
    }
}

customElements.define('menu-component', Menu);
