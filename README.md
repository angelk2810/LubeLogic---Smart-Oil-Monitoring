LubeGuard AI – Smart Engine Oil Health Monitoring System

LubeGuard AI is a real-time engine oil condition monitoring and predictive maintenance system powered by sensors and machine learning.

Instead of changing engine oil based on fixed time or distance intervals, this system continuously analyzes oil condition and predicts the optimal service time using data-driven intelligence.

🚀 Motivation

Traditional engine oil maintenance follows fixed schedules such as:

Every 5,000 km

Every 10,000 km

Every 6 months

However, oil degradation depends on:

Driving style

Engine load

Temperature

Environmental conditions

Traffic patterns

This leads to:

Early oil replacement (cost waste)

Delayed replacement (engine damage)

Environmental pollution

There is a need for intelligent, condition-based maintenance.

💡 Solution Overview

LubeGuard AI integrates:

Real-time oil property sensing

Cloud-based machine learning prediction

Remaining Useful Life (RUL) estimation

Smart dashboard visualization

Automated service alerts

The system continuously monitors oil quality and predicts oil health percentage and remaining usable life.

⚙️ System Architecture
Engine Oil Flow
        ↓
Oil Property Sensors
        ↓
ESP32 Microcontroller
        ↓
Cloud Server (API)
        ↓
Machine Learning Model
        ↓
Oil Health & RUL Prediction
        ↓
Web / Mobile Dashboard
🔧 Sensors Used

Viscosity Sensor – Measures oil thickness degradation

Temperature Sensor (DS18B20 / Thermocouple) – Monitors thermal stress

Dielectric Oil Quality Sensor – Detects contamination levels

Metal Particle Sensor (Inductive Wear Sensor) – Detects engine wear

Optional Pressure Sensor – Monitors oil circulation health

🧠 Machine Learning Approach
Models Implemented

Random Forest Regressor

Gradient Boosting Regressor

LSTM (for time-series degradation trend prediction)

Model Inputs

Viscosity readings

Temperature

Contamination percentage

Wear particle levels

Historical degradation data

Model Outputs

Oil Health Percentage (0–100%)

Remaining Useful Life (km / days)

Maintenance recommendation timing

🛠 Tech Stack
Hardware

ESP32 Microcontroller

Oil property sensors

Backend

Python (Flask / FastAPI)

Machine Learning

Scikit-learn

TensorFlow / Keras

Cloud

Firebase / AWS

Frontend

React / Web Dashboard

Plotly / Chart.js for visualization

Communication

MQTT / REST API

📊 Dashboard Features

Real-time oil health gauge

Degradation trend graph

Remaining useful life prediction

Maintenance alerts

Historical performance logs

Environmental impact indicator

📈 Applications

Passenger vehicles

Fleet management systems

Heavy-duty trucks

Industrial engines

Generators

Smart automotive ecosystems

🎯 Key Advantages

✔ Condition-based maintenance
✔ Reduced maintenance cost
✔ Prevents engine damage
✔ Minimizes oil waste
✔ Predictive analytics
✔ Scalable IoT architecture

🔮 Future Enhancements

Integration with vehicle ECU systems

Fleet-level predictive analytics

Edge AI deployment

Smart garage integration

EV-compatible lubricant monitoring

👨‍💻 Project Domain

IoT + Machine Learning + Predictive Maintenance + Automotive Technology
