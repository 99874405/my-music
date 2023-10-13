'use client'
import { Image, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, User } from '@nextui-org/react'
import { ImHappy, ImClock, ImHeadphones } from 'react-icons/im'
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
    <div className="container mx-auto p-5">
      <div className="mt-5">
        <div className="flex gap-x-5">
          <Image
            width={165}
            height={165}
            alt=""
            src="https://qpic.y.qq.com/music_cover/iaVNVUXOg73ua71Z0dtuz7Yk5H0BzPibuKcx6noUYeFme1JJ3jibxe5vQ/600?n=1" />
          <div className="pt-2">
            <div className="text-2xl">My Music: 新一代听歌方式</div>
            <div className="flex items-center mt-3 text-sm text-stone-500"><ImHappy /> &nbsp;大家喊我小虎牙</div>
            <div className="flex items-center mt-1 text-sm text-stone-500"><ImClock /> &nbsp;10/12 14:14</div>
            <div className="flex items-center mt-3 text-sm text-stone-500">
              <Button
                size="sm"
                startContent={<ImHeadphones />}
                className="bg-green-600 text-white"
                onClick={() => player.play()}>
                {player.isPlaying ? '暂停' : '播放'}音乐
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
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
              <TableRow key={key} onClick={() => player.play(key)}>
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
