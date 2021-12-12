import { format } from 'date-fns'

export interface PillTakeProps {
  name: string
  takenAt: number
  amount: number
}

const formatDate = (date: number): string => (
  format(new Date(date), 'd MMM HH:mm')
)

export const PillTake = ({
  name,
  takenAt,
  amount,
}: PillTakeProps) => (
  <article>
    [{ formatDate(takenAt) }] <b>{ name }</b> x{ amount }
  </article>
)
