from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# 🔹 GET /bfhl - Returns operation_code
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

# 🔹 POST /bfhl - Processes input data
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.get_json()  # Read JSON request
        if not data or "data" not in data:
            return jsonify({"is_success": False, "message": "Invalid input format"}), 400

        input_list = data["data"]
        if not isinstance(input_list, list):
            return jsonify({"is_success": False, "message": "Data should be an array"}), 400

        # Separate numbers & alphabets
        numbers = [item for item in input_list if item.isdigit()]
        alphabets = [item for item in input_list if item.isalpha()]
        highest_alphabet = [max(alphabets)] if alphabets else []

        response = {
            "is_success": True,
            "user_id": "srishti_03072002",
            "email": "sagarsrishti1@gmail.com",
            "roll_number": "22BCS11544",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet,
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

def handler(event, context):  # Required for Vercel
    return app(event, context)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

