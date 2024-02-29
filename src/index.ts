import express from "express";
import { CrimeCrontroller } from "./controllers/crime.controller";
import { CriminosoController } from "./controllers/criminoso.controller";
import { LoginController } from "./controllers/login.controller";
import { UsuarioController } from "./controllers/usuario.controller";
import { verificaAdminMiddleware } from "./middlewares/admin.middleware";
import { validaLoginMiddleware } from "./middlewares/login.middleware";


const app = express();
app.use(express.json());

const criminosoController = new CriminosoController();
const crimeController = new CrimeCrontroller();
const usuarioController = new UsuarioController();
const loginController = new LoginController();


app.post("/criminoso", criminosoController.cadastrarCriminoso)
app.post("/crime/:id", crimeController.cadastrarCrime)
app.get("/crime/:id", crimeController.listarCrimes)
app.post("/usuario",[verificaAdminMiddleware] ,usuarioController.criarUsuario);
app.get("/usuario/:id",[validaLoginMiddleware] ,usuarioController.listarUsuarios);
app.post("/login",  loginController.login);



app.listen(8080, () => {
  console.log("API is running in port 8080.");
});
