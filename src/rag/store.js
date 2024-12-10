import createVectorStore from '../vectorStore.js';
async function storeDocuments(splitDocuments) {

  try {

    const vectorStore = await createVectorStore();

    await vectorStore.addDocuments(splitDocuments);

    return 'vector store created';

  } catch (error) {
    console.error('error in storing documents' , error);

  }
}

export default storeDocuments;