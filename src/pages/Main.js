// src/pages/Main.js
import React from "react";
import "../css/Main.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="Main">
      <h1 className="main-title">Welcome to My Life Services 🌈</h1>
      <p className="main-sub">일상을 기록하고 관리할 수 있는 다양한 기능을 제공합니다.</p>

      <div className="service-grid">
        <div className="service-card" onClick={() => navigate("/diary")}>📖 감정 일기장</div>
        <div className="service-card" onClick={() => alert("클래스 예약 서비스 준비 중입니다.")}>🎨 클래스 예약</div>
        <div className="service-card" onClick={() => alert("가계부 기능 준비 중입니다.")}>💰 가계부</div>
        <div className="service-card" onClick={() => alert("목표관리 기능 준비 중입니다.")}>🎯 목표 관리</div>
      </div>
    </div>
  );
};

export default Main;
