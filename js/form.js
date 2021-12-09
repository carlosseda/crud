import {getFingerprint} from './client.js';
import * as Joi from '../node_modules/joi/dist/joi-browser.min.js'

export let renderForm = () => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        repeat_password: Joi.ref('password'),
    
        access_token: [
            Joi.string(),
            Joi.number()
        ],
    
        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
        .with('username', 'birth_year')
        .xor('password', 'access_token')
        .with('password', 'repeat_password');
    
    
    schema.validate({ username: 'abc', birth_year: 1994 });
    // -> { value: { username: 'abc', birth_year: 1994 } }
    
    schema.validate({});
    // -> { value: {}, error: '"username" is required' }
    
    // Also -
    
    try {
        const joddd = schema.validateAsync({ username: 'abc', birth_year: 1994 });
    }
    catch (err) { }

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