import fs from "fs"; // Module pour lire les fichiers système
import path from "path"; // Module pour gérer les chemins de fichiers
import { fileURLToPath } from "url"; // Permet de convertir `import.meta.url` en chemin de fichier
import dbPromise from "./config/db.js"; // Importation de la connexion à la base de données

// Génération de `__dirname` en mode ESM (car `__dirname` n'existe pas en ES Modules)
const __filename = fileURLToPath(import.meta.url); // Convertit l'URL du module en chemin de fichier
const __dirname = path.dirname(__filename); // Extrait le dossier du fichier actuel

async function runMigrations() {
    try {
        // Attendre la connexion MySQL
        const connection = await dbPromise;

        // Assurer que la table `migrations` existe pour suivre les migrations déjà exécutées
        await connection.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE, -- Stocke le nom du fichier migration
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date et heure d'exécution
            )
        `);

        // Définition du dossier contenant les fichiers SQL de migration
        const migrationDir = path.join(__dirname, "migrations");

        // Lecture des fichiers SQL dans le dossier et tri par ordre alphabétique
        const files = fs.readdirSync(migrationDir).sort();

        // Récupérer la liste des migrations déjà exécutées dans la base de données
        const [executedMigrations] = await connection.query("SELECT filename FROM migrations");
        const executedFiles = new Set(executedMigrations.map(row => row.filename));

        for (const file of files) {
            // Vérifier si cette migration a déjà été exécutée
            if (executedFiles.has(file)) {
                console.log(`🔹 Migration déjà exécutée : ${file}`);
                continue; // Passer au fichier suivant
            }

            // Lire le contenu du fichier SQL
            const filePath = path.join(migrationDir, file);
            const sql = fs.readFileSync(filePath, "utf8");

            // Afficher le fichier en cours d'exécution
            console.log(`📂 Exécution de : ${file}`);
            await connection.query(sql); // Exécuter la requête SQL contenue dans le fichier

            // Enregistrer cette migration comme exécutée pour éviter la duplication
            await connection.query("INSERT INTO migrations (filename) VALUES (?)", [file]);
        }

        // Message de confirmation après l'exécution de toutes les migrations
        console.log("✅ Toutes les migrations ont été exécutées avec succès !");
        process.exit(0); // Terminer le processus proprement
    } catch (error) {
        // Gestion des erreurs en cas de problème pendant l'exécution des migrations
        console.error("❌ Erreur lors de l'exécution des migrations :", error);
        process.exit(1); // Quitter le processus avec un code d'erreur
    }
}

// Lancement de la fonction de migration
runMigrations();
