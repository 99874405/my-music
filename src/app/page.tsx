'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, User } from '@nextui-org/react'
import { usePlayer } from '../providers/PlayerControlProvider'
import { useMemoizedFn } from 'ahooks'

export default function App() {
  const player = usePlayer()
  const renderCell = useMemoizedFn((record, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <User
            name={record.title}
            className="cursor-pointer"
            description={`专辑: ${record.album}`}
            avatarProps={{ src: record.coverArt, isBordered: true }} />
        )
      default:
        return (
          <span>
            {record[columnKey]}
          </span>
        )
    }
  })

  return (
    <Table
      isStriped
      classNames={{ table: 'min-h-[400px]' }}
      aria-label="Example table with custom cells">
      <TableHeader>
        <TableColumn>歌曲</TableColumn>
        <TableColumn>歌手</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={player.loading}
        loadingContent={<Spinner />}>
        {player.data.map((record, key) => (
          <TableRow key={key}>
            <TableCell>{renderCell(record, 'title')}</TableCell>
            <TableCell>{renderCell(record, 'artist')}</TableCell>
            <TableCell>{renderCell(record, 'duration')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
