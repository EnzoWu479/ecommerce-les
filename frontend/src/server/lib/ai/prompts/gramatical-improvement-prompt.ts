interface Props {
  description: string;
}
export const gramaticalImprovementPrompt = ({ description }: Props) => `
  Analise a seguinte mensagem: '${description}' e encontre possíveis erros gramaticais, de ortografia ou de concordância verbal. Responda somente com a correção da mensagem sem nenhum adicional. Caso a mensagem não faça sentido, retorne "A mensagem não tem sentido". Caso não tenha erros, retorne a mensagem original. Certifique-se de que a mensagem corrigida esteja de acordo com as regras gramaticais da língua portuguesa. Tenha total certeza de que a mensagem corrigida está correta, pois a correção será avaliada.`;
