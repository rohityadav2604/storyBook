
export async function retrieveAndAnswer(vectorStore, question, ragChain, options = {}) {
  try {
    // Extract options with defaults
    const { k = 5, relevanceThreshold = 75 } = options;

    // Configure the retriever
    const retriever = vectorStore.asRetriever({
      k, // Number of documents to retrieve
      relevanceThreshold, // Optional: Filter documents by a score threshold (if supported)
    });

    // Retrieve documents based on the question
    const retrievedDocs = await retriever.invoke(question);

    if (!retrievedDocs || retrievedDocs.length === 0) {
      console.warn('No relevant documents were retrieved');

      return { error: 'No relevant documents found', data: [] , status: 404 };
    }

    console.log('Retrieved Documents:', retrievedDocs);

    const context = retrievedDocs.map((doc) => doc.text).join('\n\n');

    const response = await ragChain.invoke({
      question,
      context,
    });

    return response;

  } catch (error) {
    console.error('Error during retrieval or RAG processing:', error);

    return { error: 'An error occurred while processing your request', details: error };
  }
}

export default retrieveAndAnswer;
