'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { FcMusic } from 'react-icons/fc'
import { usePlayer } from '../hooks/usePlayer'
import { useReactive, useMount } from 'ahooks'
import { default as axios } from 'axios'

export default function App() {
  const player = usePlayer()
  const state = useReactive({
    loading: true,
    musicList: [],
  })

  useMount(() => {
    axios('/mp3.json').then(resp => {
      state.loading = false
      state.musicList = resp.data
    })
  })

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>歌曲</TableColumn>
        <TableColumn>专辑</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody loadingContent={<Spinner />} isLoading={state.loading}>
        {state.musicList.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.song}</TableCell>
            <TableCell>{item.album}</TableCell>
            <TableCell>{item.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
