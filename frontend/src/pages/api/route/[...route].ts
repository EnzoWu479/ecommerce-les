import { NextApiRequest, NextApiResponse } from "next";

const ApiRouteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const routeData = req.query.route as string[];
  const pathName = `/${routeData.join('/')}`;

  
};
 
export default ApiRouteHandler;