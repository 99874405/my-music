'use client'
import { FcMusic } from 'react-icons/fc'
export function renderSong(song: any, player: any) {
  return (
    <div
      className="flex flex-row items-center gap-1 cursor-pointer"
      onClick={() => player.play(`/mp3/李荣浩-${song}.flac`)}>
      <FcMusic className="rotate" />
      <span>{song}</span>
    </div>
  )
}
