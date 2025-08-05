import emotion1 from './img/emotion1.png';
import emotion2 from './img/emotion2.png';
import emotion3 from './img/emotion3.png';
import emotion4 from './img/emotion4.png';
import emotion5 from './img/emotion5.png';


/* 감정 이미지 가져오기 함수 */
export const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case '1':
      return emotion1;
    case '2':
      return emotion2;
    case '3':
      return emotion3;
    case '4':
      return emotion4;
    case '5':
      return emotion5;
    default:
      return emotion1;
  }
};

/* 감정 리스트 (id + 이름 + 이미지) */
export const emotionList = [
  {
    id: 1,
    name: '완전 좋음',
    img: emotion1,
  },
  {
    id: 2,
    name: '좋음',
    img: emotion2,
  },
  {
    id: 3,
    name: '그럭저럭',
    img: emotion3,
  },
  {
    id: 4,
    name: '별로',
    img: emotion4,
  },
  {
    id: 5,
    name: '최악',
    img: emotion5,
  },
];

/**
 * 특정 날짜 기준 해당 월의 시작과 끝 timestamp 반환
 * @param {Date} date - 기준 날짜 객체
 * @returns {[number, number]} - [월 시작 timestamp, 월 끝 timestamp]
 */
export const getMonthRangeByDate = (date) => {
  const beginTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime();
  return [beginTime, endTime];
};

export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.innerText = title;
};
