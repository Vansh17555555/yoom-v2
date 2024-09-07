from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7, openai_api_key=OPENAI_API_KEY)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
vector_store = None

def process_jsonl(url):
    response = requests.get(url)
    transcription_text = ""
    for line in response.text.split('\n'):
        if line.strip():
            data = json.loads(line)
            if data['type'] == 'speech':
                transcription_text += data['text'] + " "
    return transcription_text

def update_vector_store(text):
    global vector_store
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_text(text)
    if vector_store is None:
        vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    else:
        vector_store.add_texts(chunks)

@app.route('/process_transcription', methods=['POST'])
def process_transcription():
    url = request.json.get('url')
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    transcription_text = process_jsonl(url)
    update_vector_store(transcription_text)
    return jsonify({"message": "Transcription processed successfully"}), 200

@app.route('/chat', methods=['POST'])
def chat():
    global vector_store
    user_question = request.json.get('question', '')

    if vector_store is None:
        return jsonify({"reply": "No transcription data available. Please process a transcription first."}), 400

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(),
        memory=memory
    )
    response = chain({"question": user_question})
    return jsonify({"reply": response["answer"]})

if __name__ == '__main__':
    app.run(debug=True)