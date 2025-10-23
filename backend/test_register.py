#!/usr/bin/env python3
"""
Test script for registration functionality
"""
import requests
import json
import time

BASE_URL = 'http://localhost:5000'

def test_register():
    print("Testing Registration...")
    
    # Test registration
    register_data = {
        "name": "New User",
        "email": f"newuser_{int(time.time())}@example.com",
        "phone": "254712345678",
        "password": "password123",
        "role": "user"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            print("✓ Registration successful!")
        else:
            print("✗ Registration failed")
            
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server. Make sure backend is running on port 5000")
    except Exception as e:
        print(f"✗ Error: {e}")

if __name__ == '__main__':
    test_register()