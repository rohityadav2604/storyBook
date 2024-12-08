import { StringOutputParser } from '@langchain/core/output_parsers';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

async function createChain(llm , prompt) {
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