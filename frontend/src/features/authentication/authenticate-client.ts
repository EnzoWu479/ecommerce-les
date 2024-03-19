import axios from "axios";

export const authenticateClient = async (
  email: string,
  password: string
): Promise<boolean> => {
  const {data} = await axios.post("/api/authenticate-client", {});
  return true;
};
