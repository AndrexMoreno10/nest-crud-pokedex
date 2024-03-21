import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;


  async executeSeed() {
    console.log(fetch);
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    data.results.forEach(({ name, url }) => {
      console.log(name, url);

      const segments = url.split('/'); //dividimos la url  en donde halla una "/" le ponemos una coma , para saber en que posicion esta nuestro id
      const no = +segments[segments.length - 2] //Ya sabemos que el id esta en la penultima posicion entonces le restamos un -2 para que llegue a esa posicion y extraer el id

      console.log(name, no);


    })

    return data.results;
  }
}
