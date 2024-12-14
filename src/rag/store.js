import { createVectorStore } from '../utils/createVectorStore.js';

async function storeDocuments(splitDocuments) {

  try {

    const vectorStore = await createVectorStore();

    await vectorStore.addDocuments(splitDocuments);

    return { message: 'vector store created' , status: 200};

  } catch (error) {
    console.error('error in storing documents' , error);
    throw error;
  }
}

export default storeDocuments;