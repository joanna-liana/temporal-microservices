import 'reflect-metadata';

import fs from 'node:fs';

import { context, getApp } from './app';

const bootstrap = async (): Promise<void> => {
  const port = process.env.PORT || 3001;

  context.run(new Map(), async () => {
    (await getApp())
      .listen(port, () => console.log(`App listening on port ${port}!`));
  });
};

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`,
  );
});

bootstrap();
