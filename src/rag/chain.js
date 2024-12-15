import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

// Enhanced Prompt Template
const prompt = ChatPromptTemplate.fromTemplate(`
You are an intelligent assistant specializing in extracting knowledge from documents.
Your goal is to provide accurate and concise answers based on the provided context.
- Use the given context to answer the question accurately and concisely 
- If the context lacks information, respond with "I cannot answer based on the provided context"
- Keep your answer within three sentences, prioritizing clarity and helpfulness

Context:
{context}
  
  Question: 
  {question}
  
  Helpful Answer:
`);

export async function createChain(llm) {
  try {
    // Create the retrieval-augmented generation (RAG) chain
    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser(), // Parse the output into a string
    });

    return ragChain;
  } catch (error) {
    console.error('Error while creating RAG chain:', error);
    throw new Error('Failed to create the chain. Please check your configuration.');
  }
}

