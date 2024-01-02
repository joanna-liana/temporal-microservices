import 'reflect-metadata';

import { context, getApp } from './app';

const bootstrap = async (): Promise<void> => {
  const port = process.env.PORT || 3001;

  context.run(new Map(), async () => {
    (await getApp())
      .listen(port, () => console.log(`App listening on port ${port}!`));
  });
};

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

bootstrap();
