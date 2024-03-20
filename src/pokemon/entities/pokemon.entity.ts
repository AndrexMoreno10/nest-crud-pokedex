import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema() //Es para decirle a mongo q esto va ser el modelo
export class Pokemon extends Document {

    // id: string; // mongo me lo da

    @Prop({ // Prop -->  propiedades
        unique: true,
        index: true,
    })
    name: string;


    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)