import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { MyServeStaticModule } from './my-serve-static.module';
import { DataSource } from 'typeorm';
import { SimulateurReponseModule } from './simulateur-reponse/simulateur-reponse.module';
import { DatabaseModule } from './database/database.module';
import { AppDataSource } from './data-source';

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
    TypeOrmModule.forRoot(AppDataSource),
    MyServeStaticModule.forRoot({
      rootPath: getStaticFrontPath(),
    }),
    SimulateurReponseModule,
    DatabaseModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
