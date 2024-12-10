import  createChain  from './rag/chain.js';
import  initializeLLM  from './rag/llm.js';
import  retrieve  from './rag/retrieve.js';
import  createVectorStore  from './vectorStore.js';
async function retrieveFromRag( promptquestion) {
  const llm = await initializeLLM();

  console.log('initialise llm done');

  const ragchain = await createChain(llm);

  console.log('chaining llm done');
  const store = await createVectorStore();
  const retrieveans = await retrieve(store , promptquestion , ragchain);

  return retrieveans;

}

export default retrieveFromRag;