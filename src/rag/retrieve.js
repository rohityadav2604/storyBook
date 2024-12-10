
async function retrieve(vectorStore , promptquestion , ragChain) {

  try {
    const retriever = vectorStore.asRetriever();
    const retrievedDocs = await retriever.invoke(promptquestion);
    // const retrievedDocs = await retriever.getAllDocuments();

    const response = await ragChain.invoke({
      question: promptquestion,
      context: retrievedDocs,
    });

    return response;

  } catch (error) {
    console.error('error in retrieving', error);
  }

}

export default retrieve;