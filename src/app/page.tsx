'use client'
import { Card, CardBody, Image, Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, User } from '@nextui-org/react'
import { FcDebian, FcMusic } from 'react-icons/fc'
import { FaHeadphones } from 'react-icons/fa'
import { usePlayer } from '../providers/PlayerControlProvider'
import { useMemoizedFn } from 'ahooks'

export default function App() {
  const player = usePlayer()
  const renderSong = useMemoizedFn(() => {
    if (player.currPlayMusic) return `${player.currPlayMusic.title} - ${player.currPlayMusic.artist}`
    return '未播放音乐'
  })

  const renderCell = useMemoizedFn((record, columnKey) => {
    const getAvatarProps = (isCurrPlayMusic) => {
      return {
        src: record.coverArt,
        isBordered: true,
        className: isCurrPlayMusic ? `ani-rotate ${!player.isPlaying && 'ani-paused'}` : void 0,
        color: isCurrPlayMusic ? !player.isPlaying ? 'danger' : 'success' : void 0,
      }
    }

    switch (columnKey) {
      case 'title':
        return (
          <User
            name={record.title}
            description={`专辑: ${record.album}`}
            avatarProps={getAvatarProps(player.currPlayMusic == record)} />
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
      <div className="mt-0">
        <Card>
          <CardBody>
            <div className="flex gap-x-5">
              <Image
                width={175}
                height={175}
                alt=""
                src="./image/cover.webp" />
              <div className="pt-2">
                <div className="hidden sm:block sm:text-2xl">My Music: 新一代的听歌应用</div>
                <div className="flex items-center mt-1 text-sm text-stone-500"><FcDebian />&nbsp;不断更新音乐内容</div>
                <div className="flex items-center mt-1 text-sm text-stone-500"><FcDebian />&nbsp;Summer</div>
                <div className="flex items-center my-2 text-sm text-stone-700"><Divider /></div>
                <div className="flex items-center mt-2 text-sm text-stone-700"><FcMusic />&nbsp;{renderSong()}</div>
                <div className="flex items-center mt-2 text-sm text-stone-700">
                  <Button
                    size="sm"
                    startContent={<FaHeadphones />}
                    className={`${!player.isPlaying ? 'bg-danger' : 'bg-green-600'} text-white`}
                    disabled={player.dataLoading}
                    onClick={() => player.play()}>
                    {!player.isPlaying ? '播放' : '暂停'}音乐
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
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
            isLoading={player.dataLoading}
            loadingContent={<Spinner />}>
            {player.data.map((record, key) => (
              <TableRow
                key={key}
                className="cursor-pointer"
                onClick={() => player.play(key)}>
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
