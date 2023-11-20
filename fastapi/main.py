from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from clovaTTS import clovaVoiceFile
from clovaBlob import clovaVoice
from fastapi.responses import StreamingResponse
import io
import requests

from intoGPT import resume_prompt, create_tail_prompt, create_prediction_prompt

app = FastAPI()

# 모든 도메인 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인에서의 요청을 허용하려면 ["*"]로 설정
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용하려면 ["*"]로 설정
    allow_headers=["*"],  # 모든 헤더를 허용하려면 ["*"]로 설정
)

headers = {
    "Content-Type": "application/json",
    "Authorization": ""
}
file_headers = {
    "Content-Type": "multipart/form-data"
}

# 자바 URL
URL = "https://develog.co.kr/api"


# Pydantic 모델을 사용하여 요청 데이터 유효성 검사를 수행합니다.
# 모델
# TTS 모델
class ClovaModel(BaseModel):
    content: str


class RequestResumeScript(BaseModel):
    content: str


class RequestQuestion(BaseModel):
    content: str


class RequestRandomTail(BaseModel):
    interviewId: int
    checkedPredictionId: Union[list, None] = None
    checkedTailId: Union[list, None] = None
    newTail: Union[list, None] = None


@app.post("/fastapi/tts")
def clovaQuestionTTS(data: ClovaModel):
    print(data.content, "콘텐트 왔니")
    blobData = clovaVoice(data.content)
    print(blobData, "blobData입니다!")
    return StreamingResponse(io.BytesIO(blobData), media_type="audio/mpeg")


@app.post("/fastapi/tts/file")
def clovaVoiceQuestionFile(data: ClovaModel):
    print(data.content, "콘텐트 왔니")
    clovaVoiceFile(data.content)
    # print(blobData, "blobData입니다!")
    return 200


@app.post("/fastapi/resume/open-ai")
def fix_resume(data: RequestResumeScript):

    try:
        print(data.content)
        content = resume_prompt(data.content)
        if content is None:
            raise HTTPException(status_code=204, detail="Something went wrong")

        response_data = {
            "status": 200,
            "data": content
        }
    except HTTPException as e:
        response_data = {
            "status": e.status_code,
            "data": "죄송합니다. 오류로 인해 첨삭이 진행되지 않았습니다. 다시 시도해주세요."
        }
    return JSONResponse(content=response_data)


@app.post("/fastapi/interview/create-tail")
def create_tail_question(data: RequestQuestion):

    try:
        print(data.content)
        content = create_tail_prompt(data.content)
        if content is None:
            raise HTTPException(status_code=204, detail="Something went wrong")

        response_data = {
            "status": 200,
            "data": content
        }
    except HTTPException as e:
        response_data = {
            "status": e.status_code,
            "data": "죄송합니다. 오류로 인해 꼬리 질문이 생성되지 않았습니다. 다시 시도해주세요."
        }
    return JSONResponse(content=response_data)


@app.post("/fastapi/interview/create-prediction")
def create_prediction_question(data: RequestResumeScript):

    try:
        print(data.content)
        content = create_prediction_prompt(data.content)
        if content is None:
            raise HTTPException(status_code=204, detail="Something went wrong")

        response_data = {
            "status": 200,
            "data": content
        }
    except HTTPException as e:
        response_data = {
            "status": e.status_code,
            "data": "죄송합니다. 오류로 인해 예상 질문이 생성되지 않았습니다. 다시 시도해주세요."
        }
    return JSONResponse(content=response_data)


@app.post("/fastapi/interview/random-tail")
def create_random_tail_question(data: RequestRandomTail):
    try:
        for tail_data in data.newTail:
            print(tail_data['questionText'])
            content = create_tail_prompt(tail_data['questionText'])
            print(content)
            if content is None:
                raise HTTPException(status_code=204, detail="Something went wrong")
            tail_data.update({"questionText": content})
        json_data = {
            "interviewId": data.interviewId,
            "checkedPredictionId": data.checkedPredictionId,
            "checkedTailId": data.checkedTailId,
            "newTail": data.newTail
        }
        print(type(json_data["newTail"]))   # list
        response = requests.post('http://localhost:9090/api/interview/exam/random/question',
                                 json=json_data,
                                 headers=headers)
        print(response.json())
        return response.json()
    except Exception as e:
        response_data = {
            "status": e.status_code,
            "data": "죄송합니다. 오류로 인해 예상 질문이 생성되지 않았습니다. 다시 시도해주세요."
        }
        return JSONResponse(content=response_data)




