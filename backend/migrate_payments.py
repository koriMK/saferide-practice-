#!/usr/bin/env python3
"""
Database migration script to create payments table
"""
import sqlite3
import os

def migrate_database():
    db_path = os.path.join('instance', 'saferide.db')
    
    if not os.path.exists(db_path):
        print("Database not found. Creating new database with updated schema.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if payments table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='payments'")
        if not cursor.fetchone():
            print("Creating payments table...")
            cursor.execute("""
                CREATE TABLE payments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    trip_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    amount REAL NOT NULL,
                    phone_number VARCHAR(20) NOT NULL,
                    checkout_request_id VARCHAR(100) UNIQUE,
                    merchant_request_id VARCHAR(100),
                    mpesa_receipt_number VARCHAR(50),
                    status VARCHAR(20) DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (trip_id) REFERENCES trips (id),
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            """)
            print("Payments table created successfully!")
        else:
            print("Payments table already exists.")
        
        conn.commit()
        print("Database migration completed successfully!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == '__main__':
    migrate_database()