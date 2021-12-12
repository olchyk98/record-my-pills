import { isNil } from 'ramda'
import { useEffect, useRef } from 'react'
import { AlignmentView } from '../AlignmentView'
import { useStyles } from './Pill.styles'
import { PillProps } from './types'

const parseInputValue = (input: HTMLInputElement | null): number => (
  parseFloat(input?.value || '0')
)

export const Pill = (props: PillProps) => {
  const {
    iconURL,
    name,
    onChange,
    selectedAmount,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = useStyles(props)

  useEffect(() => {
    if(isNil(selectedAmount)) {
      const input = inputRef.current
      if(input) input.value = ''
    }
  }, [ selectedAmount ])

  return (
    <AlignmentView
      type="column"
      y="center"
      gap={ 40 }
      className={ styles.container }
    >
      <span>
        <img className={ styles.icon } alt="pill" src={ iconURL } />
      </span>
      <span className={ styles.name }>{ name }</span>
      <input
        ref={ inputRef }
        onChange={ ({ target }) => {
          onChange(parseInputValue(target))
        } }
        type="number"
        placeholder="Number of Pills"
        className={ styles.amountInput }
      />
    </AlignmentView>
  )
}
