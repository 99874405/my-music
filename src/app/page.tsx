'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { FcMusic } from 'react-icons/fc'
import { usePlayer } from '../hooks/usePlayer'
import { useReactive, useMount } from 'ahooks'
import { motion } from 'framer-motion'
import { default as axios } from 'axios'

export default function App() {
  const player = usePlayer()
  const state = useReactive({
    musics: [],
  })

  useMount(() => {
    axios('/mp3/data.json').then(resp => {
      state.musics = resp.data
    })
  })

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>歌曲</TableColumn>
        <TableColumn>专辑</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody>
        {state.musics.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div
                className="flex flex-row items-center gap-x-2 cursor-pointer"
                onClick={() => player.play('/mp3/李荣浩-' + item.name + '.flac')}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}><FcMusic /></motion.div>
                <span>{item.name}</span>
              </div>
            </TableCell>
            <TableCell>
              {item.referer}
            </TableCell>
            <TableCell>
              {item.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
