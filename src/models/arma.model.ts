import { randomUUID } from "crypto"
import { Crime } from "./crime.model"
export class Arma {
    public id: string

    constructor(public nome: string, public crime: Crime){
        this.id = randomUUID()
    }
}