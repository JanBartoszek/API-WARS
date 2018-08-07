var registerDOM = {

    createRegisterElements : function(){
        let registerContainer = document.createElement('div');
        registerContainer.setAttribute('class', 'fluid-container')
        registerContainer.setAttribute('id', 'register-container');
        document.body.appendChild(registerContainer);
        document.getElementById('register-container').innerHTML = 
        +'<div class="col-md-12">'
            +'<div class="wrap">'
                +'<div class="three-upper-p">'
                    +'<p class="form-title" id="sign-in-registerDOM" onclick = "registerEvents.loadLoginDOM()">'
                        +'Sign In'
                    +'</p>'
                    +'<p>'
                    +' / '
                    +'</p>'
                    +'<p class="form-title" id="register-registerDOM">'
                        +'Register'
                    +'</p>'
                +'</div>'
                +'<div class="login-register">'
                    +'<input type="text" placeholder="Username" id="username" />'
                    +'<input type="password" placeholder="Password" id="password" />'
                    + '<button onclick = "sendData.sendRegisterInput()" class="btn btn-success btn-sm" >Submit</button>'
                +'</div>'
            +'</div>'
        +'</div>'
//based on https://bootsnipp.com/snippets/ypp84
    },

    removeRegisterDOM: function(){
        let registerContainer = document.getElementById("register-container");
        registerContainer.parentNode.removeChild(registerContainer);
    },

    getRegisterInput: function(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let usernameAndPassword = { username : username, password : password };
        return usernameAndPassword;
    },
}

var registerEvents = {
    loadLoginDOM: function(){
        registerDOM.removeRegisterDOM();
        loginDOM.createLoginElements();
    }
    
}
