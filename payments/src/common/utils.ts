import { context } from '../app';

export const contextUtil = (): void => {
  console.log(
    'I am using context ID',
    (context.getStore() as Map<string, unknown>).get('id')
  );
};
