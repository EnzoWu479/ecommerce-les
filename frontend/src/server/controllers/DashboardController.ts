import { NextApiRequest, NextApiResponse } from 'next';
import { DashboardRepository } from '../repositories/DashboardRepository';
import {
  DashboardRequest,
  DashboardWithoutCategoryGroups
} from '@/types/dashboard';

export class DashboardController {
  dashboardRepository: DashboardRepository;

  constructor() {
    this.dashboardRepository = new DashboardRepository();
    this.getDashboardChart = this.getDashboardChart.bind(this);
    this.getDashboardInfos = this.getDashboardInfos.bind(this);
  }

  async getDashboardChart(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log(req.query);
      console.log(req.query);
      const categoryGroups = req.query['categoryGroups[]'];

      const request: DashboardRequest = {
        start: req.query.start as string,
        end: req.query.end as string,
        categoryGroups:
          typeof categoryGroups === 'string'
            ? [categoryGroups.split(',')]
            : (categoryGroups as string[])?.map(group => group.split(','))
      };
      const data = await this.dashboardRepository.getChart(request);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getDashboardInfos(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log(req.query);
      console.log(req.query);

      const request: DashboardWithoutCategoryGroups = {
        start: req.query.start as string,
        end: req.query.end as string
      };
      const data = await this.dashboardRepository.getInfos(request);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
