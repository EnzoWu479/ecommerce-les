import {z} from "zod";

export const accountSchema = z.object({
    email: z.string().min(1,"Email é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória")
});