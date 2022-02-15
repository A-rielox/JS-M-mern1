import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res) => {
   const { position, company } = req.body;

   if (!position || !company) {
      throw new BadRequestError('Please provide all values');
   }

   req.body.createdBy = req.user.userId;

   const job = await Job.create(req.body);

   res.status(StatusCodes.CREATED).json({ job });

   // el req.user se crea en authenticateUser from './middleware/auth.js' .
};

const deleteJob = async (req, res) => {
   res.send('delete jobbbb');
};

const getAllJobs = async (req, res) => {
   const jobs = await Job.find({ createdBy: req.user.userId });

   res.status(StatusCodes.OK).json({
      totalJobs: jobs.length,
      numOfPages: 1,
      jobs,
   });
};

const updateJob = async (req, res) => {
   const { id: jobId } = req.params;

   const { company, position } = req.body; // ya lo reviso en front pero xsi a caso
   if (!company || !position) {
      throw new BadRequestError('Please Provide All Values');
   }

   const job = await Job.findOne({ _id: jobId });
   if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
   }

   //check permissions
   checkPermissions(req.user, job.createdBy);

   const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
   });

   // 🔰
   // job.position = position;
   // job.company = company;
   // await job.save();
   // res.status(StatusCodes.OK).json({ job });

   // no necesito el job-updated en el front pero pa verlo en postman
   res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
   res.send('show statssssss');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };

//
// 🔰 la otra forma; con findOneAndUpdate NO tengo acceso a los hooks, como los "pre('save')", con esta forma SI
// lo malo es q tengo q ponerlas todas aca abajo para q se actualicen, si se manda una y no la pongo aca abajo entonces obviamente no se va a actualizar, y tengo q pasar algun tipo de valor para los q sean required
