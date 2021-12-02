export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 
                
                let data = new FormData(form);
                let url = form.action;
    
                let sendPostRequest = async () => {
            
                    const response = await fetch(url, {
                        method: 'POST', 
                        mode: 'cors', 
                        cache: 'no-cache', 
                        credentials: 'same-origin', 
                        headers: {
                            'Authorization': 'Basic tony_admin@laravel.com:$2y$10$D3vG45dtYiR3O/d46x4pveWLqBZoxQWuq7..fbvOxNvZnW7eMWoOm', 
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow', 
                        referrerPolicy: 'no-referrer', 
                        body: JSON.stringify(data)
                    }).then(function(response){
                        console.log(response);
                    }).catch(function(error) {

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

                    // await axios.post(url, data).then(response => {
                        
                    //     console.log(response);
                    // });
                };
        
                sendPostRequest();
            });
        });
    }
};