# env 파일 불러오기
import os
from dotenv import load_dotenv
load_dotenv()

# GPT 키 세팅
OPENAIKEY = os.getenv("OPENAIKEY")
