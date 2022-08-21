const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
    res.render("contato", {contato: {}});
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.isThereAnyErros()) {
            req.flash("erros", contato.erros);
            req.session.save(() => res.redirect("back"));
            return;
        }
        req.flash("success", "Contato salvo com sucesso");
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
        
    }
    catch(e) {
        console.log(e);
        return res.render("error404");
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render("error404");
    const contato = await Contato.findById(req.params.id);
    if(!contato) return res.render("error404");
    res.render("contato", {contato});
    //res.send(req.params.id + contato);
    /*
    if(!req.params.id) return res.render("error404");
    const contato = await Contato.findById(req.params.id);
    if(!contato) return res.render("error404");
    
    res.render("contato", {contato: contato});
    */
};  
