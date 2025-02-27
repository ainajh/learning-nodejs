import mysql from "mysql2/promise";
import dotenv from "dotenv";
// Charger les variables d'environnement
dotenv.config();


async function createConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DBHOST,    // hôte de la base de données
        user: process.env.DBUSER,    // utilisateur MySQL
        password: process.env.DBPASSWORD, // mot de passe
        database: process.env.DATABASE // nom de la base de données
    });

    console.log("✅ Connexion à la base de données réussie !");
    return connection;
}
// Exporter la connexion promise
export default createConnection();