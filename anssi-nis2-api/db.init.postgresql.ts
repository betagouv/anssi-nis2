import { DatabaseCreateContext, createDatabase } from 'typeorm-extension';
import { env } from 'process';
import { fabriqueAppDataSource } from './src/app-data-source.fabrique';
import 'dotenv/config';

(async () => {
  const dbContext: DatabaseCreateContext = {
    options: await fabriqueAppDataSource(env.SCALINGO_POSTGRESQL_URL),
  };

  await createDatabase({ ...dbContext, ifNotExist: true });
})();
