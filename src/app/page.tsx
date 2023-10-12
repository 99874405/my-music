'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { usePlayer } from '../providers/PlayerControlProvider'

export default function App() {
  const player = usePlayer()
  return (
    <Table
      isStriped
      classNames={{ table: 'min-h-[400px]' }}
      aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>歌曲</TableColumn>
        <TableColumn>歌手</TableColumn>
        <TableColumn>专辑</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={player.loading}
        loadingContent={<Spinner />}>
        {player.data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.artist}</TableCell>
            <TableCell>{item.album}</TableCell>
            <TableCell>{item.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
