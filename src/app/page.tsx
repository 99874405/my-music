'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, User, Tooltip } from '@nextui-org/react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Chip, Avatar, Progress } from '@nextui-org/react'
import { FaHeadphones, FaFastBackward, FaFastForward } from 'react-icons/fa'
import { FcDebian, FcMusic } from 'react-icons/fc'
import { usePlayer } from '../providers/PlayerControlProvider'
import { useMemoizedFn } from 'ahooks'
import { LogoIcon } from '../components/LogoIcon'
import { RepeatOneIcon } from '../components/RepeatOneIcon'
import { PreviousIcon } from '../components/PreviousIcon'
import { PauseCircleIcon } from '../components/PauseCircleIcon'
import { PlayCircleIcon } from '../components/PlayCircleIcon'
import { NextIcon } from '../components/NextIcon'
import { ShuffleIcon } from '../components/ShuffleIcon'
import { default as confetti } from 'canvas-confetti'

export default function App() {
  // Hook
  const player = usePlayer()

  // Card
  const renderSong = useMemoizedFn((field) => {
    return (player.currPlayMusic || { title: 'Frontend Radio', artist: '-' })[field]
  })

  // Table
  const renderCell = useMemoizedFn((record, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <User
            name={record.title}
            description={`${record.album}`}
            avatarProps={{ src: record.coverArt, radius: 'sm' }} />
        )

      case 'artist':
        return (
          <Tooltip color="danger" content="Go damai">
            <span className="text-foreground/50 hover:text-foreground/100">
              <a target="_blank" onClick={e => e.stopPropagation()} href={`https://search.damai.cn/search.html?keyword=${record[columnKey]}`}>
                {record[columnKey]}
              </a>
            </span>
          </Tooltip>
        )

      case 'duration':
        return (
          <span className="text-foreground/50">
            {record[columnKey]}
          </span>
        )
    }
  })

  return (
    <>
      <Navbar
        isBlurred={!true}
        shouldHideOnScroll>
        <NavbarBrand>
          <span className="cursor-pointer">
            <LogoIcon size={40} />
          </span>
        </NavbarBrand>
        {/*
        <NavbarContent justify="end">
          <NavbarItem>
            <Chip className="cursor-pointer" color="success" variant="dot">
              <span onClick={() => confetti()}>New Version 0.2.0 🎉</span>
            </Chip>
          </NavbarItem>
          <NavbarItem>
            <span className="cursor-pointer">
              <Avatar
                size="sm"
                src="https://img9.doubanio.com/icon/ul140962189-45.jpg" />
            </span>
          </NavbarItem>
        </NavbarContent>
        */}
      </Navbar>
      <div className="max-w-screen-lg mx-auto p-5 pt-0">
        <div className="mt-5">
          <div className="flex">
            <Card className="bg-background/100">
              <CardBody>
                <div className="flex sm:gap-x-5">
                  <Image
                    width={164}
                    height={164}
                    alt=""
                    shadow="md"
                    className="object-cover hidden sm:block"
                    src={player.currPlayMusic?.coverArt || './image/coverArt.webp'} />
                  <div className="pt-1 w-full sm:w-[350px]">
                    <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                    <div className="text-sm text-foreground/80">{player.data.length} Tracks</div>
                    <h1 className="font-medium text-lg mt-3">{renderSong('title')}</h1>
                    <div className="flex flex-col gap-y-1 mt-1">
                      <Progress
                        size="sm"
                        value={player.currPlayProcess}
                        aria-label="Example progress"
                        classNames={{ indicator: "bg-gradient-to-r from-black to-black" }} />
                      <div className="flex justify-between">
                        <p className="text-sm">{player.currPlayTime}</p>
                        <p className="text-sm text-foreground/50">{player.currPlayMusic?.duration || '4:00'}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        className="data-[hover]:bg-foreground/10">
                        <RepeatOneIcon className="text-foreground/80" />
                      </Button>
                      <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onClick={() => player.playPrev()}
                        className="data-[hover]:bg-foreground/10">
                        <PreviousIcon />
                      </Button>
                      <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onClick={() => player.play()}
                        className="w-auto h-auto data-[hover]:bg-foreground/10">
                        {player.isPlaying ? <PauseCircleIcon size={45} /> : <PlayCircleIcon size={45} />}
                      </Button>
                      <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onClick={() => player.playNext()}
                        className="data-[hover]:bg-foreground/10">
                        <NextIcon />
                      </Button>
                      <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        className="data-[hover]:bg-foreground/10">
                        <ShuffleIcon className="text-foreground/80" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-background/100">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://img9.doubanio.com/icon/ul140962189-45.jpg" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">Summer</h4>
                    <h5 className="text-small tracking-tight text-default-400">summer@gmail.com</h5>
                  </div>
                </div>
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  variant="solid">
                  Follow
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>Full-stack developer, @getnextui lover she/her 🎉</p>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">4</p>
                  <p className="text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">97.1K</p>
                  <p className="text-default-400 text-small">Followers</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="mt-5">
          <Table
            isStriped
            aria-label="Example table"
            classNames={{ table: 'min-h-[400px]', wrapper: 'bg-background/100' }}>
            <TableHeader>
              <TableColumn>Title</TableColumn>
              <TableColumn>Artist</TableColumn>
              <TableColumn>Duration</TableColumn>
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
