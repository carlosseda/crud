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

                    // En caso de usar Axios
                    
                    // let request = await axios.post(url, json)
                    // .then(response => {
                    //     console.log(response);
                    // })
                    // .catch(error => {
                        
                    //     if(error.response.status == '400'){

                    //         let errors = error.response.data.data;      
                    //         let errorMessage = '';

                    //         Object.keys(errors).forEach( (key) => {
                    //             let errorMessage = document.createElement('li');
                    //             errorMessage.textContent = errors[key];
                    //             console.log(errorMessage)
                    //         })

                    //         console.log(errorMessage);
                    //     }

                    //     if(error.response.status == '500'){
                    //         console.log(error);
                    //     }
                    // });
                };
        
                sendPostRequest();
            });
        });
    }
};