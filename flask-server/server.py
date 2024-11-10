from flask import Flask, request, jsonify
import random
import openai
import time
from openai.error import RateLimitError, OpenAIError


API_KEY = ""
openai.api_key = "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"


app = Flask(__name__)

def handle_transcript(transcript):
    print("Handling the transcript...")
   
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Replace with "gpt-4" if needed
            messages=[
                {"role": "user", "content": "You are an interviewer, rate this interview transcript" + transcript}
            ]
        )
        # Print or return the response content
        #print(response['choices'][0]['message']['content'])
        return response['choices'][0]['message']['content']
   
    except RateLimitError:
        print("Rate limit exceeded. Retrying in 60 seconds...")
        time.sleep(60)  # Wait before retrying
        return handle_transcript(transcript)  # Retry the function
   
    except OpenAIError as e:
        print(f"An error occurred: {e}")
        return None  # Handle other OpenAI-specific errors gracefully

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