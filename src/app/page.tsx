'use client'
import { Card, CardBody, Image, Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, User, Tooltip } from '@nextui-org/react'
import { Navbar, NavbarBrand } from '@nextui-org/react'
import { FaHeadphones, FaFastBackward, FaFastForward } from 'react-icons/fa'
import { FcDebian, FcMusic } from 'react-icons/fc'
import { usePlayer } from '../providers/PlayerControlProvider'
import { useMemoizedFn } from 'ahooks'
import { default as Logo } from '../components/logo'

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
        color: isCurrPlayMusic ? !player.isPlaying ? 'success' : 'danger' : void 0,
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
          <Tooltip color="danger" content="演唱会">
            <span className="text-stone-600 hover:text-rose-600">
              <a target="_blank" onClick={e => e.stopPropagation()} href={`https://search.damai.cn/search.html?keyword=${record[columnKey]}`}>
                {record[columnKey]}
              </a>
            </span>
          </Tooltip>
        )
      case 'duration':
        return (
          <span className="text-stone-600">
            {record[columnKey]}
          </span>
        )
    }
  })

  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <Logo size="40" />
        </NavbarBrand>
      </Navbar>
      <div className="max-w-screen-lg mx-auto p-5 pt-0">
        <div className="mt-0">
          <Card
            style={{ backgroundImage: `url('./image/${player.currPlayMusic?.artist || '李荣浩'}.webp')` }}
            className="bg-top bg-right bg-contain bg-no-repeat bg-[#eaeaea]">
            <CardBody>
              <div className="flex gap-x-5">
                <Image
                  width={166}
                  height={166}
                  alt=""
                  src={player.currPlayMusic?.coverArt || './image/coverArt.webp'} />
                <div className="pt-2">
                  <div className="flex items-center mt-1 text-sm text-stone-500"><FcDebian />&nbsp;夏天漫步世界</div>
                  <div className="flex items-center mt-1 text-sm text-stone-500"><FcDebian />&nbsp;Summer</div>
                  <div className="flex items-center my-5 text-sm text-stone-800"><Divider /></div>
                  <div className="flex items-center mt-1 text-sm text-stone-800"><FcMusic />&nbsp;{renderSong()}</div>
                  <div className="flex items-center mt-2 text-sm text-stone-800">
                    <Button
                      size="sm"
                      startContent={<FaHeadphones />}
                      className={`${!player.isPlaying ? 'bg-green-600' : 'bg-danger'} text-white`}
                      disabled={player.dataLoading}
                      onClick={() => player.play()}>
                      {!player.isPlaying ? '播放' : '暂停'}
                    </Button>
                    {player.currPlayMusic && (
                      <Button
                        size="sm"
                        isIconOnly
                        className="ml-2"
                        disabled={player.dataLoading}
                        onClick={() => player.playPrev()}>
                        <FaFastBackward />
                      </Button>
                    )}
                    {player.currPlayMusic && (
                      <Button
                        size="sm"
                        isIconOnly
                        className="ml-2"
                        disabled={player.dataLoading}
                        onClick={() => player.playNext()}>
                        <FaFastForward />
                      </Button>
                    )}
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
    </>
  )
}
