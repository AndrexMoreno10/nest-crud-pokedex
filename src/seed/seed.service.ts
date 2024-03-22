import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
// import { HttpAdapter } from '../common/adapters/http-adapter.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {



  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }


  async executeSeed() {

    //-----------------------------------------------------//   
    //PRIMERA FORMA PARA INSERTAR POR LOTES:
    //-----------------------------------------------------//

    // await this.pokemonModel.deleteMany({}); // delete * from Pokemons

    // const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    // const insertPromisesArray = [];

    // data.results.forEach(({ name, url }) => {
    //   console.log(name, url);

    //   const segments = url.split('/'); //dividimos la url  en donde halla una "/" le ponemos una coma , para saber en que posicion esta nuestro id
    //   const no = +segments[segments.length - 2] //Ya sabemos que el id esta en la penultima posicion entonces le restamos un -2 para que llegue a esa posicion y extraer el id
    //   // const pokemon = await this.pokemonModel.create({ name, no })

    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));

    // });

    // await Promise.all(insertPromisesArray)

    // return 'Seed Executed';

    //-----------------------------------------------------//   
    //SEGUNDA FORMA PARA INSERTAR POR LOTES:
    //-----------------------------------------------------//

    await this.pokemonModel.deleteMany({}); // delete * from Pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    const PokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/'); //dividimos la url  en donde halla una "/" le ponemos una coma , para saber en que posicion esta nuestro id
      const no = +segments[segments.length - 2] //Ya sabemos que el id esta en la penultima posicion entonces le restamos un -2 para que llegue a esa posicion y extraer el id

      PokemonToInsert.push({ name, no });

    });

    await this.pokemonModel.insertMany(PokemonToInsert);

    return 'Seed Executed';

  }
}
