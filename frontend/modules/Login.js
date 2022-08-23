import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        console.log("possou por aqui 1");
        this.form.addEventListener("submit", e => {
            console.log("possou por aqui 1");
            e.preventDefault();
            this.validate(e); 
        })
    }

    validate(e) {
        const element = e.target;
        const emailInput = element.querySelector(`input[name="email"]`);
        const passwordInput = element.querySelector(`input[name="senha"]`);

        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert("Email inválido, favor tentar novamente");
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 30) {
            alert("Senha deve possuir entre 3 a 30 caracteres");
            error = true;
        }

        if(!error) element.submit();

        console.log(emailInput.value, passwordInput.value);
    }
};