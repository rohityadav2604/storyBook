import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function splitDocuments(documents) {

  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 50,
      chunkOverlap: 25,
    });

    const splits = await textSplitter.splitDocuments(documents);

    return splits;

  } catch (error) {
    console.error('error in splitting documents' , error);

  }

}

export default splitDocuments;