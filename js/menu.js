class Menu extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url="http://141.94.27.118:8080/api/display-menu/";
        this.data = [];
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
            #menu-button{
                cursor:pointer;
                height: 2em;
                margin-left: auto;
                position: relative;
                width: 2em;
                z-index: 1200;
            }
            #menu-button button{
                background: none;
                border: none;
                color: inherit;
                cursor:pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                outline: inherit;
                padding: 0;
            }

            #menu-button button:before, #menu-button button:after,
            span:before, span:after{
                background-color: hsl(0, 0%, 100%);
                border-radius: 15px;
                content: "";
                display: block;
                height: 0.2em;
                opacity: 1;
                position: absolute;
                transition: ease-in-out all 0.15s;
                width: 100%
            }

            span:before, span:after{
                top: 50%;
                transform: translateY(-50%);
            }

            #menu-button button:before{
                top: 0.5em;
            }

            #menu-button button:after{
                bottom: 0.5em;
            }

            #menu-button.active button:before, #menu-button.active button:after{
                display: none;
            }

            #menu-button.active span:before{
                background-color: hsl(207, 85%, 69%);
                transform: rotate(45deg);
            }

            #menu-button.active span:after{
                background-color: hsl(207, 85%, 69%);
                transform: rotate(-45deg)
            }

            #menu{
                background-color: hsl(0, 0%, 100%);
                height: 100vh;
                left: 0;
                position: fixed;
                transition: opacity 0.4s;
                top: 0;
                opacity: 0;
                width: 100%;
                z-index: 1000;
            }

            #menu.active{
                opacity: 1;
            }

            #menu ul {   
                list-style: none;
                margin: 0;
                padding: 10%;
            }

            #menu li {
                display: inline-block;
                margin: 0;
                padding: 0;
            }

            #menu a {
                color: hsl(207, 85%, 69%);
                font-family: 'Ubuntu';
                font-size: 1.5em;
                padding: 0.5em;
                text-decoration: none;
            }
            #menu a:hover {
                color: hsl(19, 100%, 50%);
            }
        </style>

        <div id="menu-button">
            <button>
                <span></span>
            </button>
        </div>

        <div id="menu">
            <ul>${this.getChildren()}</ul>
        </div>`;	

        let menuItems = this.shadow.querySelectorAll("a");
        let menuButton = this.shadow.querySelector('#menu-button');
        let menu = this.shadow.querySelector('#menu');

        menuButton.addEventListener("click", (event) => {
            menuButton.classList.toggle('active');
            menu.classList.toggle('active');
        });

        menuItems.forEach(menuItem => {

            menuItem.addEventListener("click", (event) => {

                event.preventDefault();

                menuButton.classList.toggle('active');
                menu.classList.toggle('active');

                window.history.pushState('', menuItem.getAttribute("title"), menuItem.getAttribute("href"));

                document.dispatchEvent(new CustomEvent('newUrl', {
                    detail: {
                        url: menuItem.getAttribute("href"),
                        title: menuItem.getAttribute("title"),
                    }
                }));

            });

        });
    }

    getChildren() {

        let html = '';

        this.data.forEach(child => {
            html += `<li><a href="${child.custom_url}" title="${child.link_name}">${child.link_name}</a></li>`;
        });

        return html;
    }
}

customElements.define('menu-component', Menu);
