import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryStateContext } from '../App';

const Diary = () => {
  const { id } = useParams(); // URL 파라미터 추출
  const diaryList = useContext(DiaryStateContext);

  const targetDiary = diaryList.find(
    (item) => String(item.id) === String(id)
  );

  if (!targetDiary) {
    return <div>해당 일기를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{id}번 일기 상세</h2>
      <p>날짜: {new Date(targetDiary.date).toLocaleDateString()}</p>
      <p>감정: {targetDiary.emotion}</p>
      <p>내용: {targetDiary.content}</p>
    </div>
  );
};

export default Diary;
