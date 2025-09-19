import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/Header'
import MainPage from './components/MainPage'
import Loader from './components/Loader'
import Error from './components/Error'
import StartQuiz from './StartQuiz'
import Questions from './components/Questions'
import NextButton from './NextButton'
import ProgressBar from './ProgressBar'
import FinishedQuiz from './FinishedQuiz'
import Footer from './Footer'
import Timer from './Timer'

const secondPerQuestion = 30;

const initialState={
    questions:[],
    //"loading","error","ready","active","finished"

    status:"loading",
    index:0,
    answer:null,
    points:0,
    highscore:0,
    restart:null,
    secondRemaining:null,
}

const reducer = (state , action)=>{
  switch (action.type) {
    case "dataRecieved":
      return {...state , questions:action.payload , status:"ready"};
    
    case "start":
      return {...state , status:"active" ,secondRemaining:state.questions.length*secondPerQuestion}
    case "dataFailed":
      return {...state , status:"error"};
    case "newAnswer":
      const question =state.questions.at(state.index);
      return {...state ,answer:action.payload ,
        points:action.payload===question.correctOption ? state.points+question.points : state.points}
    case "nextQuestion":
      return {...state , index:state.index+1,answer:null}
    case "finished":
      return {...state ,status:"finished" ,highscore:state.points>state.highscore ? state.points : state.highscore}
    case "restart":
      return {...initialState , questions:state.questions , status:"ready"}
    case "tick":
      return {...state , secondRemaining:state.secondRemaining-1 ,status:secondRemaining===0 ? "finished" : state.stauts}
    default:
      throw new Error("Action Unknown");
  }
};

function App() {
  const [{questions,status,index ,answer,points,highscore,secondRemaining}, dispatch] =useReducer(reducer,initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,curr)=>prev + curr.points,0);
  useEffect(()=>{
    fetch("http://localhost:8000/questions")
      .then((res)=>res.json())
      .then((data)=>dispatch({type:"dataRecieved", payload:data}))
      .catch((err)=>dispatch({type:"dataFailed"}));
  },[]);
  return (
    <>
    <div className="app  ">
      <Header />
      <MainPage>
        {
          status === "loading" && <Loader />
        }
        {
          status === "error" && <Error />
        }
        {
          status ==="ready" && <StartQuiz numQuestions={numQuestions} dispatch={dispatch}/>
        }
        {
          status ==="active" && (
          <>
          <ProgressBar 
            index={index} 
            numQuestions={numQuestions} 
            answer={answer}
            maxPossiblePoints={maxPossiblePoints}
            points={points}
          />

          <Questions 
            question={questions[index]} 
            dispatch={dispatch} 
            answer={answer}
          />
          <Footer>
            <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
            <NextButton dispatch={dispatch} 
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </Footer>
         </>
        )}
         {
          status ==="finished" && (
            <FinishedQuiz 
              dispatch={dispatch} 
              maxPossiblePoints={maxPossiblePoints} 
              points={points}
              highscore={highscore}
            />
          )}
      </MainPage>
    </div>
    </>
  )
}

export default App
