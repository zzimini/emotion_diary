import React, { useState, useEffect, useContext } from "react";
import Header from "../component/Header";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, emotionList, setPageTitle } from "../util";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();

  const [curDate, setCurDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [sortType, setSortType] = useState("latest");

  const year = curDate.getFullYear();
  const month = curDate.getMonth() + 1;

  const handlePrevMonth = () => {
    setCurDate(new Date(year, curDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurDate(new Date(year, curDate.getMonth() + 1, 1));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleNewDiary = () => {
    navigate("/new");
  };

  useEffect(() => {
  // 🔥 페이지 타이틀 설정
  setPageTitle(`${year}년 ${month.toString().padStart(2, "0")}월의 감정일기장`);

  if (diaryList.length >= 1) {
    const [startTime, endTime] = getMonthRangeByDate(curDate);

    const filtered = diaryList.filter(
      (item) => startTime <= item.date && item.date <= endTime
    );

    const sorted = filtered.sort((a, b) =>
      sortType === "latest" ? b.date - a.date : a.date - b.date
    );

    setFilteredData(sorted);
  }
}, [diaryList, curDate, sortType, year, month]);

  return (
    <>
      <Header
        title={`${year}년 ${month.toString().padStart(2, "0")}월`}
        leftChild={
          <button onClick={handlePrevMonth} className="month_nav">◀</button>
        }
        rightChild={
          <button onClick={handleNextMonth} className="month_nav">▶</button>
        }
      />

      <div className="Home">
        <div className="Home_control_box">
          <select value={sortType} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>

          <button onClick={handleNewDiary} className="new_btn">
            새 일기 쓰기
          </button>
        </div>

        <section>
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              해당 월의 일기가 없습니다.
            </p>
          ) : (
            <ul className="diary_list">
              {filteredData.map((item) => {
                const emotionItem = emotionList.find(e => e.id === item.emotion);

                return (
                  <li key={item.id} className="diary_item">
                    {/* 감정 이미지 */}
                    <div className="diary_emotion">
                      <img src={emotionItem.img} alt={emotionItem.name} />
                      <p>{emotionItem.name}</p>
                    </div>

                    {/* 내용 */}
                    <div
                      className="diary_content"
                      onClick={() => navigate(`/diary/${item.id}`)}
                    >
                      <h4>{new Date(item.date).toLocaleDateString()}</h4>
                      <p className="content_preview">
                        {item.content.length > 50
                          ? item.content.slice(0, 50) + "..."
                          : item.content}
                      </p>
                    </div>

                    {/* 수정 버튼 */}
                    <div className="diary_btn">
                      <button onClick={() => navigate(`/edit/${item.id}`)}>
                        ✏ 수정
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
