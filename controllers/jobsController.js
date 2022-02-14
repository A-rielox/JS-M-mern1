import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
   const { position, company } = req.body;

   if (!position || !company) {
      throw new BadRequestError('Please provide all values');
   }

   req.body.createdBy = req.user.userId;

   const job = await Job.create(req.body);

   res.status(StatusCodes.CREATED).json({ job });

   // el req.user se crea en authenticateUser from './middleware/auth.js'
};

const deleteJob = async (req, res) => {
   res.send('delete jobbbb');
};

const getAllJobs = async (req, res) => {
   res.send('get all jobbbbbs');
};

const updateJob = async (req, res) => {
   res.send('update jobbbbb');
};

const showStats = async (req, res) => {
   res.send('show statssssss');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
