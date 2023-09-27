'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
export default function App() {
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>音乐标题</TableColumn>
        <TableColumn>专辑</TableColumn>
        <TableColumn>时长</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>山川</TableCell>
          <TableCell>??</TableCell>
          <TableCell>03:45</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>歌谣</TableCell>
          <TableCell>??</TableCell>
          <TableCell>03:45</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>模特</TableCell>
          <TableCell>??</TableCell>
          <TableCell>03:45</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>获奖人</TableCell>
          <TableCell>??</TableCell>
          <TableCell>03:45</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
