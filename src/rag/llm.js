import { ChatOpenAI } from '@langchain/openai';

async function initializeLLM() {
  try {
    const llm = new ChatOpenAI({ model: 'gpt-3.5-turbo', temperature: 0 });

    return llm;

  } catch (error) {
    console.error('error in initialise llm' , error);
  }

}

export default initializeLLM;
