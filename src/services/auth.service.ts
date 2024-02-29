import { randomUUID } from "crypto";
import { repository } from "../database/prisma.repository";
import jwt, { JwtPayload } from "jsonwebtoken";




export interface LoginDTO {
    email: string;
    senha: string;
}

export interface PayloadToken extends JwtPayload {
    id: string;
    nome: string;
    tipo?:string;
}

export class AuthService {
    public async login(data: LoginDTO){
        // Entrada -> parametros da função/método

        // Processamento
   
        const usuario = await repository.usuario.findFirst({
            where: {
                email: data.email,
                senha: data.senha,
            },
            select: {
                id: true,
                nome: true,
                tipo:true
            },
        });

     
        

        if (!usuario) {
            return {
                ok: false,
                message: "Credenciais inválidas",
                code: 401,
            };
        }

        // Gerar a credencial de acesso para o usuario
        const token = jwt.sign(usuario, process.env.JWT_SECRET!)



        return {
            ok: true,
            message: "Login realizado com sucesso",
            code: 200,
            data: {
                id: usuario.id,
                nome: usuario.nome,
                token
            },
        };
    }

    public async validateLogin(token: string, idUsuario: string){
        // Verificar se o token JWT é válido
        const payload = this.validateToken(token) as PayloadToken;

         console.log(payload);
      
        // Validar o ID do token com o ID da requisição
        if (payload == null || idUsuario != payload.id) {
            return {
                ok: false,
                message: "Token de autenticação inválido",
                code: 401,
            };
        }

        return {
            ok: true,
            message: "Validação de login feita com sucesso",
            code: 200,
        };
    }

    public validateToken(token: string) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!);
            console.log(payload);
            
            return payload;
        } catch (error: any) {
            return null;
        }
    }


}
