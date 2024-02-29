import { randomUUID } from "crypto"
import { Criminoso } from "./criminoso.model"

export class Crime {
   public id: string

    constructor(public nome: string, public endereco: string, public criminoso: Criminoso){
        this.id = randomUUID()
    }
}


