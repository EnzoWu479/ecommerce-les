export const getFirstLetterOfPhase = (phrase: string) => {
  return phrase.split(' ').map((word) => word[0]).join('');
}