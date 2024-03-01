import * as yup from 'yup'

export const clientSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  cpf: yup.string().required("CPF é obrigatório"),
  birth: yup.date().required("Data de nascimento é obrigatória"),
});

export type ClientDTO = yup.InferType<typeof clientSchema>;