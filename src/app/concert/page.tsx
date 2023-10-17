'use client'
import { useMount } from 'ahooks'
export default function Concert() {
  useMount(() => {
    console.log('concert')
  })

  return (
    <div>
      concert
    </div>
  )
}