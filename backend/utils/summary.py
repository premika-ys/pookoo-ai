def summarize_topic(retrieval_chain, topic):

    prompt = f"""
    Give a detailed summary about:
    {topic}
    """

    response = retrieval_chain.invoke({
        "input": prompt
    })

    return response["answer"]