'use client'
import { useSetState, useMount, useMemoizedFn, useEventListener } from 'ahooks'
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

  // 手动播放 当前音乐
  const play = useMemoizedFn((musicIndex) => {
    // 点击 [当前歌曲]
    if (state.currPlayMusicIndex == musicIndex) {
      return
    }

    // 点击 [播放音乐 | 暂停音乐]
    if (audioControl.src && musicIndex == void 0) {
      setState({ isPlaying: !state.isPlaying })
      return audioControl.paused ? audioControl.play() : audioControl.pause()
    }

    setState({ isPlaying: true, currPlayMusic: state.data[musicIndex || 0], currPlayMusicIndex: musicIndex || 0 })
    audioControl.src = state.data[musicIndex || 0].playLink
    audioControl.play()
  })

  // 手动播放 上首音乐
  const playPrev = useMemoizedFn(() => {
    const musicIndex = (state.currPlayMusicIndex - 1 + state.data.length) % state.data.length
    play(musicIndex)
  })

  // 手动播放 下首音乐
  const playNext = useMemoizedFn(() => {
    const musicIndex = (state.currPlayMusicIndex + 1) % state.data.length
    play(musicIndex)
  })

  // 自动播放 下首音乐
  useEventListener('ended', playNext, {
    target: audioControl,
  })

  return (
    <Provider
      children={children}
      value={{ ...state, play, playPrev, playNext }}
    />
  )
}
