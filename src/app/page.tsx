'use client'
import { FiGithub, FiClock, FiHeadphones } from 'react-icons/fi'
import { Image, Button } from '@nextui-org/react'
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
      case 'artist':
        return (
          <span className="text-stone-500">
            {record[columnKey]}
          </span>
        )
      case 'duration':
        return (
          <span className="text-stone-500">
            {record[columnKey]}
          </span>
        )
    }
  })

  return (
    <div className="p-5">
      <div className="flex gap-x-5">
        <Image
          width={150}
          height={150}
          src="https://qpic.y.qq.com/music_cover/iaVNVUXOg73ua71Z0dtuz7Yk5H0BzPibuKcx6noUYeFme1JJ3jibxe5vQ/600?n=1" />
        <div className="flex flex-col justify-center">
          <div className="text-2xl">Next Music: 新一代听歌方式</div>
          <div className="flex items-center mt-3 text-sm text-gray-500"><FiGithub /> &nbsp;大家喊我小虎牙</div>
          <div className="flex items-center mt-1 text-sm text-gray-500"><FiClock /> &nbsp;10/12 14:14</div>
          <div className="flex items-center mt-3">
            <Button
              size="sm"
              startContent={<FiHeadphones />}
              className="bg-green-600 text-white">
              播放歌曲
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
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
      </div>
    </div>
  )
}
