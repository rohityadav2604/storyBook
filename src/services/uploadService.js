import 'dotenv/config';

import loadPdf from '../rag/load.js';
import splitDocuments from '../rag/split.js';
import storeDocuments from '../rag/store.js';

async function uploadFileToDb(documentId , path) {

  try {
    const documents = await loadPdf(path);
    const splitDocument = await splitDocuments(documents , documentId);

    const storeResponse = await storeDocuments(splitDocument.data);

    if (storeResponse.status === 200) {
      return {message:storeResponse.data , status:storeResponse.status};
    } else {
      return {message:storeResponse.data , status:500};
    }

    // return 'file uploaded';
  } catch (error) {
    console.error('error in uploading file to db' , error);
    throw error;
  }
}

export default uploadFileToDb;