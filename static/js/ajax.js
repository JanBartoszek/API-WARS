var sendData = {
    
    sendRegisterInput: function(){
        let endpoint = '/register'
        let registerInput = registerDOM.getRegisterInput();
        let convertedRegisterInput = logic.convertToJSON(registerInput);
        let result = this.sendToServer(endpoint, convertedRegisterInput).then(function(data) {
            alert('Thank you for registration.');
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },


    sendLoginInput: function(){
        let endpoint = '/login'
        let loginInput = loginDOM.getLoginInput();
        let convertedLoginInput = logic.convertToJSON(loginInput);
        let result = this.sendToServer(endpoint, convertedLoginInput).then(function(data) {
            alert('ok');
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
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
                if (response){
                    resolve(response);
                } else {
                    // alert('Something wrong');
                    reject(response);
                }
            }
        }
    })
    },
 
}