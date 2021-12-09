import {getFingerprint} from './client.js';
import '../node_modules/axios/dist/axios.js'

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 

                let data = new FormData(form);
                data.append("name", "carlos");
                data.append("email", "carlossedagambin@gmail.com");
                data.append("password", "temporal");
                data.append("c_password", "temporal");
                data.append("fingerprint", getFingerprint());

                let object = {};

                data.forEach(function(value, key){
                    object[key] = value;
                });

                let json = JSON.stringify(object);
                let url = form.action;
    
                let sendPostRequest = async () => {
            
                    let response = await fetch(url, {
                        method: 'POST', 
                        mode: 'cors', 
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json', 
                        },
                        body: json
                    })
                    .then(response => {
                        if (!response.ok) throw response;

                        console.log(result)
                    })
                    .catch(error => {
                        
                        if(error.status == '400'){

                            error.json().then(jsonError => {

                                let errors = jsonError.data;    

                                Object.keys(errors).forEach( (key) => {
                                    let errorMessage = document.createElement('li');
                                    errorMessage.textContent = errors[key];
                                    console.log(errorMessage)
                                })
                            })   
                        }

                        if(error.status == '500'){
                            console.log(error);
                        }
                    });

                    // En caso de usar Axios
                    
                    // let response = await axios.post(url, json,
                    //     {
                    //         headers: {
                    //             'Accept': '*/*',
                    //             'Content-Type': 'application/json',
                    //         }
                    //     })
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