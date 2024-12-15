import { createChain } from '../rag/chain.js';
import { initializeLLM } from '../rag/llm.js';
import retrieveAndAnswer from '../rag/retrieve.js';
import { createVectorStore } from '../utils/createVectorStore.js';

/**
 * Service to handle document retrieval and question answering
 * @param {string} question - The user's question to be answered
 * @returns {Promise<string>} The answer generated from relevant documents
 * @throws {Error} If retrieval or answer generation fails
 */
export async function retrieveService(question) {
  try {

    if (!question || typeof question !== 'string') {
      throw new Error('Invalid question format. Question must be a non-empty string.');
    }

    const vectorStore = await createVectorStore();
    const llm = await initializeLLM();
    const chain = await createChain(llm);

    const response = await retrieveAndAnswer(vectorStore, question, chain);

    if (!response || !response.message) {
      throw new Error('Failed to generate response');
    }

    return {message: response.message, status: 200};
  } catch (error) {
    console.error('Error in retriever service:', error);
    throw new Error('Failed to process question: ' + error.message);
  }
}