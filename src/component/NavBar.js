// src/component/NavBar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {/* ✅ 홈(메인)으로 이동하는 버튼 */}
        <li onClick={() => navigate("/main")}>홈</li>

        {/* ✅ 일기장 홈으로 이동 */}
        <li onClick={() => navigate("/diary")}>일기장</li>

        {/* ✅ 새 일기 작성으로 이동 */}
        <li onClick={() => navigate("/diary/new")}>새 일기</li>
      </ul>
    </nav>
  );
};

export default NavBar;
