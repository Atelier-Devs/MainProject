import axios from "axios";
import React, { useEffect, useState } from "react";

const Red = () => {
  const [data, setData] = useState("");
  const [count, setCount] = useState(1);
  const changehandle = (e) => {
    setData(e.target.value);
  };
  const clickhandle = (e) => {
    e.preventDefault();
    console.log("제출 버튼이눌렸어요");
    setCount(count + 1);
    callPhyton();
  };

  const callPhyton = async () => {
    console.log("callPhyton");
    const response = await axios
      .post(
        "http://localhost:5000/datapost",
        { qustion: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>데이터 프레임 출력</div>

      <p>김민서 번역기 입니다</p>
      <input
        type="textarea"
        name="question"
        className="w-1/2"
        placeholder="번역할 한국어를 입력하시오"
        onChange={changehandle}
      />
      <br />
      <input type="button" onClick={clickhandle} value={"제출"} />
    </div>
  );
};

export default Red;
