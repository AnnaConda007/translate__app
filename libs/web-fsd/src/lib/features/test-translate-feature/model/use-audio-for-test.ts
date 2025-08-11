import { useEffect, useRef } from "react"
import uncorrectedAnswerSound from "../../../shared/sounds/bad-answer.mp3";
 import correctAnswerSound from "../../../shared/sounds/correct-answer.mp3";
 import errorSound from "../../../shared/sounds/error.mp3";

 export const useAudio = ()=>{
const correctAnswerAudio =  useRef<HTMLAudioElement>(null)
const uncorrectedAnswerAudio =  useRef<HTMLAudioElement>(null)
const errorAudio =  useRef<HTMLAudioElement>(null)


useEffect (()=>{
    correctAnswerAudio.current  = new Audio(correctAnswerSound);
      uncorrectedAnswerAudio.current =   new Audio(uncorrectedAnswerSound);
errorAudio.current = new Audio(errorSound);


correctAnswerAudio.current.preload = "auto";
correctAnswerAudio.current.load();

uncorrectedAnswerAudio.current.preload = "auto";
uncorrectedAnswerAudio.current.load();

errorAudio.current.preload = "auto";
errorAudio.current.load();
},[])

const toPlayAudio = (audio:HTMLAudioElement|null)=>{
    if(!audio) return
         audio.pause();
  audio.currentTime = 0;
audio.play().catch(() => {})


 } 

     return { 
         correctAnswerAudio: correctAnswerAudio.current,
    uncorrectedAnswerAudio: uncorrectedAnswerAudio.current,
    errorAudio: errorAudio.current,
     toPlayAudio}
 }