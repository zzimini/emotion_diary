import React, { createContext, useReducer, useRef, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import NavBar from './component/NavBar';
import Main from './pages/Main'; // ✅ 메인 페이지 import

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

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData);
      if (diaryList.length > 0) {
        diaryList.sort((a, b) => b.id - a.id);
        idRef.current = diaryList[0].id + 1;
        dispatch({ type: 'INIT', data: diaryList });
        return;
      }
    }
    dispatch({ type: 'INIT', data: mockData });
    idRef.current = mockData.length;
  }, []);

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(data));
  }, [data]);

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

  const deleteDiary = (targetId) => {
    dispatch({ type: 'DELETE', targetId });
  };

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
            {/* ✅ / → /main 으로 이동 */}
            <Route path="/" element={<Navigate to="/main" />} />

            {/* ✅ 메인 서비스 페이지 */}
            <Route path="/main" element={<Main />} />

            {/* ✅ 감정일기 서비스 */}
            <Route path="/diary" element={<LayoutWithNav />}>
              <Route index element={<Home />} />
              <Route path="new" element={<New />} />
              <Route path=":id" element={<Diary />} />
              <Route path="edit/:id" element={<Edit />} />
            </Route>
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

// ✅ NavBar 포함된 레이아웃
function LayoutWithNav() {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
