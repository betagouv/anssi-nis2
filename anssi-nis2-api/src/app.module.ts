import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { MyServeStaticModule } from './my-serve-static.module';
import { DataSource } from 'typeorm';
import { SimulateurReponseModule } from './simulateur-reponse/simulateur-reponse.module';
import { DatabaseModule } from './database/database.module';
import { fabriqueAppDataSource } from './data-source';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

const getStaticFrontPath: () => string = () => {
  const currentPathParts = __dirname.split(path.sep);
  const targetPath = [
    ...currentPathParts.slice(0, currentPathParts.length - 2),
    'anssi-nis2-ui',
    'dist',
  ].join(path.sep);
  console.log(`Inside dist ${__dirname} --> ${targetPath}`);
  return path.resolve(targetPath);
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        fabriqueAppDataSource(process.env.SCALINGO_POSTGRESQL_URL),
    }),
    MyServeStaticModule.forRoot({
      rootPath: getStaticFrontPath(),
    }),
    SimulateurReponseModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
