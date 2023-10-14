'use client'
import { useSetState, useMount, useMemoizedFn } from 'ahooks'
import { createContext, useContext, useRef } from 'react'
const context = createContext(void 0)
const Provider = context.Provider

export const usePlayer = () => useContext(context)
export function PlayerControlProvider({ children }: { children: React.ReactNode }) {
  const [audioControl] = [useRef(typeof Audio == 'function' && new Audio()).current]
  const [state, setState] = useSetState({
    dataLoading: !0,
    data: [],
    isPlaying: false,
    currPlayMusic: null,
    currPlayMusicIndex: -1,
  })

  useMount(() => {
    setState({
      dataLoading: !1,
      data: require('./mock.json').data,
    })
  })

  const play = useMemoizedFn((musicIndex) => {
    // 点击 [播放音乐] 或者 [暂停音乐]
    if (audioControl.src && musicIndex == void 0) {
      setState({ isPlaying: !audioControl.paused })
      return audioControl.paused ? audioControl.play() : audioControl.pause()
    }

    setState({ isPlaying: true, currPlayMusic: state.data[musicIndex || 0], currPlayMusicIndex: musicIndex || 0 })
    audioControl.src = state.data[musicIndex || 0].playLink
    audioControl.play()
  })

  return (
    <Provider
      children={children}
      value={{ ...state, play }}
    />
  )
}
