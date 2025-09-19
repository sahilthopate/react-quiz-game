import { useEffect } from "react"

export default function Timer({dispatch,secondRemaining}){
    const min = Math.floor(secondRemaining/60);
    const second = secondRemaining %60;
    useEffect(()=>{
        const id= setInterval(()=>{
            dispatch({type:"tick"});
        },1000);
        return ()=>clearInterval(id);
    });
    return(
        <>
            <div className="timer">
                {min <10 && "0"}
                {min}:
                {second < 10 && "0"}
                {second}
            </div>
        </>
    )
}