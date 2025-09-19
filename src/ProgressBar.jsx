import { motion } from "framer-motion";
import "./ProgressBar.css";

export default function ProgressBar({
  index,
  numQuestions,
  answer,
  maxPossiblePoints,
  points,
}) {
  const progressValue = ((index + Number(answer !== null)) / numQuestions) * 100;

  return (
    <header className="progress-container">
      {/* Animated Progress Bar */}
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Stats */}
      <div className="progress-info">
        <p className="progress-text">
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p className="progress-points">
          <strong>{points}</strong> / {maxPossiblePoints} points
        </p>
      </div>
    </header>
  );
}
