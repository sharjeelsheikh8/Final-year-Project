import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and send data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(formData.age),
          sex: Number(formData.sex),
          cp: Number(formData.cp),
          trestbps: Number(formData.trestbps),
          chol: Number(formData.chol),
          fbs: Number(formData.fbs),
          restecg: Number(formData.restecg),
          thalach: Number(formData.thalach),
          exang: Number(formData.exang),
          oldpeak: Number(formData.oldpeak),
          slope: Number(formData.slope)
        })
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error connecting to the API");
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Heart Disease Detection</h1>
        <p>Enter the patient's details below to predict the likelihood of heart disease.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Sex (0 = Female, 1 = Male):</label>
          <input type="number" name="sex" value={formData.sex} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Chest Pain Type (cp):</label>
          <input type="number" name="cp" value={formData.cp} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Resting Blood Pressure (trestbps):</label>
          <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Serum Cholesterol (chol):</label>
          <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Fasting Blood Sugar (fbs):</label>
          <input type="number" name="fbs" value={formData.fbs} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Resting ECG (restecg):</label>
          <input type="number" name="restecg" value={formData.restecg} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Max Heart Rate (thalach):</label>
          <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Exercise Induced Angina (exang):</label>
          <input type="number" name="exang" value={formData.exang} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>ST Depression (oldpeak):</label>
          <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Slope of Peak Exercise ST Segment (slope):</label>
          <input type="number" name="slope" value={formData.slope} onChange={handleChange} required />
        </div>
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <div className="result">
          <h2>Prediction: {prediction === 1 ? "Heart Disease Detected" : "No Heart Disease"}</h2>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;