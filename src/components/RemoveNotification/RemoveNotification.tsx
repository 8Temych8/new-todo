import { useEffect, useState } from "react";
import styles from "./RemoveNotification.module.scss";
import returnSVG from "../../assets/return.svg";

interface RemoveNotificationProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  undoRemove: () => void;
}

const RemoveNotification: React.FC<RemoveNotificationProps> = (props) => {
  const [count, setCount] = useState<number>(3);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [animationReady, setAnimationReady] = useState<boolean>(false);

  const circleRadius = 12;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = animationReady
    ? ((3 - count) / 3) * circleCircumference
    : circleCircumference;

  useEffect(() => {
    if (props.isVisible) {
      setCount(3);
      setIsFading(false);
      setAnimationReady(false);
      setTimeout(() => setAnimationReady(true), 10);
    }
  }, [props.isVisible]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFading(true);
      setTimeout(() => {
        props.setIsVisible(false);
      }, 1000);
    }
  }, [count]);

  const handleClick = () => {
    props.setIsVisible(false);
    setCount(3);
    props.undoRemove();
  };

  if (!props.isVisible) return null;

  return (
    <div
      className={`${styles.popUp} ${isFading ? styles.fadeOut : ""}`}
      onClick={handleClick}
    >
      <div
        style={{
          position: "relative",
          width: "26px",
          height: "26px",
          overflow: "visible",
        }}
      >
        <svg
          key={animationReady ? "progress" : "initial"}
          width="26px"
          height="26px"
          viewBox="0 0 26 26"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="13"
            cy="13"
            r={circleRadius}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circleCircumference}
            strokeDashoffset={progress}
            style={{
              transition: animationReady
                ? "stroke-dashoffset 1s linear"
                : "none",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {count}
        </div>
      </div>
      <span className={styles.undoText}>UNDO</span>
      <img
        className={styles.returnSVG}
        src={returnSVG}
        alt="RETURN"
        width="15px"
        height="14px"
      />
    </div>
  );
};

export default RemoveNotification;
