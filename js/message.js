class AlertMessage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.message = '';
        this.type = '';

        document.addEventListener("message",( event =>{
            this.setAttribute('message', event.detail.message);
            this.setAttribute('type', event.detail.type);
        }));
    }

    static get observedAttributes() { return ['message', 'type']; }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        if(name == 'message'){
            let message = this.shadow.querySelector('#alert-message');
            message.classList.add('active');

            this.shadow.querySelector('p').textContent = newValue;

            setTimeout(function(){ 
                message.classList.remove('active');
            }, 7000);
        }

        if(name == 'type'){
            let message = this.shadow.querySelector('#alert-message');
            message.classList.add(newValue);
        }
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            #alert-message{
                background-color: hsl(0, 0%, 100%);
                bottom: 5vh;
                height: 10vh;
                opacity: 0;
                padding: 0 0.5em;
                position: fixed;
                transition: opacity 0.3s;
                right: 5%;
                width: 30%;
            }

            #alert-message.success{
                border-right: 0.5em solid hsl(207, 85%, 69%);;
            }

            #alert-message.active{
                opacity: 1;
            }

            p{
                font-family: 'Ubuntu';
                font-size: 1.2em;
            }
        </style>

        <div id="alert-message">
            <p></p>
            <div id="alert-color">
            </div>
        </div>`;	
    }
}

customElements.define('alert-message-component', AlertMessage);
