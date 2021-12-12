export interface PillProps {
  name: string
  iconURL: string
  selectedAmount?: number
  onChange(amount: number): void
}

