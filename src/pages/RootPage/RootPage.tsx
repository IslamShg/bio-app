import { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SequenceAlignment } from './components/SequenceAlignment'
import { SequenceForm } from './components/SequenceForm'
import { RootContainer } from './RootPage.styles'

export const RootPage = () => {
  const [sequences, setSequences] = useState<{
    sequence1: string
    sequence2: string
  } | null>(null)

  const handleSubmit = (sequences: {
    sequence1: string
    sequence2: string
  }) => {
    setSequences(sequences)
  }

  return (
    <RootContainer>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          '@media (max-width: 400px)': {
            fontSize: '20px'
          }
        }}
      >
        Выравнивание аминокислотных последовательностей
      </Typography>

      <SequenceForm onSubmit={handleSubmit} />

      {sequences && (
        <Box sx={{ width: '100%' }}>
          <SequenceAlignment
            sequence1={sequences.sequence1}
            sequence2={sequences.sequence2}
          />
        </Box>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </RootContainer>
  )
}
