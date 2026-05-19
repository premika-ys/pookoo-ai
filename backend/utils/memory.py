from utils.database import connect_db


def save_chat(session_id, question, answer):

    conn = connect_db()

    cursor = conn.cursor()

    cursor.execute(

        """

        INSERT INTO chats (
            session_id,
            question,
            answer
        )

        VALUES (?, ?, ?)

        """,

        (
            session_id,
            question,
            answer
        )

    )

    conn.commit()

    conn.close()


def get_chat_history(session_id):

    conn = connect_db()

    cursor = conn.cursor()

    cursor.execute(

        """

        SELECT question, answer
        FROM chats
        WHERE session_id = ?

        """,

        (session_id,)

    )

    rows = cursor.fetchall()

    conn.close()

    return rows