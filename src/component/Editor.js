// src/components/Editor.js

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Editor.css";
import { emotionList } from "../util";
import { DiaryStateContext } from "../App";

const Editor = ({ isEdit, onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  // 폼 상태 초기화
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const targetDiary = diaryList.find(
        (item) => String(item.id) === String(id)
      );
      if (targetDiary) {
        setDate(new Date(targetDiary.date).toISOString().slice(0, 10));
        setEmotion(targetDiary.emotion);
        setContent(targetDiary.content);
      }
    }
  }, [isEdit, id, diaryList]);

  // 제출 버튼 핸들러
  const handleSubmit = () => {
    if (!content) {
      alert("일기를 작성해주세요!");
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정할까요?" : "일기를 저장할까요?")) {
      onSubmit(date, content, emotion);
      navigate("/", { replace: true });
    }
  };

  // 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="Editor">
      {/* 날짜 입력 */}
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input_date"
        />
      </div>

      {/* 감정 선택 */}
      <div className="editor_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <div
              key={item.id}
              className={`emotion_item ${emotion === item.id ? "selected" : ""}`}
              onClick={() => setEmotion(item.id)}
            >
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 일기 내용 */}
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루를 짧게 기록해보세요 :)"
          className="input_content tall"
        />
      </div>

      {/* 버튼 */}
      <div className="editor_section editor_btns">
        <button className="btn back" onClick={handleGoBack}>
          뒤로가기
        </button>
        <button className="btn submit" onClick={handleSubmit}>
          {isEdit ? "수정 완료" : "작성 완료"}
        </button>
      </div>
    </div>
  );
};

export default Editor;
