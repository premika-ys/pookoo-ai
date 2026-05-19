def generate_quiz(retrieval_chain, topic):

    prompt = f"""
    Generate 5 MCQ questions with answers from:
    {topic}
    """

    response = retrieval_chain.invoke({
        "input": prompt
    })

    return response["answer"]