import t from 'tcomb';

export const tMessage = t.refinement(t.String,
  s => s.length > 0, 'tMessage');

export const tSha256String = t.refinement(t.String,
  s => s.length === 64, 'tSha256String');
