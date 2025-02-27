import { isNotNull } from "../utils/error.js";
import dbPromise from "../config/db.js"


export const createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    try {
        // Vérification de la présence des données nécessaires
        if (isNotNull(name) || isNotNull(email) || isNotNull(password) || isNotNull(role_id)) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs (nom, email, mot de passe, role) sont requis"
            });
        }

        // Établit la connexion à la base de données
        const connection = await dbPromise;

        // Effectue une requête pour insérer un nouvel utilisateur
        const [result] = await connection.query(
            'INSERT INTO users (name, email, password,role_id) VALUES (?, ?, ?, ?)',
            [name, email, password, role_id]
        );

        // Vérifier si l'insertion a réussi
        if (result.affectedRows > 0) {
            return res.status(201).json({
                success: true,
                message: "Utilisateur créé avec succès"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la création de l'utilisateur"
            });
        }

    } catch (error) {
        // Si une erreur se produit, renvoyer une réponse d'erreur

        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            error: error.message
        });
    }


};


export const getUsers = async (req, res) => {
    try {
        // Établit la connexion à la base de données
        const connection = await dbPromise;

        // Effectue une requête pour récupérer les utilisateurs
        const [data] = await connection.query('SELECT * FROM users');  // Assurez-vous de remplacer 'utilisateurs' par le nom correct de votre table

        // Retourne les utilisateurs sous forme de réponse
        return res.status(200).json({
            success: true,
            message: "Liste des utilisateurs récupérée avec succès",
            data: data
        });

    } catch (error) {
        // Si une erreur se produit, renvoyer une réponse d'erreur
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des utilisateurs",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params; // L'ID de l'utilisateur à mettre à jour
    const { name, email, password, role_id } = req.body;

    try {
        // Vérification que les champs sont présents dans le corps de la requête
        if (isNotNull(name) || isNotNull(email)  || isNotNull(role_id)) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs (nom, email, mot de passe, role) sont requis"
            });
        }


        // Préparer la requête de mise à jour
        const connection = await dbPromise;

        // Effectuer la mise à jour
        const [result] = await connection.query(
            `UPDATE users SET name = ?, email = ?, ${password  ? 'password = ? ,' : '' } role_id = ? WHERE id = ?`,
            [name, email, password, role_id, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Utilisateur mis à jour avec succès"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour de l'utilisateur"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params; // ID de l'utilisateur à supprimer

    try {
        // Vérifier si l'utilisateur existe
        const connection = await dbPromise;
        const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        // Effectuer la suppression
        const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Utilisateur supprimé avec succès"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression de l'utilisateur"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            error: error.message
        });
    }
};