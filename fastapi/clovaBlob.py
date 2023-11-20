# env 파일 불러오기
import os
from dotenv import load_dotenv
load_dotenv()

# 클로바 키 세팅
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

# 네이버 음성합성
import sys
import urllib.request
import requests

import random

# 테스트 텍스트
# 클로바 경로
url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"
# 클로바 헤더
headers = {
    "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
    "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
    "Content-Type": "application/x-www-form-urlencoded"
}
def clovaVoice(text):

    print(text, "들어왔니")
    # 말 내용
    # encText = urllib.parse.quote(text)
    
    # 여성 목소리
    speaker_dream = {"speaker": "njangj", "speed": -1, "pitch": 1}
    # 남성 목소리
    speaker_nwontak = {"speaker": "nwontak", "speed": 0, "pitch": 1}

    # 여기서 목소리 자유자재로 바꾸기
    speaker_candidate = [speaker_dream, speaker_nwontak]
    choice_speaker = random.choice(speaker_candidate)

    data = {
        "speaker": choice_speaker['speaker'],
        "volume": 0,
        "speed": choice_speaker['speed'],
        "pitch": choice_speaker['pitch'],
        "format": "mp3",
        "text": text
    }
    
    print(data, "데이터")

    response = requests.post(url, data=data, headers=headers)
    print(response, "응답값")
    # print(response.content, "응답 - content")
    return response.content