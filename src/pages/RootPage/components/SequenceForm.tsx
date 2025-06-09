import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Alert } from '@mui/material'
import { validateSequences } from '../../../utils/sequenceValidation'
import { useFocusInput } from '../common/hooks/useFocusInput'

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

  const { inputRef } = useFocusInput()

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
        padding: 2,
        '@media (max-width: 400px)': {
          padding: '8px'
        }
      }}
    >
      <TextField
        label="Первая последовательность"
        variant="outlined"
        fullWidth
        inputRef={inputRef}
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
        sx={{
          '@media (max-width: 400px)': {
            '& input': {
              fontSize: 14
            }
          }
        }}
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
        sx={{
          '@media (max-width: 400px)': {
            '& input': {
              fontSize: 14
            }
          }
        }}
      />

      {sequence1 && sequence2 && sequence1.length !== sequence2.length && (
        <Alert severity="error">
          Последовательности аминокислот должны быть одинаковой длины
        </Alert>
      )}

      <Button
        type="submit"
        sx={{
          fontSize: '1rem',
          padding: '12px 24px',
          '@media (max-width: 400px)': {
            fontSize: '0.8rem',
            padding: '8px 16px'
          }
        }}
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
