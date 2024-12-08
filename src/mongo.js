import 'dotenv/config';

import { MongoClient } from 'mongodb';

export async function connectDb() {
  try {
    const client = new MongoClient(process.env.MongoUrl);

    await client.connect();

    return client;

  } catch (error) {
    console.error('error in connecting to db' , error);

  }

}

export async function  disconnectDb(client) {
  try {
    await client.close();

  } catch (error) {
    console.error('error in disconnecting db' , error);
  }

}

