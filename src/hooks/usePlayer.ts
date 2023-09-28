'use client'
import { useRef, useCallback } from 'react'
export function usePlayer() {
  const audio = useRef(typeof Audio === 'function' && new Audio()).current
  return {
    play: useCallback((audioSrc: string) => {
      audio.src = audioSrc
      audio.play()
    }, []),
  }
}
