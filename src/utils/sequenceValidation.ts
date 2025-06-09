import type { AminoAcid } from '../types/aminoAcids';

const VALID_AMINO_ACIDS: AminoAcid[] = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', '-'];

export const isValidAminoAcid = (char: string): char is AminoAcid => {
  return VALID_AMINO_ACIDS.includes(char as AminoAcid);
};

export const validateSequence = (sequence: string): { isValid: boolean; error?: string } => {
  if (!sequence) {
    return { isValid: false, error: 'Sequence is required' };
  }

  const invalidChars = sequence
    .split('')
    .filter(char => !isValidAminoAcid(char));

  if (invalidChars.length > 0) {
    return {
      isValid: false,
      error: `Invalid characters found: ${invalidChars.join(', ')}. Only Latin letters (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) and '-' are allowed.`
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
      error: 'Sequences must have the same length'
    };
  }

  return { isValid: true };
}; 