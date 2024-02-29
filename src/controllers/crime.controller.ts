import { PrismaClient } from "@prisma/client";
import {Request, Response} from "express"
import { Crime } from "../models/crime.model";
import { Criminoso } from "../models/criminoso.model";

const repository = new PrismaClient();


export class CrimeCrontroller {
    public async listarCrimes(req:Request, res:Response){

        try{
             const {id} = req.params
            

             const criminoso = await repository.criminoso.findUnique({
                where:{id}
             })

             if(!criminoso){
                return res.status(404).send({
                    ok:false, message: 'Criminoso nao encontrado.'
                })
             }

             
             const crimes = await repository.crime.findMany({
                where:{ idCriminoso: id }
             })
        
              
            

             return res.status(201).send({
                ok:true,
                data: crimes
             })

        }catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }


    }
    public async cadastrarCrime(req:Request, res:Response){

        try{
             const {id} = req.params
             const {nome, endereco} = req.body

             const criminoso = await repository.criminoso.findUnique({
                where:{id}
             })

             if(!criminoso){
                return res.status(404).send({
                    ok:false, message: 'Criminoso nao encontrado.'
                })
             }

             

        
             const criminosoBackend = new Criminoso(criminoso.nome, criminoso.endereco, criminoso.idade ?? undefined)

             const crime = new Crime(nome, endereco, criminosoBackend)

             const result = await repository.crime.create({
                data: {
                    nome: crime.nome,
                    endereco: crime.endereco,
                    idCriminoso: criminoso.id
                }
             })

             return res.status(201).send({
                ok:true,
                 message: 'Crime cadastrado',
                 data: result
             })

        }catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }


    }
}