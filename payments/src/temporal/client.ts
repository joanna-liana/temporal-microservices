import { Client,Connection } from '@temporalio/client';


export async function setUpClient() {
  const connection = await Connection.connect();

  return new Client({
    connection,
  });
}
