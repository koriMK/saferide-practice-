#!/usr/bin/env python3
"""
Test script for login functionality
"""
import requests
import json

BASE_URL = 'http://localhost:5000'

def test_login():
    print("Testing Login...")
    
    # Test with existing user
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✓ Login successful!")
        else:
            print("✗ Login failed")
            
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server. Make sure backend is running on port 5000")
    except Exception as e:
        print(f"✗ Error: {e}")

if __name__ == '__main__':
    test_login()