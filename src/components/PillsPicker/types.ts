export interface PillProps {
  name: string
  iconURL: string
  amountLeft: number
  totalAmount: number
  selectedAmount?: number
  onChange(amount: number): void
}

