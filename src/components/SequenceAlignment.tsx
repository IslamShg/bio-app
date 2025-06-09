import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { getAminoAcidColor } from '../types/aminoAcids'
import type { AminoAcid } from '../types/aminoAcids'

const SequenceContainer = styled(Box)(({ theme }) => ({
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

interface SequenceAlignmentProps {
  sequence1: string
  sequence2: string
}

export const SequenceAlignment: React.FC<SequenceAlignmentProps> = ({
  sequence1,
  sequence2
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <SequenceContainer>
      <Box className="sequence-row">
        {sequence1.split('').map((char, index) => (
          <Typography
            key={`seq1-${index}`}
            component="span"
            className="amino-acid"
            sx={{ backgroundColor: getAminoAcidColor(char as AminoAcid) }}
            onMouseUp={() => {
              const selection = window.getSelection()
              if (selection && selection.toString()) {
                handleCopy(selection.toString())
              }
            }}
          >
            {char}
          </Typography>
        ))}
      </Box>
      <Box className="sequence-row">
        {sequence2.split('').map((char, index) => (
          <Typography
            key={`seq2-${index}`}
            component="span"
            className="amino-acid"
            sx={{
              backgroundColor:
                char !== sequence1[index]
                  ? getAminoAcidColor(char as AminoAcid)
                  : ''
            }}
            onMouseUp={() => {
              const selection = window.getSelection()
              if (selection && selection.toString()) {
                handleCopy(selection.toString())
              }
            }}
          >
            {char}
          </Typography>
        ))}
      </Box>
    </SequenceContainer>
  )
}
