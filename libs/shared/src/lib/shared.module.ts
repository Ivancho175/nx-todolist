import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from './config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const API_KEY = 'myKey';
const API_KEY_PROD = 'myKeyProd';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, db_name } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName: db_name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env['NODE_ENV'] !== 'production' ? API_KEY : API_KEY_PROD,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, db_name } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(db_name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class SharedModule {}
