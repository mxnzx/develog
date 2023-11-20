import os
import re

import openai

# env 파일 불러오기
from dotenv import load_dotenv

load_dotenv()

# 세팅
OPENAI_KEY = os.getenv("OPENAI_KEY")
MODEL = "gpt-3.5-turbo"


def post_gpt(system_content, user_content):
    try:
        openai.api_key = OPENAI_KEY
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_content}
            ],
            # max_tokens=3000,
            stop=None,
            temperature=0.5
        )
        answer = response.choices[0].message.content
        print("gpt 답변: " + answer)
        return answer
    except Exception as e:
        print(e)
        return None


def resume_prompt(prompt):
    system_content = "You are a helpful consulting assistant."
    pre_prompt = "한국어로 답변해줘; 해당 질문은 기업에 제출할 자기소개서야; 어색한 문맥을 수정해줘; 답변형식은 수정한 내용만 출력해줘; \n\n"
    return post_gpt(system_content, pre_prompt + prompt)


def create_tail_prompt(prompt):
    system_content = "You are a helpful consulting assistant."
    pre_prompt = "한국어로 답변해줘; 해당 문장은 기업 면접 예상질문이야; 이 질문을 제외하고 같이 나올 수 있는 예상 질문을 1개 출력해줘; 답변형식은 다른 설명을 제외하고 예상 질문만 한 문장으로 출력해줘; \n\n"
    return post_gpt(system_content, pre_prompt + prompt)


def create_prediction_prompt(prompt):
    system_content = "You are a helpful consulting assistant."
    pre_prompt = "한국어로 답변해줘; 해당 자기소개서를 통해 나올 수 있는 예상 질문을 5개 출력해줘; 답변형식은 번호를 붙여서 답변만 한 문장씩 출력해줘; \n\n"
    answer = post_gpt(system_content, pre_prompt + prompt)
    # 정규표현식을 사용하여 숫자. 형태의 패턴을 찾음
    sentences = re.split(r'\d+\.', answer)
    # 빈 문자열 및 공백을 제거하여 결과를 정리
    sentences = [sentence.strip() for sentence in sentences if sentence.strip()]
    print(sentences)
    return sentences


