"""
Test script for the Authentication service
"""
import asyncio
import httpx
import sys
import os

async def test_auth_service():
    """
    Test the authentication service including signup and login
    """
    # Base URL for the auth API (adjust as needed)
    base_url = "http://localhost:8001/auth"
    
    # Sample user data for testing
    test_user = {
        "email": "test@example.com",
        "name": "Test User",
        "password": "SecurePass123!"
    }
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        print("Testing Authentication Service...")
        
        # Test registration
        print("\n1. Testing Registration...")
        try:
            response = await client.post(
                f"{base_url}/register",
                json=test_user
            )
            print(f"Registration Status: {response.status_code}")
            if response.status_code == 200:
                user_data = response.json()
                print(f"Registration Success: {user_data['email']} registered successfully")
            elif response.status_code == 400:
                error_data = response.json()
                print(f"Registration Error: {error_data['detail']}")
                # If user already exists, continue with login test
                if "already registered" in error_data['detail']:
                    print("User already exists, proceeding to login test...")
            else:
                print(f"Unexpected response: {response.text}")
        except Exception as e:
            print(f"Registration Error: {str(e)}")
        
        # Test login
        print("\n2. Testing Login...")
        try:
            response = await client.post(
                f"{base_url}/login",
                data={
                    "email": test_user["email"],
                    "password": test_user["password"]
                }
            )
            print(f"Login Status: {response.status_code}")
            if response.status_code == 200:
                login_data = response.json()
                print(f"Login Success: Token received for {login_data['user']['email']}")
                print(f"Access Token Type: {login_data['token_type']}")
            elif response.status_code == 401:
                error_data = response.json()
                print(f"Login Error: {error_data['detail']}")
            else:
                print(f"Unexpected response: {response.text}")
        except Exception as e:
            print(f"Login Error: {str(e)}")

if __name__ == "__main__":
    print("Starting authentication service tests...")
    asyncio.run(test_auth_service())
    print("Authentication service tests completed.")