# env 파일 불러오기
import os
from dotenv import load_dotenv
load_dotenv()

# 클로바 키 세팅
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")