def summerize(text):
    from transformers import pipeline

    pipe = pipeline("summarization")
    return pipe(text)
