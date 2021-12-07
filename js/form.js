import {getFingerprint} from './client.js'

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 
                var data = JSON.stringify({
                    "name": "carlos",
                    "email": "carlossedagambin@gmail.com",
                    "password": "temporal",
                    "c_password": "temporal"
                  });
                  
                  var xhr = new XMLHttpRequest();
                  xhr.withCredentials = true;
                  
                  xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                      console.log(this.responseText);
                    }
                  });
                  
                  xhr.open("POST", "http://141.94.27.118:8080/api/register");
                  xhr.setRequestHeader("Content-Type", "application/json");
                  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                  
                  xhr.send(data);
                // let data = new FormData(form);
                // data.append("name", "carlos");
                // data.append("email", "cedagambin@gmail.com");
                // data.append("password", "temporal");
                // data.append("c_password", "temporal");
                // data.append("fingerprint", getFingerprint());

                // let object = {};

                // data.forEach(function(value, key){
                //     object[key] = value;
                // });

                // let json = JSON.stringify(object);

                // console.log(json);

                // let url = form.action;
    
                // let sendPostRequest = async () => {
            
                //     // let response = await fetch(url, {
                //     //     method: 'POST', 
                //     //     mode: 'cors', 
                //     //     headers: {
                //     //         'Accept': '*/*',
                //     //         'Content-Type': 'application/json',
                //     //     },
                //     //     body: json
                //     // }).then(function(response){
                //     //     console.log(response);
                //     // }).catch(function(error) {

                //     //     if(error.response.status == '400'){
    
                //     //         let errors = error.response.data.errors;      
                //     //         let errorMessage = '';
        
                //     //         Object.keys(errors).forEach(function(key) {
                //     //             errorMessage += '<li>' + errors[key] + '</li>';
                //     //         })
            
                //     //         console.log(errorMessage);
                //     //     }
    
                //     //     if(error.response.status == '500'){
                //     //         console.log(error);
                //     //     }
                //     // });


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
                // };
        
                // sendPostRequest();
            });
        });
    }
};