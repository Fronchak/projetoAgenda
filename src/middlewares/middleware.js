exports.myMiddleware = (req, res, next) => {
    res.locals.umaVariavelLocal = "Este é o valor da variável local";
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