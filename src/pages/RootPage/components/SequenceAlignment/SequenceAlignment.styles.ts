import { Box, styled } from '@mui/material'

export const SequenceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 30,
  gap: theme.spacing(1),
  fontFamily: 'monospace',
  fontSize: '1.2rem',
  lineHeight: 1.5,
  wordBreak: 'break-all',
  userSelect: 'text',
  padding: '0 16px',
  '& .sequence-row': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px'
  },
  '& .amino-acid': {
    display: 'inline-block',
    padding: '2px 4px',
    borderRadius: '2px',
    minWidth: '1.2em',
    textAlign: 'center',
    [theme.breakpoints.down(450)]: {
      fontSize: '12px'
    },
    [theme.breakpoints.down(410)]: {
      fontSize: '10px'
    },
    [theme.breakpoints.down(375)]: {
      fontSize: '8px'
    },
    [theme.breakpoints.down(345)]: {
      fontSize: '6px'
    }
  },
  [theme.breakpoints.down(450)]: {
    padding: '0 12px'
  }
}))
