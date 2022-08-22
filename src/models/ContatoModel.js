const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ""},
    email: {type: String, required: false, default: ""},
    telefone: {type: String, required: false, default: ""},
    criadoEm: {type: Date, default: Date.now()}
});

const ContatoModel = new mongoose.model("Contato", ContatoSchema);

function Contato(body) {
    this.body = body;
    this.erros = [];
    this.contato = null;
};

Contato.prototype.register = async function() {
    this.valida();
    if(this.isThereAnyErros()) return;
    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push("E-mail inválido");
    if(!this.body.nome) this.erros.push("Nome é um campo obrigatório");
    if(!this.body.telefone && !this.body.email) this.erros.push("Um contato deve possuir pelo menos 1 telefone ou 1 email para ser cadastrado");
};

Contato.prototype.cleanUp = function() {
    for(let key in this.body) {
        if(typeof(this.body[key]) !== "string") this.body[key] = "";
    }
    this.reCreateBody();
};

Contato.prototype.reCreateBody = function() {
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.prototype.isThereAnyErros = function() {
    return this.erros.length > 0;
};

Contato.findById = async function(id) {
    if(typeof(id) !== "string") return;
    return await ContatoModel.findById(id);
};

Contato.prototype.edit = async function(id) {
    if(typeof(id) !== "string") return;
    this.valida();
    console.log("chegou até aqui 1");
    if(this.isThereAnyErros()) return;
    console.log("chegou até aqui 2");
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}

module.exports = Contato;