import Options from './Options';
import './Questions.css';

export default function Questions({ question ,dispatch , answer }) {
  return (
    <div className="question-container">
      <h4 className="question-text">{question.question}</h4>
        <Options question={question} dispatch={dispatch} answer={answer}/>
    </div>
  );
}
