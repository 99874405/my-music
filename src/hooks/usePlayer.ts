'use client'
import { useRef, useCallback } from 'react'
export function usePlayer() {
  const audio = useRef(typeof Audio === 'function' && new Audio()).current
  return {
    play: useCallback(audioSrc => {
      audio.src = audioSrc ?? '/mp3/李荣浩-获奖人.flac'
      audio.play()
    }, []),
  }
}
