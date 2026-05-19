# import sqlite3

# DATABASE_NAME = "chat_memory.db"


# def connect_db():

#     conn = sqlite3.connect(DATABASE_NAME)

#     return conn


# def create_table():

#     conn = connect_db()

#     cursor = conn.cursor()

#     cursor.execute("""

#         CREATE TABLE IF NOT EXISTS chats (

#             id INTEGER PRIMARY KEY AUTOINCREMENT,

#             session_id TEXT,

#             question TEXT,

#             answer TEXT

#         )

#     """)

#     conn.commit()

#     conn.close()


# create_table()

import sqlite3

DATABASE_NAME = "chat_memory.db"


# CONNECT DATABASE
def connect_db():

    conn = sqlite3.connect(
        DATABASE_NAME,
        check_same_thread=False
    )

    return conn


# CREATE TABLES
def create_tables():

    conn = connect_db()

    cursor = conn.cursor()

    # CHAT TABLE
    cursor.execute("""

        CREATE TABLE IF NOT EXISTS chats (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            session_id TEXT,

            question TEXT,

            answer TEXT

        )

    """)

    # USERS TABLE
    cursor.execute("""

        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT,

            email TEXT UNIQUE,

            password TEXT

        )

    """)
    # USERS TABLE
#     cursor.execute("""

#     CREATE TABLE IF NOT EXISTS users (

#         id INTEGER PRIMARY KEY AUTOINCREMENT,

#         name TEXT,

#         email TEXT UNIQUE,

#         password TEXT,

#         university TEXT DEFAULT ''

#     )

# """)

    conn.commit()

    conn.close()


create_tables()




# import sqlite3

# DATABASE_NAME = "chat_memory.db"


# # CONNECT DATABASE
# def connect_db():

#     conn = sqlite3.connect(
#         DATABASE_NAME,
#         check_same_thread=False
#     )

#     return conn


# # CREATE TABLES
# def create_tables():

#     conn = connect_db()

#     cursor = conn.cursor()

#     # CHAT TABLE
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS chats (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             session_id TEXT,
#             question TEXT,
#             answer TEXT
#         )
#     """)

#     # USERS TABLE
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS users (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             name TEXT,
#             email TEXT UNIQUE,
#             password TEXT
#         )
#     """)

#     # SESSIONS TABLE
#     # Persists session metadata per user so sidebar
#     # chat history survives a browser refresh.
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS sessions (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             session_id TEXT UNIQUE,
#             user_email TEXT,
#             title TEXT DEFAULT 'New Chat',
#             updated_at TEXT
#         )
#     """)

#     conn.commit()
#     conn.close()


# create_tables()