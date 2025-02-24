import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route.js";
import roleRoute from "./routes/role.route.js";

dotenv.config();


const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/users", userRoutes);
app.use("/api/role", roleRoute);
// app.get("/", (req, res) => {
//     res.json({ message: "Bienvenue sur mon API Express.js Test!" });
// });

app.post("/data", (req, res) => {
    const { naissance } = req.body;
    const age = 2025 - naissance
    res.status(201).send({message: `votre age est : ${age} an` })
});



app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});