import { Request, Response } from "express";

import { randomUUID } from "crypto";
import { AuthService } from "../services/auth.service";

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).send({ ok: false, message: "Informe todos os campos obrigatórios" });
            }

            // 2- Processamento
            const authService = new AuthService();
            const result = await authService.login({
                email,
                senha,
            });

            // 3- Saída
            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
