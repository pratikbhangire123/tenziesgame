/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';

export default function Timer(props) {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)
    const checkGameplay = !props.gameplayState
    const [bestTime, setBestTime] = useState(JSON.parse(localStorage.getItem("time")))

    useEffect(() => {
        gameplay()
        setBestTime(time => JSON.parse(localStorage.getItem("time")))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkGameplay])

    const gameplay = () => {
        if(props.gameplayState) {
            handleStart()
        }
        else {
            handlePause()
        }
    }

    const handleStart = () => {
        handleReset()
        setIsActive(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }
    
    const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setTimer(0)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)
        if(bestTime > timer) {
            localStorage.setItem("time", JSON.stringify(timer))
        }
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return (
        <div>
          <h3 style={{color: "#5035FF"}}>Timer: {formatTime()}</h3>
          <h3 style={{color: "red"}}>Your Best Time: {bestTime} seconds</h3>
        </div>
      );
    
}