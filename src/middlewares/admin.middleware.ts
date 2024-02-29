import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthService, PayloadToken } from "../services/auth.service";

export async  function verificaAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Token de autenticação não fornecido." });
        }
         
        
        

        const authService = new AuthService();

        const result =  authService.validateToken(authorization) as PayloadToken;
      //  console.log(result);
  

        if (result.tipo !== 'ADMIN') {
          return res.status(403).json({ message: "Acesso negado. Esta rota é restrita a administradores." });
      }


     
      
        next();

      
    } catch (error) {
        return res.status(500).json({ message: "Erro ao verificar autorização." });
    }
}
