exports.myMiddlewareGlobal = (req, res, next) => {
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render("error404");
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};