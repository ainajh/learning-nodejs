import { isNotNull } from "../utils/error.js";

export const getUsers = (req, res) => {
    res.status(200).send([
        { id: 1, name: "Alice role" },
        { id: 2, name: "Bob" }
    ]);
};

export const createUser = (req, res) => {
    const { name } = req.body;

    if (isNotNull(name)) {
        return res.status(400).json({ error: "Le champ 'name' est requis." });
    }

    res.status(201).json({ message: `Utilisateur ${name} créé avec succès !` });
};