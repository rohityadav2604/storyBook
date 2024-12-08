import fs from 'fs';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

async function loadPdf(pdfPath) {
  try {
    if (!fs.existsSync(pdfPath)) throw new Error('Pdf path does not exist');
    const loader = new PDFLoader(pdfPath);

    const docs = await loader.load();

    return docs;

  } catch (error) {
    console.error('error in loading documents' , error);
  }

}

export default loadPdf;
