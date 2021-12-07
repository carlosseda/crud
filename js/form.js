import {getFingerprint} from './client.js'

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 

                let data = new FormData(form);
                data.append("name", "carlos");
                data.append("email", "cedagambin@gmail.com");
                data.append("password", "temporal");
                data.append("c_password", "temporal");
                data.append("fingerprint", getFingerprint());

                let object = {};

                data.forEach(function(value, key){
                    object[key] = value;
                });

                let json = JSON.stringify(object);

                console.log(json);

                let url = form.action;
    
                let sendPostRequest = async () => {
            
                    let response = await fetch(url, {
                        method: 'POST', 
                        mode: 'no-cors', 
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                        },
                        body: json
                    }).then(function(response){
                        console.log(response);
                    }).catch(function(error) {

                        if(error.response.status == '400'){
    
                            let errors = error.response.data.errors;      
                            let errorMessage = '';
        
                            Object.keys(errors).forEach(function(key) {
                                errorMessage += '<li>' + errors[key] + '</li>';
                            })
            
                            console.log(errorMessage);
                        }
    
                        if(error.response.status == '500'){
                            console.log(error);
                        }
                    });


                //     let response = await axios.post(url, json).then(response => {

                //         console.log(response);

                //     }).catch(error => {
                        
                //         if(error.response.status == '422'){

                //             let errors = error.response.data.errors;      
                //             let errorMessage = '';

                //             Object.keys(errors).forEach(function(key) {
                //                 errorMessage += '<li>' + errors[key] + '</li>';
                //             })

                //             console.log(errorMessage);
                //         }

                //         if(error.response.status == '500'){
                //             console.log(error);
                //         }
                //     });
                };
        
                sendPostRequest();
            });
        });
    }
};