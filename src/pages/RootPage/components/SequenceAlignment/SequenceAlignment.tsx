import React from 'react'
import { Box, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { getAminoAcidColor } from '../../../../types/aminoAcids'
import type { AminoAcid } from '../../../../types/aminoAcids'
import { SequenceContainer } from './SequenceAlignment.styles'

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
    console.log(text.replaceAll('/n', ''))
    toast.success('Последовательность скопирована', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    })
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
              const selection = window
                .getSelection()
                ?.toString()
                .replace(/\s+/g, '')
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
              const selection = window
                .getSelection()
                ?.toString()
                .replace(/\s+/g, '')
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
