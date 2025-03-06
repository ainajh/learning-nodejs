import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    // Récupération du token dans l'en-tête Authorization
    const token = req.headers?.authorization?.replace("Bearer ", "") || "";

    if (!token) {
        return res.status(401).send({
            error: true,
            message: "Vous n'êtes pas autorisé à faire cette action",
        });
    }

    // Vérification du token JWT
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(401).send({
                error: true,
                message:
                    "Vous n'êtes pas autorisé à faire cette action ! Veuillez contacter l'admin",
            });
        }

        // Stocke les informations de l'utilisateur dans res.locals pour les prochains middlewares
        // res.locals.userInfo = decodedToken?.dataValues || decodedToken;

        if (decodedToken.exp < Date.now() / 1000) {
            return res.status(401).json({
                error: true,
                message: "Token expiré. Veuillez vous reconnecter.",
            });
        }

        if (decodedToken?.label != 'Admin') {
            return res.status(401).json({
                error: true,
                message: "Cette action est pour l'admin seulement"
            });
        }


        if (decodedToken?.id) {
            next(); // Passe au middleware suivant
        }

    });
};
export const healthMiddleware = (req, res, next) => {
    next()
};