'use client'
import { createContext, useContext } from 'react'
import { useSetState, useMount } from 'ahooks'
import { default as request } from 'axios'

const context = createContext()
const Provider = context.Provider
export const usePlayer = () => useContext(context)
export function PlayerControlProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useSetState({
    data: [],
    loading: !0,
  })

  useMount(() => {
    request.get('/mock.json?t=1.0.0')
      .then(({ data }) => setState({ data, loading: !1 }))
  })

  return (
    <Provider
      value={state}
      children={children}
    />
  )
}
