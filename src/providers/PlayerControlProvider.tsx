'use client'
import { useSetState, useMount, useUpdateEffect } from 'ahooks'
import { createContext, useContext } from 'react'
const context = createContext(void 0)
const Provider = context.Provider

export const usePlayer = () => useContext(context)
export function PlayerControlProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useSetState({
    loading: !0,
    version: '',
    data: [],
  })

  useUpdateEffect(() => {
    console.log('appVersion', state.version)
  }, [state.version])

  useMount(() => {
    setState({
      loading: !1,
      ...require('./mock.json'),
    })
  })

  return (
    <Provider
      value={state}
      children={children}
    />
  )
}
