export interface PillProps {
  name: string
  iconURL: string
  active: boolean
  amountLeft: number
  totalAmount: number
  selectedAmount?: number
  onChange(active: boolean, amount: number): void
}

