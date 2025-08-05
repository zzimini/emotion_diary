import React, { createContext, useReducer, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function diaryReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [action.data, ...state];
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.data.id ? { ...item, ...action.data } : item
      );
    default:
      return state;
  }
}

// 초기 더미 데이터 (최초 진입 시 참고용)
const mockData = [
  {
    id: 0,
    date: new Date('2025-08-01').getTime(),
    content: '오늘 날씨가 좋았다 ☀️',
    emotion: 1,
  },
  {
    id: 1,
    date: new Date('2025-08-03').getTime(),
    content: '조금 우울한 하루였다 🌧️',
    emotion: 5,
  },
  {
    id: 2,
    date: new Date('2025-08-05').getTime(),
    content: '햄버거 먹고 기분 좋음 🍔',
    emotion: 2,
  },
];

function App() {
  const [data, dispatch] = useReducer(diaryReducer, []);
  const idRef = useRef(0);

  // ✅ 로컬스토리지에서 초기 데이터 불러오기
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData);
      if (diaryList.length > 0) {
        diaryList.sort((a, b) => b.id - a.id);
        idRef.current = diaryList[0].id + 1;
        dispatch({ type: "INIT", data: diaryList });
        return;
      }
    }

    // 로컬스토리지에 데이터 없을 경우, mockData 사용
    dispatch({ type: "INIT", data: mockData });
    idRef.current = mockData.length;
  }, []);

  // ✅ 데이터가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("diary", JSON.stringify(data));
  }, [data]);

  // createDiary
  const createDiary = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  // deleteDiary
  const deleteDiary = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  };

  // updateDiary
  const updateDiary = (id, date, content, emotion) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ createDiary, deleteDiary, updateDiary }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
