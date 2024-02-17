interface IPlaceholder {
  preview: string;
  size?: number;
  color?: string;
  textColor?: string;
}
type Props = IPlaceholder | string; 
export const placeholderImage = (infos: Props) => {
  if (typeof infos === 'string') {
    const size = 300;
    const color = '16AC7E';
    const textColor = 'ffffff'; 
 
    return `https://placehold.co/${size}x/${color}/${textColor}.svg?text=${infos}&font=Lato`;
  } else {
    const { preview, size=300, color="16AC7E", textColor="ffffff" } = infos;
    return `https://placehold.co/${size}x/${color}/${textColor}.svg?text=${preview}&font=Lato`;
  }
};
