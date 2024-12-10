import 'dotenv/config';

import loadPdf from './rag/load.js';
import splitDocuments from './rag/split.js';
import storeDocuments from './rag/store.js';

async function uploadFileToDb(pdfPath) {

  try {
    const documents = await loadPdf(pdfPath);

    console.log('loading pdf done');
    const splitDocument = await splitDocuments(documents);

    console.log('splitting pdf done');

    await storeDocuments(splitDocument);

    return 'file uploaded';
  } catch (error) {
    console.error('error in uploading file to db' , error);
  }
}

export default uploadFileToDb;