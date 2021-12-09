import { HTMLAttributes } from 'react'

export type Alignment = 'start' | 'end' | 'center'

export interface AlignmentViewProps extends HTMLAttributes<HTMLDivElement> {
  x?: Alignment
  y?: Alignment
  full?: 'x' | 'y' | 'both'
  type?: 'row' | 'column'
  gap?: number
  children: React.ReactNode
}

