import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
const saltRounds = 10;
const maxAge = 1 * 24 * 60 * 60 * 1000; // Durée de vie du token (3 jours en millisecondes)
export const hashPassword = async (password) => {
    try {
        // Générer un "salt" (valeur aléatoire ajoutée au mot de passe avant hachage)
        const salt = await bcrypt.genSalt(saltRounds);
        // Hacher le mot de passe en utilisant le salt généré
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log((hashedPassword));
        return hashedPassword; // Retourne le mot de passe haché
    } catch (err) {
        // Si une erreur se produit pendant le processus de hachage, on la capture
        console.error(err.message);
        throw new Error('Error hashing password'); // Lance une exception en cas d'erreur
    }
}

// Fonction pour vérifier si un mot de passe correspond au mot de passe haché
export const decryptPassword = async (password, password_now) => {
    // Compare le mot de passe fourni avec le mot de passe haché existant
    return await bcrypt.compare(password, password_now); // true or false
};

export const createToken = (data) => {
    if (typeof data == 'string') return null
    // Crée un token signé contenant les données passées et une expiration
    return jwt.sign({ ...data }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge, // Le token expire après `maxAge` millisecondes
    });
};