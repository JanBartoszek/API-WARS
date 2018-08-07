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
            planetsData.activeUser = data;
            sendData.getVotedPlanets(planetsData.activeUser)
            loginEvents.loadPlanetsDOM(data);
            getData.getPlanets(planetsData.initialPlanetsEndpoint);
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },


    logout : function(activeUser){
        let endpoint = '/logout'
        let convertedActiveUser = logic.convertToJSON(activeUser);
        this.sendToServer(endpoint, convertedActiveUser).then(function(data) {
            planetsDOM.removePlanetsDOM();
            loginDOM.createLoginElements();
            planetsData.votedPlanets = []
            alert('Successful logout');
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },


    sendVote : function(username, planet){
        let endpoint = '/vote'
        let dataToSend = logic.convertToJSON({username : username, planet_name : planet})
        this.sendToServer(endpoint, dataToSend).then(function(data) {
            planetsDOM.changeVoteAttributes(data);
            alert('Thank you for your vote');
            sendData.getVotedPlanets(planetsData.activeUser)
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },


    getVotedPlanets : function(activeUser){
        let endpoint = '/voted_planets'
        let convertedActiveUser = logic.convertToJSON(activeUser);
        this.sendToServer(endpoint, convertedActiveUser).then(function(data) {
            planetsData.votedPlanets = data;
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

    checkLoggedIn : function(){
        let endpoint = '/check_logged_in'
        this.getData(endpoint).then(function(data) {
            if (data){ 
                planetsData.activeUser = data;
                sendData.getVotedPlanets(planetsData.activeUser)
                planetsDOM.loadPlanetsAll(data)
                getData.getPlanets(planetsData.initialPlanetsEndpoint);
            } else {            
                loginDOM.createLoginElements();
            }
        })
    },


    changePlanetsPage: function(endpoint){
        if (endpoint != null){
            planetsDOM.removePlanetsAndModals();
            planetsDOM.createPlanetsElements();
            getData.getPlanets(endpoint)
        }
    },


    getPlanets: function(endpoint){
        planetsDOM.createAwaitingGif();
        let planets = this.getData(endpoint).then(function(data) {
            planetsData.residents = []
            planetsData.nextPlanetsEndpoint = data.next;
            planetsData.previousPlanetsEndpoint = data.previous;
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

    getStatistics : function(){
        let endpoint = '/statistics'
        let statisticsModalBody = document.getElementById("statisticsModal").getElementsByClassName('tbody')[0]
        this.getData(endpoint).then(function(data) {
            if (data){ 
                if (statisticsModalBody.hasChildNodes() == false){
                planetsDOM.fillUpStatisticsModal(data)
                } else {
                    planetsDOM.removeStatisticsModalBody()
                    planetsDOM.fillUpStatisticsModal(data)
                }
            } else {     
                alert('Something went wrong. Please try again.');
            }
        })
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
    },
}
