import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import Header from "../component/Header";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util"; // ✅ 타이틀 설정 함수 import

const New = () => {
  const { createDiary } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  // ✅ 페이지 타이틀 설정
  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  }, []);

  const handleSubmit = (date, content, emotion) => {
    createDiary(date, content, emotion);
    navigate("/", { replace: true }); // 작성 후 홈으로 이동
  };

  return (
    <div className="New">
      <Header
        title={"새 일기 쓰기"}
        leftChild={<button onClick={() => navigate(-1)} className="backBtn">{"< 뒤로가기"}</button>}
      />
      <Editor isEdit={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default New;
