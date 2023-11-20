import React, { useState } from "react";
import axios from "axios";

// import Button from "components/Common/Button";

const InterviewTTS = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const testTTS = () => {
    // content 변수명 바꾸고 싶다면, fastAPI의 main.py에서 ClovaModel의 content, data.content 여기 다 동일 이름으로 바꿔줘요
    const content =
      "내모습이 보이지않아. 앞길도보이지 않아. 나는 아름다운 번데기. 날개를 활짝 펴고, 세상을 자유롭게 날거야. 노래하며 춤추는 나는 아름다운 나비 워우워우";
    // console.log(content, "이벤트 발생");
    axios
      // 헤더가 있니..?
      .post("https://develog.co.kr/fastapi/tts", { content })

      .then((response) => {
        // console.log("들어갔니?", response);
        // const audioData = JSON.parse(response.data);
        const blobData = new Blob([response.data], { type: "audio/mpeg" });
        // console.log(blobData, "안녕 난 blobData야");
        const audioChangeURL = URL.createObjectURL(blobData);
        setIsPlay(true);
        // console.log(audioChangeURL, "안녕 난 URL이야");
        setAudioUrl(audioChangeURL);

        // const audio = new Audio(URL);
        // setIsPlay(true);
        // audio.play();

        // // 재생 끝나면 없애기
        // audio.onended = () => {
        //   setIsPlay(false);
        // };
      })
      .catch((err) => console.error(err));
  };
  const fileTTS = () => {
    // content 변수명 바꾸고 싶다면, fastAPI의 main.py에서 ClovaModel의 content, data.content 여기 다 동일 이름으로 바꿔줘요
    const content =
      "내모습이 보이지않아. 앞길도보이지 않아. 나는 아름다운 번데기. 날개를 활짝 펴고, 세상을 자유롭게 날거야. 노래하며 춤추는 나는 아름다운 나비 워우워우";
    // console.log(content, "이벤트 발생");
    axios
      // 헤더가 있니..?
      .post("https://develog.co.kr/fastapi/tts/file", { content })
      .then((response) => {
        // console.log("들어갔니?", response);
        // console.log("난 데이터라고 해", response.data);
        // const audioData = JSON.parse(response.data);
        // const blobData = new Blob([audioData], { type: "audio/mp3" });
        // const audioChangeURL = URL.createObjectURL(blobData);
        // setAudioUrl(audioChangeURL);
        // const audio = new Audio(URL);
        // setIsPlay(true);
        // audio.play();
        // // 재생 끝나면 없애기
        // audio.onended = () => {
        //   setIsPlay(false);
        // };
      })
      .catch((err) => console.error(err));
  };

  // console.log(audioUrl, "짜잔");
  return (
    <>
      <p>이건 blob</p>
      <button onClick={testTTS}>제발 되어라!!!!!!</button>
      {isPlay && <audio controls src={audioUrl} />}

      <p>이건 파일 직접 접근</p>
      <button onClick={fileTTS}>이건 파일 형태</button>
      <audio controls src={"/voice/playTTS.mp3"} />
    </>
  );
};

export default InterviewTTS;
