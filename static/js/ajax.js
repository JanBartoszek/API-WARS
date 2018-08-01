var sendData = {
    
    sendRegisterInput: function(){
        let endpoint = '/register'
        let registerInput = registerDOM.getRegisterInput();
        let convertedRegisterInput = logic.convertToJSON(registerInput);
        let test1 = this.sendToServer(endpoint, convertedRegisterInput);
        if (test1 == 'ok'){
            registerEvents.loadLoginDOM();
            }

    },

    sendLoginInput: function(){
        let endpoint = '/login'
        let loginInput = loginDOM.getLoginInput();
        let convertedLoginInput = logic.convertToJSON(loginInput);
        var test2 = this.sendToServer(endpoint, convertedLoginInput).then(function(data) {
            alert(data);
        }).catch(function(err) {
            console.log(err);
        });;
        
   
        // function getSomePromise(myVar) {
        //     var promise = new Promise(function (resolve,reject) {
        //         if (myVar == 'ok')
        //         resolve("It is a success!")
        //         else
        //         reject(("It is a failure."));
        //     });
        //     return promise;
        // }  
        //     getSomePromise(test2).then(function (fromResolve) {
        //         alert(fromResolve);
        //     }).catch(function (fromReject) {
        //         alert("Error: " + fromReject);
        //     });




        // function getSomePromise(myVar) {
        //     return new Promise(function (resolve,reject) {
        //         if (myVar)
        //         resolve("It is a success!")
        //         else
        //         reject(("It is a failure."));
        //     });



        // let test = this.sendToServer(endpoint, convertedLoginInput);
        // alert(JSON.parse(test));
    },

    sendToServer: function (endpoint, dataToSend) {
        return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText)
                if (response == 'ok'){
                    resolve('dupa');
                } else {
                    alert('Something wrong');
                    reject(response);
                }
            }
        }
    
    })
    },


    // sendToServer: function (endpoint, dataToSend) {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.open("POST", endpoint, true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.send(dataToSend);
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4 && this.status == 200) {
    //             let response = JSON.parse(this.responseText)
    //             if (response == 'ok'){
    //                 return response;
    //             } else {
    //                 alert('Something wrong');
    //                 return response;
    //             }
    //         }
    //     }
    // },

    // test: function(myVar){
    //     function getSomePromise(myVar) {
    //         return new Promise(function (resolve,reject) {
    //             if (myVar)
    //             resolve("It is a success!")
    //             else
    //             reject(("It is a failure."));
    //         });
    //     }
    // }

    
}