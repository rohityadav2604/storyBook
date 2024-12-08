import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';

import { connectDb } from '../mongo.js';
async function createVectorStore(client) {
  try {
    const database = client.db('sample_rag');
    const collection = database.collection('chunks');
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
    });

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection,
      indexName: 'vector_index',
      textKey: 'text',
      embeddingKey: 'embedding',
    });

    return vectorStore;

  } catch (error) {
    console.error('error in creating vector store' , error);

  }

}
async function storeDocuments(splitDocuments) {

  try {
    const client = await connectDb();

    const vectorStore = await createVectorStore(client);

    // await vectorStore.addDocuments(splitDocuments);
    // const vectorStore = await MemoryVectorStore.fromDocuments(
    //   splitDocuments,
    //   new OpenAIEmbeddings(),
    // );

    return vectorStore;

  } catch (error) {
    console.error('error in storing documents' , error);

  }
}

export default storeDocuments;