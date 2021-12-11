import {getFingerprint} from './client.js';

export let renderForm = () => {

    let forms = document.querySelectorAll(".admin-form");
    let createButton = document.getElementById("crud__create-button");

    if(createButton){

        createButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 

                var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NTNkNDc5ZDViNDYyODY2ZGE4NmVlNzU2YzFlMTE4ZjE1Njg4OGFjY2E3NGQ1YWVlYmZmMmQwZDI5Y2MxY2FlZWM3MWM4MmJlZTI1MTA5In0.eyJhdWQiOiIxIiwianRpIjoiODc1M2Q0NzlkNWI0NjI4NjZkYTg2ZWU3NTZjMWUxMThmMTU2ODg4YWNjYTc0ZDVhZWViZmYyZDBkMjljYzFjYWVlYzcxYzgyYmVlMjUxMDkiLCJpYXQiOjE2MzkxNjg4NDYsIm5iZiI6MTYzOTE2ODg0NiwiZXhwIjoxNjcwNzA0ODQ2LCJzdWIiOiIxNSIsInNjb3BlcyI6W119.saOG4Q9eFWFHt7Hb9iplmbEx_NhC8X5fh8x_HAJPurvtAB3Pzc7TNkY3dRg8tHQcO_N1PZws859qeC2Qvn7XJlOR9nqEfxI3vwE11TH_HKl3IvKE6d41oQFuATMhBaOdO5kO92ubLrO3QDtHCjOaWxiQRFv9HaWcxSvnM3x9nkT8-M2frl9tUf5pPd1k4F-2vulzmcxe6lYHjkMnHxq6qgGqJyL8jlU98VKjjG73EUUn3jk5BReOouROsz2ZpNiR3324qKPBonqi7yyWN9tHH4ByrtOjXq9ppRL3nJpmnrIxNtnbGjegldlZ8UGI8rORZO_IWbchxNsqlkAD8QnOuTWZPm4ABMLhp5karEgZcCc7lyXz4-a-YJUndfKwNbjQB928pf-R-c0TjSaM0zKfWuaY28Y_pKHka4_i3YnuN6STlWhQ9vwuHEUpA7oihAeHKi16rxsPYhUMAnH3o4EHeIUPol5LipSsPvPEe6B1HY3QaCByiRNPRIZzoCv_ceMJj7nEBeZCwUqoeOi3rzrdS2i2KhPnU548uNu76jW4TpgQp85j67Bq4OXy5GXYvIXIVir6hROdkiVHaWty_7b7H-opor43ufafP1SjRzpMXk6YanJmoOw1woepSgDtihhYXPz5L1PokvWnDW0AmSG1kB-dLoBO9k4kcroblGx1Mac");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://141.94.27.118:8080/api/profile", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

                // let data = new FormData(form);
                // data.append("fingerprint", getFingerprint());

                // let url = form.action;
    
                // let sendPostRequest = async () => {
            
                //     let request = await fetch(url, {
                //         headers: {
                //             'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                //         },
                //         method: 'GET', 
                //         // body: data
                //     })
                //     .then(response => {
                //         if (!response.ok) throw response;

                //         return response.json();
                //     })
                //     .then(json => {
                //         sessionStorage.setItem('key', json.data);
                //         console.log(json.data);
                //     })
                //     .catch(error => {
                        
                //         if(error.status == '400'){

                //             error.json().then(jsonError => {

                //                 let errors = jsonError.data;    

                //                 Object.keys(errors).forEach( (key) => {
                //                     let errorMessage = document.createElement('li');
                //                     errorMessage.textContent = errors[key];
                //                     console.log(errorMessage)
                //                 })
                //             })   
                //         }

                //         if(error.status == '500'){
                //             console.log(error);
                //         }
                //     });

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