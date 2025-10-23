#!/usr/bin/env python3
"""
Test script for M-Pesa integration
"""
import requests
import json
import time

BASE_URL = 'http://localhost:5000'

def test_mpesa_integration():
    print("Testing M-Pesa Integration...")
    
    # 1. Register a test user
    print("\n1. Registering test user...")
    register_data = {
        "name": "Test User",
        "email": f"mpesa_test_{int(time.time())}@example.com",
        "phone": "254712345678",
        "password": "password123",
        "role": "user"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    if response.status_code == 201:
        user_data = response.json()
        token = user_data['access_token']
        print(f"✓ User registered successfully. Token: {token[:20]}...")
    else:
        print(f"✗ User registration failed: {response.text}")
        return
    
    # 2. Create a trip
    print("\n2. Creating a trip...")
    headers = {'Authorization': f'Bearer {token}'}
    trip_data = {
        "pickup_location": "Nairobi CBD",
        "dropoff_location": "Westlands",
        "fare": 500
    }
    
    response = requests.post(f"{BASE_URL}/api/trips", json=trip_data, headers=headers)
    if response.status_code == 201:
        trip_response = response.json()
        trip_id = trip_response['trip_id']
        print(f"✓ Trip created successfully. Trip ID: {trip_id}")
    else:
        print(f"✗ Trip creation failed: {response.text}")
        return
    
    # 3. Initiate M-Pesa payment
    print("\n3. Initiating M-Pesa payment...")
    payment_data = {
        "phone_number": "254712345678",
        "amount": 500,
        "trip_id": trip_id
    }
    
    response = requests.post(f"{BASE_URL}/api/mpesa/initiate-payment", json=payment_data, headers=headers)
    print(f"Payment response status: {response.status_code}")
    print(f"Payment response: {response.text}")
    
    if response.status_code == 200:
        payment_response = response.json()
        if payment_response.get('success'):
            print("✓ M-Pesa payment initiated successfully!")
            checkout_request_id = payment_response.get('checkout_request_id')
            print(f"Checkout Request ID: {checkout_request_id}")
            
            # 4. Query payment status
            print("\n4. Querying payment status...")
            time.sleep(2)  # Wait a bit before querying
            
            response = requests.get(f"{BASE_URL}/api/mpesa/query-payment/{checkout_request_id}", headers=headers)
            print(f"Query response: {response.text}")
        else:
            print(f"✗ M-Pesa payment initiation failed: {payment_response.get('message')}")
    else:
        print(f"✗ M-Pesa payment request failed: {response.text}")

if __name__ == '__main__':
    test_mpesa_integration()