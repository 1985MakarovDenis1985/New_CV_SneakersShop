import {isLogin} from "./test_login";

const loginTest = new isLogin();


let buttonShowContent = document.getElementById("show_content");
let buttonSubmit = document.getElementById("button_submit");
let logoutButton = document.getElementById("logout");
let buttonShowContentTrue = 0;


let submitHandler = (e) => {
    e.preventDefault();

    const email = document.getElementById("check_email").value;
    let emailErr = [];
    const redEmail = document.getElementById("error_email");

    const password = document.getElementById("check_password").value;
    let passErr = [];
    const redPass = document.getElementById("error_password");

    //Ex
    if (!loginTest.isSubmitDog(email)) {
        emailErr.push(" You forgot '@' or '.' ")
    }
    if (!loginTest.isWord(email)) {
        emailErr.push(" Please enter a-z A-Z, ")
    }

    if (!loginTest.isLowerWord(password)) {
        passErr.push(" Please enter a-z")
    }
    if (!loginTest.isUpperWord(password)) {
        passErr.push(" Please enter A-Z")
    }
    if (!loginTest.isNumber(password)) {
        passErr.push(" Please enter 0-9");
    }

    // email
    switch (emailErr.length > 0) {
        case true :
            redEmail.innerHTML = emailErr;
            redEmail.style.color = "red";
            break;
        case false :
            redEmail.innerHTML = "all right";
            redEmail.style.color = "green"
    }

    // password
    switch (passErr.length > 0) {
        case true :
            redPass.innerHTML = passErr;
            redPass.style.color = "red";
            break;
        case false :
            redPass.innerHTML = "all right";
            redPass.style.color = "green"
    }

    // check true login & password
    switch (passErr.length == 0 && emailErr.length == 0) {
        case true :
            loginTest.loginFalse(buttonShowContent, buttonSubmit, buttonShowContentTrue);
            buttonShowContentTrue = 1;
            break;
        case false :
            loginTest.loginTrue(buttonShowContent, buttonSubmit, buttonShowContentTrue);
            buttonShowContentTrue = 0
    }

    if (passErr.length != 0 && emailErr.length != 0) {
        buttonSubmit.addEventListener("submit", wrongSubmit(buttonSubmit), false);
    }
    addShowContentEvent();
};

export function wrong(buttonSubmit) {
    buttonSubmit.style.animationName = "wrong";
}

function wrongSubmit(buttonSubmit) {
    buttonSubmit.addEventListener("click", () => {
        buttonSubmit.style.animationName = "submit_wrong";

        setTimeout(function () {
            buttonSubmit.style.animationName = "wrong";
        }, 500);
    })
}

// FUNCTIOUN TEST
function addShowContentEvent() {
    switch (buttonShowContentTrue) {
        case 1 :
            loginTest.BSCTrue();
            break;                       //// => from module
        case 0 :
            loginTest.BSCFalse()         //// => from module
    }
}


document.addEventListener("submit", submitHandler, false);
logoutButton.addEventListener("click", () => {
    loginTest.loginPageAppear()
});


let arrBottomsOption = Array.from(document.getElementsByClassName("button_option"));
for (let i = 0; i < arrBottomsOption.length; i++) {
    arrBottomsOption[i].addEventListener("click", (e) => {
        for (let i = 0; i < arrBottomsOption.length; i++) {
            arrBottomsOption[i].classList.remove("button_option_untouch")
        }
        e.target.classList.add("button_option_untouch")
    });
}
