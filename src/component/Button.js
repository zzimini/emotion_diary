import "../css/Button.css";

const Button =({text, type, onClick}) => {
    const btnType = ["positive ", "negative"].includes(type) ? type:"default";
  return (
    <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "버튼",
  type: "default",
  onClick: () => {},
};

export default Button;