import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function splitDocuments(documents, documentId) {

  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 100,
    });

    const splits = await textSplitter.splitDocuments(documents);
    const splitsWithId = splits.map(split => ({
      ...split,
      metadata: {
        ...split.metadata,
        documentId,
      },
    }));

    return {data:splitsWithId, status:200};

  } catch (error) {
    console.error('error in splitting documents' , error);
    throw error;

  }

}

export default splitDocuments;