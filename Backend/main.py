import sqlite3
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["http://127.0.0.1:5500", "https://abedelrhman-kassem.github.io"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserFields(BaseModel):
    username: str
    password: str


# check if the username and password is correct and return auth_token
@app.post("/check-user")
async def check_user(fields: UserFields):

    try:
        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        create_table_query = f"SELECT user_id, name, password FROM users WHERE name = '{fields.username}'"

        cursor.execute(create_table_query)

        data = cursor.fetchone()

        if not data:
            raise HTTPException(status_code=404, detail="User not found")

        if fields.password != data[2]:
            raise HTTPException(status_code=401, detail="password is not correct")

        auth_token = str(uuid.uuid4())

        cursor.execute(
            f'UPDATE users SET auth_token = "{auth_token}" where user_id = {data[0]}'
        )

        return {"Authentication": auth_token}

    finally:
        db.commit()
        db.close()


@app.post("/register")
async def register(fields: UserFields):

    try:
        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        auth_token = str(uuid.uuid4())

        create_table_query = f"INSERT INTO users VALUES (NULL, '{fields.username}', '{fields.password}', NULL, '{auth_token}') "

        cursor.execute(create_table_query)

        return {"Authentication": auth_token}

    finally:
        db.commit()
        db.close()


# return only one question and question_id required param
@app.get("/question/{question_id}")
async def get_question(question_id: int):
    try:
        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        create_table_query = (
            f"SELECT * FROM testing_questions WHERE id = '{question_id}'"
        )

        cursor.execute(create_table_query)

        data = cursor.fetchone()

        cursor.execute(f"SELECT COUNT(*) FROM testing_questions")

        number_of_questions = cursor.fetchone()

        if not data:
            raise HTTPException(status_code=404, detail="question not found")

        result = [
            {
                "id": data[0],
                "question": data[1],
                "answer": data[6],
            },
            {"questions_count": number_of_questions[0]},
        ]

        result[0].update(
            {
                "options": {
                    "option_1": data[2],
                    "option_2": data[3],
                    "option_3": data[4],
                    "option_4": data[5],
                }
            }
        )

        return result

    finally:
        db.commit()
        db.close()


# return questions with limit, offset and if the limit, offset is not given return all the questions
@app.get("/questions")
async def get_question(limit: int | None = None, offset: int | None = None):
    try:
        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        create_table_query = f"SELECT * FROM testing_questions"

        if limit:
            create_table_query += f" LIMIT {limit}"

        if offset:
            create_table_query += f" OFFSET {offset}"

        cursor.execute(create_table_query)

        data = cursor.fetchall()

        if not data:
            raise HTTPException(status_code=404, detail="question not found")

        result = []

        for question in data:
            result.append(
                {
                    "id": question[0],
                    "question": question[1],
                    "option_1": question[2],
                    "option_2": question[3],
                    "option_3": question[4],
                    "option_4": question[5],
                    "answer": question[6],
                }
            )
        return result

    finally:
        db.commit()
        db.close()


class Score(BaseModel):
    score: int
    auth_token: str


@app.post("/score")
async def submit_score(data: Score):
    try:

        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        get_auth_token = f"SELECT * FROM users WHERE auth_token = '{data.auth_token}'"

        cursor.execute(get_auth_token)

        user_auth_token = cursor.fetchone()

        if not user_auth_token:
            raise HTTPException(status_code=401, detail="Token is invalid")

        create_table_query = f"UPDATE users SET score = '{data.score}' WHERE auth_token = '{data.auth_token}'"

        cursor.execute(create_table_query)

        return {"message": f"score updated succefully => {data.score}"}

    finally:
        db.commit()
        db.close()


@app.get("/get-score")
async def get_score(auth_token: str):
    try:
        db = sqlite3.connect("./sql_education.db")
        cursor = db.cursor()

        create_table_query = (
            f"SELECT score FROM users WHERE auth_token = '{auth_token}'"
        )

        cursor.execute(create_table_query)

        data = cursor.fetchone()

        if not data:
            raise HTTPException(status_code=401, detail="Not Authorized")

        return {"score": data[0]}

    finally:
        db.commit()
        db.close()
