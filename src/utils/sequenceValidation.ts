import type { AminoAcid } from '../types/aminoAcids';

const VALID_AMINO_ACIDS: AminoAcid[] = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', '-'];

export const isValidAminoAcid = (char: string): char is AminoAcid => {
  return VALID_AMINO_ACIDS.includes(char as AminoAcid);
};

export const validateSequence = (sequence: string): { isValid: boolean; error?: string } => {
  if (!sequence) {
    return { isValid: false, error: 'Данное поле является обязательным' };
  }

  const invalidChars = sequence
    .split('')
    .filter(char => !isValidAminoAcid(char));

  if (invalidChars.length > 0) {
    return {
      isValid: false,
      error: `Некорректные символы: ${invalidChars.join(', ')}. Можно вводить только латинские буквы (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и '-'.`
    };
  }

  return { isValid: true };
};

export const validateSequences = (seq1: string, seq2: string): { isValid: boolean; error?: string } => {
  const validation1 = validateSequence(seq1);
  if (!validation1.isValid) {
    return validation1;
  }

  const validation2 = validateSequence(seq2);
  if (!validation2.isValid) {
    return validation2;
  }

  if (seq1.length !== seq2.length) {
    return {
      isValid: false,
      error: 'Последовательности должны быть одинаковой длины'
    };
  }

  return { isValid: true };
}; 