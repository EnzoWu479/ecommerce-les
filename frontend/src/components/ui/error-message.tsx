interface Props {
  error?: string;
}

export const ErrorMessage = ({ error }: Props) => {
  if (!error) return null;
  return <span className="text-sm text-red-600">{error}</span>;
};
