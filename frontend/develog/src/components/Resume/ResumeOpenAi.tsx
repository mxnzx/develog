import React, { useState } from "react";
import GptResume from "./GptResume";

function ResumeOpenAi() {

  return (
    <div>
      <GptResume/>
    </div>
  );
}

// function ResumeOpenAi() {
//   const [answer, setAnswer] = useState(""); // 초기값은 빈 문자열

//   return (
//     <div>
//       <GptResume answer={answer} setAnswer={setAnswer} />
//     </div>
//   );
// }

export default ResumeOpenAi;
