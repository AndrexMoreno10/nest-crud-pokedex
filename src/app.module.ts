import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';




@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration],
      // validationSchema: JoiValidationSchema,
      
    }), //Variables de entorno

    MongooseModule.forRoot('mongodb://mongo:YmqyeXzPoTxVEdrDpRdytVyCeBzeGMaU@viaduct.proxy.rlwy.net:27246', {
      dbName: 'pokemonsdb'
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //URL DE lA DB --> CONEXION A LA DB
    

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {

  constructor() {

  }

}
