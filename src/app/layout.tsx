import './layout.css'
import type { Metadata } from 'next'
import { UIProvider } from '../providers/UIprovider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function AppLayout(props: any) {
  return (
    <html lang="en" className="light">
      <body>
        <UIProvider>
          {props.children}
        </UIProvider>
      </body>
    </html>
  )
}
