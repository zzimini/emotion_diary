import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import Header from "../component/Header";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { updateDiary, deleteDiary } = useContext(DiaryDispatchContext);

  const targetDiary = diaryList.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (!targetDiary) {
      alert("일기가 삭제되었습니다.");
      navigate("/", { replace: true });
    }
  }, [id, targetDiary, navigate]);

  const handleSubmit = (date, content, emotion) => {
    updateDiary(parseInt(id), date, content, emotion);
    navigate("/", { replace: true });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteDiary(parseInt(id));
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      {targetDiary && (
        <>
          <Header
            title={"일기 수정하기"}
            leftChild={
              <button onClick={() => navigate(-1)} className="backBtn">
                {"< 뒤로가기"}
              </button>
            }
            rightChild={
              <button onClick={handleDelete} className="deleteBtn">
                삭제하기
              </button>
            }
          />
          <Editor
            isEdit={true}
            originData={targetDiary}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default Edit;
