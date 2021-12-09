import { makeStyles } from '@material-ui/styles'
import { Dictionary } from 'ramda'
import { PillProps } from './types'

export const useStyles = makeStyles<Dictionary<string>, PillProps>({
  container: {
    borderRadius: '15px',
    cursor: 'pointer',
    padding: '20px',
    position: 'relative',
    transition: '100ms',
    boxShadow: '5px 5px 10px -5px rgba(0, 0, 0, .2)',
    border: ({ active }) => `3px solid ${ (active) ? 'black' : 'transparent' }`,

    '&:hover': {
      borderColor: ({ active }) => (active) ? 'gold' : 'black',
    },
  },
  icon: {
    height: '100px',
  },
  name: {
    textAlign: 'center',
    width: '100%',
    userSelect: 'none',
    height: '10px',
  },
  amountInput: {
    border: 'none',
    textAlign: 'center',
    height: '30px',
    borderRadius: '45px',
    margin: 0,
    '-moz-appearance': 'textfield',
    '-webkit-appearance': 'none',
  },
})
