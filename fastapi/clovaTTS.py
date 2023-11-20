# env 파일 불러오기
import os
from dotenv import load_dotenv
load_dotenv()

# 클로바 키 세팅
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

import random

# 네이버 음성합성 Open API 예제
import os
import sys
import urllib.request
client_id = CLIENT_ID
client_secret = CLIENT_SECRET

# 말 내용
# encText = urllib.parse.quote(text)

# 여성 목소리
speaker_dream = {"speaker": "njangj", "speed": -1, "pitch": 1}
# 남성 목소리
speaker_nwontak = {"speaker": "nwontak", "speed": 0, "pitch": 1}


text = "반갑습니다 네이버파트라 세상에서 제일가는 포테이토칩 캬하하하"

def clovaVoiceFile(text):
    # 여기서 목소리 자유자재로 바꾸기
    speaker_candidate = [speaker_dream, speaker_nwontak]
    choice_speaker = random.choice(speaker_candidate)

    encText = urllib.parse.quote(text)
    data = f"speaker={choice_speaker['speaker']}&volume=0&speed={choice_speaker['speed']}&pitch={choice_speaker['pitch']}&format=mp3&text=" + encText
    url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"
    request = urllib.request.Request(url)
    request.add_header("X-NCP-APIGW-API-KEY-ID",client_id)
    request.add_header("X-NCP-APIGW-API-KEY",client_secret)
    response = urllib.request.urlopen(request, data=data.encode('utf-8'))
    rescode = response.getcode()
    if(rescode==200):
        print("TTS mp3 저장")
        response_body = response.read()
        with open('../develog-front/public/voice/playTTS.mp3', 'wb') as f:
            f.write(response_body)
    else:
        print("Error Code:" + rescode)