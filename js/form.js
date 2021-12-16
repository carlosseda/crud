import {getFingerprint} from './client.js';

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 

                let url = form.action;
                let data = new FormData(form);
                data.append("fingerprint", getFingerprint());
    
                let sendPostRequest = async () => {
            
                    let request = await fetch(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        },
                        method: 'POST', 
                        body: data
                    })
                    .then(response => {
                        if (!response.ok) throw response;

                        return response.json();
                    })
                    .then(json => {
                        document.dispatchEvent(new CustomEvent('newData'));

                        if(json.message){
                            document.dispatchEvent(new CustomEvent('message', {
                                detail: {
                                    message: json.message,
                                    type: 'success'
                                }
                            }));
                        }
                    })
                    .catch(error => {
                        
                        if(error.status == '400'){

                            error.json().then(jsonError => {

                                let errors = jsonError.data;  
                                let errorsContainer = document.getElementById('crud__form-errors');      
                                errorsContainer.classList.add('active');

                                Object.keys(errors).forEach( (key) => {
                                    let errorMessage = document.createElement('li');
                                    errorMessage.textContent = errors[key];
                                    errorsContainer.insertAdjacentElement('beforeend',errorMessage);
                                    document.querySelector(`[name=${key}]`).classList.add('error');
                                })
                            })   
                        }

                        if(error.status == '500'){
                            console.log(error);
                        }
                    });
                };
        
                sendPostRequest();
            });
        });
    }

    document.addEventListener("showElement",( event =>{

        fetch(event.detail.url, { 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }) 
        .then(response => {
            if (!response.ok) throw response;

            return response.json();
        })
        .then(json => {
            let data = json.data;

            Object.entries(data).forEach( ([key,value]) => {
                document.querySelector(`[name=${key}]`).value = value;
            });
        })
        .catch(error => console.log(error));
    }));
};