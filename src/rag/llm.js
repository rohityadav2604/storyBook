import { ChatOpenAI } from '@langchain/openai';

/**
 * Initializes and configures the Language Learning Model (LLM)
 * @returns {Promise<ChatOpenAI>} Configured LLM instance
 * @throws {Error} If initialization fails
 */
async function initializeLLM() {
  try {
    // Initialize with production-ready settings
    const llm = new ChatOpenAI({
      model: 'gpt-4', // Fixed typo in model name
      temperature: 0, // Keep deterministic outputs
      maxRetries: 3, // Add retries for reliability
      timeout: 60000, // 60 second timeout
    });

    return llm;
  } catch (error) {
    console.error('Failed to initialize LLM:', error);
    throw new Error('LLM initialization failed. Please check your configuration and API key.');
  }
}

export default initializeLLM;
