import express from 'express';
const router = express.Router();

import {
   createJob,
   deleteJob,
   getAllJobs,
   updateJob,
   showStats,
} from '../controllers/jobsController.js';

// '/api/v1/jobs'
router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats); // place before :id

router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
