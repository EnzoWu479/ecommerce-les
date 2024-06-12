interface Props {
  description: string;
}
export const badWordsPrompt = ({ description }: Props) =>
  `Analise a seguinte mensagem: "${description}" e responda com somente "true" ou "false" para indicar se a mensagem ou o contexto contém palavras ofensivas.`;
