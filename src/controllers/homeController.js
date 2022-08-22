const Contato = require("../models/ContatoModel");

exports.index = async(req, res) => {
    const contatos = await Contato.findAll();
    res.render("index", {contatos});
};