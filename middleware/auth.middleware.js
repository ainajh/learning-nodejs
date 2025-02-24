export const authMiddleware = (req, res, next) => {
    // const token = req.headers.authorization;
    const passport = req.headers.passport

    // if (!token || token !== "Bearer 123456") {
    //     return res.status(401).json({ error: "Accès refusé. Token invalide." });
    // }

    if (!passport) {
        return res.status(401).json({ error: "Accès refusé. passport Obligatoire." });
    }

    next();
};
export const healthMiddleware = (req, res, next) => {
    // const token = req.headers.authorization;
    const salama = req.headers.salama

    // if (!token || token !== "Bearer 123456") {
    //     return res.status(401).json({ error: "Accès refusé. Token invalide." });
    // }

    if (salama != "Oui") {
        return res.status(401).json({ error: "Accès refusé. Mila salama Obligatoire." });
    }

    next();
};