import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { emotionList, setPageTitle } from '../util';
import Header from '../component/Header';
import "../css/Diary.css";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  const targetDiary = diaryList.find(
    (item) => String(item.id) === String(id)
  );

  if (!targetDiary) {
    return <div className="Diary">해당 일기를 찾을 수 없습니다.</div>;
  }

  const emotionItem = emotionList.find(
    (e) => e.id === targetDiary.emotion
  );

  // 페이지 타이틀 설정
  setPageTitle(`감정일기 - ${new Date(targetDiary.date).toLocaleDateString()}`);

  return (
    <div>
      <Header
        title="일기 상세보기"
        leftChild={
          <button onClick={() => navigate(-1)} className="backBtn">
            {"< 뒤로가기"}
          </button>
        }
      />
      <div className="Diary">
      <div className="Diary_card">
        <div className="Diary_date">
          📅 {new Date(targetDiary.date).toLocaleDateString()}
        </div>

        <div className="Diary_emotion_wrapper">
          <img src={emotionItem.img} alt={emotionItem.name} />
          <p>{emotionItem.name}</p>
        </div>

        <div className="Diary_content">
          <p>{targetDiary.content}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Diary;
