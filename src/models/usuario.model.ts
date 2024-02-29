import { randomUUID } from "crypto";

export class Usuario {
    public id: string;

    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public tipo:  string
    ) {
        this.id = randomUUID();
    }
}
