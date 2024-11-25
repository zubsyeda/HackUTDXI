# -*- coding: utf-8 -*-
"""fraudDetect.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1c2avR3r9JK1wZ3SgsJ2zdDzYLeSsy4U0
"""

# Install Tesseract OCR
!apt-get install -y tesseract-ocr

# Install pytesseract library
!pip install pytesseract

import geopy.distance
import cv2
import pytesseract
import numpy as np
import pandas as pd
from datetime import datetime

# Geolocation-based Alerts
def check_geolocation_alert(user_last_location, transaction_location, threshold_km=50):
    """
    Check if the transaction is far from the user's usual location
    :param user_last_location: (latitude, longitude) of the user's last known location
    :param transaction_location: (latitude, longitude) of the transaction
    :param threshold_km: The threshold in kilometers to trigger an alert
    :return: Boolean, True if the location is suspicious (far from user's usual location)
    """
    user_coords = (user_last_location['lat'], user_last_location['lon'])
    transaction_coords = (transaction_location['lat'], transaction_location['lon'])

    distance = geopy.distance.distance(user_coords, transaction_coords).km
    print(f"Distance from user location: {distance} km")
    return distance > threshold_km

# Document Verification with Computer Vision (ID or Bill Verification)
def verify_document_from_camera():
    """
    Capture image from the camera and verify the text on a document using OCR
    :return: Extracted text from the live camera feed
    """
    # Open a connection to the webcam
    cap = cv2.VideoCapture(0)  # Use the first camera (0 for default camera)

    if not cap.isOpened():
        print("Error: Could not access the camera.")
        return

    while True:
        # Read a frame from the camera
        ret, frame = cap.read()

        if not ret:
            print("Error: Failed to capture image.")
            break

        # Convert the frame to grayscale for OCR
        gray_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Apply OCR using Tesseract to extract text
        text = pytesseract.image_to_string(gray_image)

        # Display the live video feed with the detected text on top
        cv2.putText(frame, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

        # Display the frame in a window
        cv2.imshow("Document Verification - Camera Feed", frame)

        # Press 'q' to exit the loop and stop the camera feed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the camera and close any open windows
    cap.release()
    cv2.destroyAllWindows()

# Behavioral Analysis for Fraud Detection
def analyze_transactions(transactions, user_id):
    """
    Analyze a user's transaction behavior to detect anomalies
    :param transactions: List of dictionaries containing transaction data
    :param user_id: The user's ID to analyze
    :return: List of suspicious transactions
    """
    user_transactions = [tx for tx in transactions if tx['user_id'] == user_id]

    suspicious_transactions = []
    for tx in user_transactions:
        # Example: Large withdrawals (over 1000) or high frequency (more than 5 transactions per day)
        if tx['amount'] > 1000 or len([t for t in user_transactions if t['date'].date() == tx['date'].date()]) > 5:
            suspicious_transactions.append(tx)

    return suspicious_transactions

# Example Transaction Data
transactions = [
    {'user_id': 1, 'amount': 500, 'date': datetime(2024, 11, 16, 10, 0), 'transaction_id': 'tx001'},
    {'user_id': 1, 'amount': 2000, 'date': datetime(2024, 11, 16, 11, 30), 'transaction_id': 'tx002'},
    {'user_id': 1, 'amount': 100, 'date': datetime(2024, 11, 16, 13, 0), 'transaction_id': 'tx003'},
    {'user_id': 2, 'amount': 300, 'date': datetime(2024, 11, 16, 12, 0), 'transaction_id': 'tx004'},
]

# Test Geolocation-based Alert
user_last_location = {'lat': 32.7767, 'lon': -96.7970}  # Dallas, TX
transaction_location = {'lat': 33.4484, 'lon': -112.0740}  # Phoenix, AZ

if check_geolocation_alert(user_last_location, transaction_location):
    print("Suspicious location detected! Alert the user.")

verify_document_from_camera()

# Test Behavioral Analysis
suspicious_transactions = analyze_transactions(transactions, 1)
if suspicious_transactions:
    print("Suspicious transactions detected:")
    for tx in suspicious_transactions:
        print(tx)