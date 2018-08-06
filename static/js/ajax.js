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
            loginEvents.loadPlanetsDOM();
            getData.getPlanets(planetsData.initialPlanetsEndpoint);
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
                    reject(response);
                }
            }
        }
    })
    },
}


var getData = {

    changePlanetsPage: function(endpoint){
        if (endpoint != null){
            planetsDOM.removePlanetsAndModals();
            planetsDOM.createPlanetsElements();
            getData.getPlanets(endpoint)
        }
    },


    getPlanets: function(endpoint){
        // let endpoint = 'https://swapi.co/api/planets/';
        planetsDOM.createAwaitingGif();
        let planets = this.getData(endpoint).then(function(data) {
            planetsData.nextPlanetsEndpoint = data.next;
            planetsData.previousPlanetsEndpoint = data.previous;
            // console.log(planetsData)
            console.log(data);
            planetsDOM.removeAwaitingGif();
            planetsDOM.createDivsWithImages(data.results);
        })

    },

    getResidents: function(indexNumber){
        let listOfEndpoint = planetsData.residents[indexNumber]
        let tableBody = document.getElementById("myModal"+indexNumber).getElementsByClassName('tbody')[0]

        if (tableBody.hasChildNodes() == false){
        listOfEndpoint.forEach(function(endpoint) {
            getData.getData(endpoint).then(function(data) {
                    planetsDOM.fillUpResidentsTable(indexNumber, data)
            })        
        })
        };
    },


    getData: function(endpoint) {
        return new Promise(function(resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText)
                resolve(response);
            }
            };
            xhttp.open("GET", endpoint, true);
            xhttp.send();
        })
    }
}
