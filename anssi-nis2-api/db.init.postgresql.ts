import { createDatabase } from 'typeorm-extension';

(async () => {
  await createDatabase({ ifNotExist: true });

  process.exit(0);
})();
