export type AminoAcid = 'A' | 'R' | 'N' | 'D' | 'C' | 'E' | 'Q' | 'G' | 'H' | 'I' | 'L' | 'K' | 'M' | 'F' | 'P' | 'S' | 'T' | 'W' | 'Y' | 'V' | '-';

export type AminoAcidGroup = {
  color: string;
  acids: AminoAcid[];
  description: string;
};

export const AMINO_ACID_GROUPS: AminoAcidGroup[] = [
  {
    color: '#FFEA00',
    acids: ['C'],
    description: 'Cysteine — C'
  },
  {
    color: '#67E4A6',
    acids: ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V', 'P'],
    description: 'Hydrophobic — A, I, L, M, F, W, Y, V, P'
  },
  {
    color: '#C4C4C4',
    acids: ['G'],
    description: 'Glycine — G'
  },
  {
    color: '#FC9CAC',
    acids: ['D', 'E'],
    description: 'Negatively charged — D, E'
  },
  {
    color: '#BB99FF',
    acids: ['K', 'R'],
    description: 'Positively charged — K, R'
  },
  {
    color: '#80BFFF',
    acids: ['S', 'T', 'H', 'Q', 'N'],
    description: 'Polar uncharged — S, T, H, Q, N'
  }
];

export const getAminoAcidColor = (acid: AminoAcid): string => {
  const group = AMINO_ACID_GROUPS.find(g => g.acids.includes(acid));
  return group?.color || '#FFFFFF';
}; 