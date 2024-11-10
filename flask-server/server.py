from flask import Flask, request, jsonify
import random
import openai
import time
from openai.error import RateLimitError, OpenAIError



app = Flask(__name__)

def determine_question(index):
    current_index = index
    question_list = []
    with open("Questions.txt",'r') as file:
        for question in file:
            question_list.append(question.strip())

    return question_list[index]

@app.route('/get_question',methods=['POST'])
def get_question():
    data = request.get_json()
    new_index = data.get('index')
    question = determine_question(new_index)
    
    return jsonify({'message': 'sent question', 'data': question})

@app.route('/proccess_audio',methods=['POST'])
def process_data():
    data = request.get_json()
    transcript = data.get('transcript')
    print("Incomming message:")
    print(transcript)
    
    #process interview here
    evaluation = handle_transcript(transcript)
    print(evaluation)
    
    
 
    return jsonify({'message': 'sending back evaluation', 'data': evaluation})


if __name__ == "__main__":
    app.run(debug=True)