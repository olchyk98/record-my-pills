import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
  pillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '50px',
  },
  submitButton: {
    height: '50px',
    width: '300px',
    textAlign: 'center',
    background: '#85479B',
    border: 'none',
    padding: 0,
    margin: 0,
    borderRadius: '15px',
    color: 'white',
    fontWeight: 'lighter',
    cursor: 'pointer',
    fontFamily: 'Gotham',
    marginTop: '40px',
  },
})
