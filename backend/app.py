from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model/random_forest_model.pkl')  # Adjust the path as needed

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract only the 11 features used during model training
        features = np.array([
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope']
        ]).reshape(1, -1)

        prediction = model.predict(features)
        return jsonify({'prediction': int(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)