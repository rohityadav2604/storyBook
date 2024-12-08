import 'dotenv/config';

import { ChatPromptTemplate } from '@langchain/core/prompts';

import createChain from './rag/chain.js';
import initializeLLM from './rag/llm.js';
import loadPdf from './rag/load.js';
import retrieve from './rag/retrieve.js';
import splitDocuments from './rag/split.js';
import storeDocuments from './rag/store.js';

const pdfPath = '/Users/rohit/Desktop/constitution gpt/constitution_of_india.pdf';
const prompt = ChatPromptTemplate.fromTemplate(`
    You are an assistant for question-answering tasks. 
    Use the following pieces of retrieved context to answer the question. 
    If you don't know the answer, just say that you don't know. 
    Use three sentences maximum and keep the answer concise.
    
    Context: {context}
    Question: {question}
    Helpful Answer:
`);

const promptquestion = 'what does our indian constituion says';

async function runRagApplication(promptquestion , pdfPath) {

  const documents = await loadPdf(pdfPath);

  console.log('loading pdf done');
  const splitDocument = await splitDocuments(documents);

  console.log('splitting pdf done');

  const store = await storeDocuments(splitDocument);

  console.log('storing pdf done');

  const llm = await initializeLLM();

  console.log('initialise llm done');

  const chain = await createChain(llm , prompt);

  console.log('chaining llm done');

  const retrieveans = await retrieve(store , promptquestion , chain);

  return retrieveans;

}

const response = await runRagApplication(promptquestion , pdfPath);

console.log(response);