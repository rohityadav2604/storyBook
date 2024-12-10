import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';

import { connectDb } from './mongo.js';

async function createVectorStore() {
  try {
    const client = await connectDb();
    const database = client.db('sample_rag');
    const collection = database.collection('chunks');
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-ada-002',
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
export default createVectorStore;