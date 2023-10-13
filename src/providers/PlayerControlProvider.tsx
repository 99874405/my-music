'use client'
import { useSetState, useMount, useMemoizedFn } from 'ahooks'
import { createContext, useContext, useRef } from 'react'
const context = createContext(void 0)
const Provider = context.Provider

export const usePlayer = () => useContext(context)
export function PlayerControlProvider({ children }: { children: React.ReactNode }) {
  const [audioControl] = [useRef(typeof Audio == 'function' && new Audio()).current]
  const [state, setState] = useSetState({
    loading: !0,
    data: [],
    isPlaying: false,
  })

  useMount(() => {
    setState({
      loading: !1,
      data: require('./mock.json').data
        .map((item, key) => Object.assign(item, { key })),
    })
  })

  const play = useMemoizedFn((musicIndex) => {
    if (audioControl.src && musicIndex == void 0 /* 点击[播放音乐]按钮 控制音乐的播放与暂停 */) {
      audioControl.paused ? audioControl.play() : audioControl.pause()
      setState({ isPlaying: !audioControl.paused })
      return
    }
    audioControl.src = state.data[musicIndex || 0].playLink
    audioControl.play()
    setState({ isPlaying: true })
  })

  return (
    <Provider
      children={children}
      value={{ ...state, play }}
    />
  )
}
