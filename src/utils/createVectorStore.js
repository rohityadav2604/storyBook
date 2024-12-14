import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';

import { connectDb } from '../config/db.js';

/**
 * Creates and configures a MongoDB Atlas Vector Search instance
 * @returns {Promise<MongoDBAtlasVectorSearch>} Configured vector store instance
 * @throws {Error} If vector store creation fails
 */
export async function createVectorStore() {
  try {
    // Connect to MongoDB
    const client = await connectDb();

    if (!client) {
      throw new Error('Failed to connect to MongoDB');
    }

    // Initialize database and collection
    const database = client.db(process.env.MONGODB_DATABASE || 'sample_rag');
    const collection = database.collection(process.env.MONGODB_COLLECTION || 'chunks');

    // Configure OpenAI embeddings
    const embeddings = new OpenAIEmbeddings({
      model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create and configure vector store
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection,
      indexName: process.env.MONGODB_INDEX_NAME || 'vector_index',
      textKey: 'text',
      embeddingKey: 'embedding',
      documentKey: 'documentId',
    });

    return vectorStore;

  } catch (error) {
    console.error('Failed to create vector store:', error);
    throw error; // Re-throw to handle in calling function
  }
}
