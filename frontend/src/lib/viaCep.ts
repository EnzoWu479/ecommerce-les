import axios from 'axios';

export interface IViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const viaCep = async (zipcode: string) => {
  const cep = zipcode.replace(/\D/g, '');
  const { data } = await axios.get<IViaCepResponse>(
    `https://viacep.com.br/ws/${cep}/json/`
  );
  return data;
};
