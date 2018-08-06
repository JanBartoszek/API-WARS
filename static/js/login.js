    // based on https://bootsnipp.com/snippets/ypp84

var loginDOM = {

    createLoginElements : function(){
        let loginContainer = document.createElement('div');
        loginContainer.setAttribute('class', 'fluid-container')
        loginContainer.setAttribute('id', 'login-container');
        document.body.appendChild(loginContainer);
        document.getElementById('login-container').innerHTML = '<div class="col-md-12">'
        +'<div class="wrap">'
            +'<div class="three-upper-p">'
                +'<p class="form-title" id="sign-in-loginDOM">'
                    +'Sign In'
                +'</p>'
                +'<p>'
                +' / '
                +'</p>'
                +'<p class="form-title" id="register-loginDOM" onclick = "loginEvents.loadRegisterDOM()">'
                    +'Register'
                +'</p>'
            +'</div>'
            +'<div class="login-register">'
                +'<input type="text" placeholder="Username" id="username" />'
                +'<input type="password" placeholder="Password" id="password" />'
                + '<button onclick = "sendData.sendLoginInput()" class="btn btn-success btn-sm" >Submit</button>'
            +'</div>'
        +'</div>'
    +'</div>';
    },

    removeLoginDOM: function(){
        let loginContainer = document.getElementById("login-container");
        loginContainer.parentNode.removeChild(loginContainer);
    },

    getLoginInput: function(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let usernameAndPassword = { username : username, password : password };
        return usernameAndPassword;
    },
}

var loginEvents = {
    loadRegisterDOM: function(){
        loginDOM.removeLoginDOM();
        registerDOM.createRegisterElements();
    },

    loadPlanetsDOM: function(){
        loginDOM.removeLoginDOM();
        planetsDOM.createNavbar(planetsDOM.createPlanetsElements);
        // planetsDOM.createPlanetsElements();
    }
    
}

var loginLogic = {

}
