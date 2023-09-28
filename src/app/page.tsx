'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { usePlayer } from '../hooks/usePlayer'
import { useReactive, useMount } from 'ahooks'
import { renderSong } from '../utils/render'
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
    <Table
      isStriped
      classNames={{ table: 'min-h-[400px]' }}
      aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>歌曲</TableColumn>
        <TableColumn>专辑</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={state.loading}
        loadingContent={<Spinner />}>
        {state.musicList.map((item: { song: string; album: string; duration: string; }, index) => (
          <TableRow key={index}>
            <TableCell>{renderSong(item.song, player)}</TableCell>
            <TableCell>{item.album}</TableCell>
            <TableCell>{item.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
