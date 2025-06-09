import { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SequenceAlignment } from '../../components/SequenceAlignment'
import { SequenceForm } from '../../components/SequenceForm'
import { RootContainer } from './RootPage.styles'

export const RootPage = () => {
  const [sequences, setSequences] = useState<{
    sequence1: string
    sequence2: string
  } | null>(null)

  const handleSubmit = (data: { sequence1: string; sequence2: string }) => {
    console.log(data)
    setSequences(data)
  }

  return (
    <RootContainer>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Выравнивание аминокислотных последовательностей
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        color="text.secondary"
      >
        Введите два аминокислотных последовательностей для визуализации
        выравнивания.
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
