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




