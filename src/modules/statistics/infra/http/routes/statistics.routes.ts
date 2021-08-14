import { Router } from 'express';

import ModulesCountController from '../controllers/ModulesCountController';

const statisticsRouter = Router();
const modulesCountController = new ModulesCountController();

// GET: baseURL/statistics/modules/count
/**
 * List Modules count.
 */
statisticsRouter.get('/modules/count', modulesCountController.index);

export default statisticsRouter;
