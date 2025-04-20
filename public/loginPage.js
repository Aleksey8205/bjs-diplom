"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();  
        } else {
           this.setLoginErrorMessage("неверно указан логин или пароль")
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            this.setRegisterErrorMessage("регистрация успешно");
            setTimeout(function() {
                location.reload(); }, 2000);
        } else {
            this.setRegisterErrorMessage("не удалось зарегистрироваться")
        }
    }
)};



