import './StartQuiz.css';

export default function StartQuiz({ numQuestions, dispatch }) {
  return (
    <div className="start-container">
      <div className="start-card shadow-lg p-5">
        <h2 className="quiz-title mb-4">🎯 Welcome to the Quiz App</h2>
        <p className="quiz-subtitle">
          You have <span className="highlight">{numQuestions}</span> questions to test your skills!
        </p>

        <button
          className="btn btn-primary btn-lg start-btn mt-4"
          onClick={() => dispatch({ type: 'start' })}
        >
          🚀 Let's Start
        </button>
      </div>
    </div>
  );
}
