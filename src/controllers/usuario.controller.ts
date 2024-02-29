import { Prisma, TipoUsuario } from "@prisma/client";
import { Request, Response } from "express";
import { repository } from "../database/prisma.repository";
import { Usuario } from "../models/usuario.model";


export class UsuarioController {

    public async criarUsuario(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { nome, email, senha, tipo } = req.body;

           

            // 2- Processamento
            const usuario = new Usuario(nome, email, senha, tipo);

            const dadosUsuario: Prisma.UsuarioCreateInput = {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                tipo: usuario.tipo as TipoUsuario,
            };

            const result = await repository.usuario.create({
                data: dadosUsuario,
            });

            // 3- Saída
            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

  


    public async listarUsuarios(req: Request, res: Response) {
        try {
            const result = await repository.usuario.findMany();

            return res.status(200).send({
                ok: true,
                message: "Alunos listados com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
