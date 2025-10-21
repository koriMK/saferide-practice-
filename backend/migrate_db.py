#!/usr/bin/env python3
"""
Database migration script to add name and phone fields to users table
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
        # Check if columns already exist
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'name' not in columns:
            print("Adding 'name' column to users table...")
            cursor.execute("ALTER TABLE users ADD COLUMN name VARCHAR(100) DEFAULT 'User'")
            
        if 'phone' not in columns:
            print("Adding 'phone' column to users table...")
            cursor.execute("ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT ''")
        
        # Update existing users with default values
        cursor.execute("UPDATE users SET name = 'User' WHERE name IS NULL OR name = ''")
        cursor.execute("UPDATE users SET phone = '' WHERE phone IS NULL")
        
        conn.commit()
        print("Database migration completed successfully!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == '__main__':
    migrate_database()