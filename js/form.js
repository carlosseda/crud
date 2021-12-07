import {getFingerprint} from './client.js'

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 
                
                let data = new FormData(form);

                console.log(getFingerprint());
                let url = form.action;
    
                let sendPostRequest = async () => {
            
                //     let response = await fetch(url, {
                //         method: 'POST', 
                //         mode: 'no-cors', 
                //         headers: {
                //             'Content-Type': 'multipart/form-data',
                //             "Access-Control-Allow-Origin": "*",
                //             "X-Requested-With": "XMLHttpRequest"
                //         },
                //         body: JSON.stringify(data)
                //     }).then(function(response){
                //         console.log(response);
                //     }).catch(function(error) {

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


                    let response = await axios.post(url, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Accept": "application/json, text-plain, */*",
                            "X-Requested-With": "XMLHttpRequest",
                        }
                    }).then(response => {

                        console.log(response);

                    }).catch(error => {
                        
                        if(error.response.status == '422'){

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
                };
        
                sendPostRequest();
            });
        });
    }
};