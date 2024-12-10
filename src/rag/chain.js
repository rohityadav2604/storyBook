import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

const prompt = ChatPromptTemplate.fromTemplate(`
  You are an assistant for question-answering tasks. 
  Use the following pieces of retrieved context to answer the question. 
  If you don't know the answer, just say that you don't know. 
  Use three sentences maximum and keep the answer concise.
  
  Context: {context}
  Question: {question}
  Helpful Answer:
`);

async function createChain(llm) {
  try {
    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser(),
    });

    return ragChain;
  } catch (error) {
    console.error('error in creating chain' , error);
  }

}

export default createChain;