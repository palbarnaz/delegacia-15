import { randomUUID } from "crypto"
import { Crime } from "./crime.model"


export class Criminoso {
   public id: string
 

    constructor(public nome: string, public endereco: string,  public idade?: number){
        this.id = randomUUID()
    }
}