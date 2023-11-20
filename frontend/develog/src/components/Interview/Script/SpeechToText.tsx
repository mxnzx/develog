import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true; // 공백이 생겨도 녹음이 계속 이어지도록
  recognition.lang = "ko-KR"; // 언어 : 한국어
}

const SpeechToText = () => {
  const [accentText, setAccentText] = useState<string>("");
  const [accentClickable, setAccentClickable] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  // 음성 -> 텍스트로 변환
  const accenting = () => {
    if (!recognition) return;
    // console.log("accenting 실행");
    let cnt = 0; // event에 쌓이는 데이터 : 리스트 형태 => 인덱스 지정
    setAccentClickable(false);

    // 음성이 잘 입력되고 있다면 아래 실행 (텍스트로 변환)
    recognition.onresult = (event: any) => {
      setAccentText(event.results[cnt][0].transcript); // text변환
      cnt++;
    };
    setIsListening(false);
    recognition.stop(); // 음성인식 종료
    setAccentClickable(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setAccentClickable(true);
    setAccentText(""); // 녹음이 종료되면 변환된 텍스트 초기화
  };

  return {
    isListening,
    startListening,
    accenting,
    stopListening,
    setAccentText,
    accentText,
    // hasRecognitionSupport: !! recognition
  };
};

export default SpeechToText;
