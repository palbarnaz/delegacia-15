import { PrismaClient } from "@prisma/client";
import {Request, Response} from "express"
import { Criminoso } from "../models/criminoso.model"


const repository = new PrismaClient();
export class CriminosoController {
    public async cadastrarCriminoso(req: Request, res: Response){
        try {
            const {nome, endereco, idade} = req.body
           

 

const criminoso = new Criminoso( nome, endereco, idade )
            const result = await repository.criminoso.create({data: criminoso})

            return res.status(201).send({ok: true, message: "Criminoso fichado!", data: result})

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    }
}

// id String @id @default(uuid()) @db.Uuid
// nome String @db.VarChar(60)
// endereco String @db.VarChar(200) 
// idade Int?
// createdAt DateTime @default(now()) @map("created_at")
// updatedAt DateTime @updatedAt @map("updated_at")