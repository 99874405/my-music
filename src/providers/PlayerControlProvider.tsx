'use client'
import { createContext, useContext } from 'react'
import { useSetState, useMount } from 'ahooks'
const context = createContext(void 0)
const Provider = context.Provider

export const usePlayer = () => useContext(context)
export function PlayerControlProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useSetState({
    data: [],
    loading: !0,
  })

  useMount(() => {
    setState({
      data: require('./mock.json'),
      loading: !1,
    })
  })

  return (
    <Provider
      value={state}
      children={children}
    />
  )
}
