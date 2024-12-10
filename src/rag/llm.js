import { ChatOpenAI } from '@langchain/openai';

async function initializeLLM() {
  try {
    const llm = new ChatOpenAI({ model: 'gpt-4o', temperature: 0 });

    return llm;

  } catch (error) {
    console.error('error in initialise llm' , error);
  }

}

export default initializeLLM;
