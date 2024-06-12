import { NextApiRequest, NextApiResponse } from 'next';
import { AIAdapter } from '../lib/ai/adapter/interface';
import { AiService } from '../lib/ai/service';

export class AIController {
  private aiService: AiService;

  constructor() {
    this.aiService = new AiService();
    
    this.verify = this.verify.bind(this);
    this.suggest = this.suggest.bind(this);
    this.gramaticalImprovement = this.gramaticalImprovement.bind(this);
  }
  public async verify(req: NextApiRequest, res: NextApiResponse) {
    try {
      const message = req.query.message as string;
      const response = await this.aiService.verifyMessage(message);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  public async suggest(req: NextApiRequest, res: NextApiResponse) {
    let tries = 3;
    const makeRequest = async (): Promise<{
      name: string;
      synopsis: string;
      categories: string[];
    }> => {
      try {
        const name = req.query.name as string;
        const synopsis = req.query.synopsis as string;
        const categories = req.query.categories as string[];
        const response = await this.aiService.suggest({
          name,
          synopsis,
          categories
        });
        return JSON.parse(response);
      } catch (error) {
        tries--;
        if (tries === 0) {
          throw error;
        }
        return await makeRequest();
      }
    };
    try {
      const response = await makeRequest();

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(400).json({ message: 'Error' });
    }
  }
  public async gramaticalImprovement(req: NextApiRequest, res: NextApiResponse) {
    try {
      const message = req.query.message as string;
      const response = await this.aiService.gramaticalImprovement(message);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
