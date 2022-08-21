const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if(this.isThereAnyErros()) return;
        await this.userExists();
        if(this.isThereAnyErros()) return;
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.erros.push("E-mail inválido");

        if(this.body.password.length < 3 || this.body.password.length > 30) this.erros.push("A senha precisa ter entre 3 a 30 caracteres");
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof(this.body[key]) !== "string") {
                this.body[key] = "";
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.senha
        };
    }

    async userExists() {
        if(await this.findByEmail()) this.erros.push("Já existe um cadastro com esse e-mail");
    }

    async findByEmail() {
        return await LoginModel.findOne({email: this.body.email});
    }

    isThereAnyErros = () => this.erros.length > 0;

    async login() {
        this.valida();
        if(this.isThereAnyErros()) return;
        this.user = await this.findByEmail();
        if(!this.user) {
            this.erros.push("Usuário não cadastrado");
            return;
        }
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.erros.push("Senha inválida");
            this.user = null;
            return;
        }
    }
}


module.exports = Login;