
export async function retrieveAndAnswer(vectorStore, question, ragChain, options = {}) {
  try {
    // Extract options with defaults

    // Configure the retriever
    const retriever = await vectorStore.asRetriever();

    // Retrieve documents based on the question
    const retrievedDocs = await retriever.invoke(question);

    if (!retrievedDocs || retrievedDocs.length === 0) {
      console.warn('No relevant documents were retrieved');

      return { error: 'No relevant documents found', data: [] , status: 404 };
    }

    // const context = retrievedDocs.map((doc) => doc.pageContent).join('\n\n');

    // console.log(context);
    const response = await ragChain.invoke({
      question,
      context : retrievedDocs,
    });

    return {message: response , status: 200};

  } catch (error) {
    console.error('Error during retrieval or RAG processing:', error);

    throw error;
  }
}

export default retrieveAndAnswer;
