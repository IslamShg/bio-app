import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Alert } from '@mui/material'
import { validateSequences } from '../utils/sequenceValidation'

interface FormData {
  sequence1: string
  sequence2: string
}

interface SequenceFormProps {
  onSubmit: (data: FormData) => void
}

export const SequenceForm: React.FC<SequenceFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>()

  const sequence1 = watch('sequence1')
  const sequence2 = watch('sequence2')

  const validateSequencesOnSubmit = (data: FormData) => {
    const validation = validateSequences(data.sequence1, data.sequence2)
    if (!validation.isValid) {
      return Promise.reject(validation.error)
    }
    onSubmit(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(validateSequencesOnSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        padding: 2
      }}
    >
      <TextField
        label="Первая последовательность"
        variant="outlined"
        fullWidth
        {...register('sequence1', {
          required: 'Это поле обязательно для заполнения',
          pattern: {
            value: /^[A-Z-]+$/,
            message:
              'Это поле может содержать только латинские буквы аминокислот'
          }
        })}
        error={!!errors.sequence1}
        helperText={errors.sequence1?.message}
      />

      <TextField
        label="Вторая последовательность"
        variant="outlined"
        fullWidth
        {...register('sequence2', {
          required: 'Это поле обязательно для заполнения',
          pattern: {
            value: /^[A-Z-]+$/,
            message:
              'Это поле может содержать только латинские буквы аминокислот'
          }
        })}
        error={!!errors.sequence2}
        helperText={errors.sequence2?.message}
      />

      {sequence1 && sequence2 && sequence1.length !== sequence2.length && (
        <Alert severity="error">Последовательности аминокислот должны быть одинаковой длины</Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={
          !sequence1 || !sequence2 || sequence1.length !== sequence2.length
        }
      >
        Визуализировать выравнивание.
      </Button>
    </Box>
  )
}
