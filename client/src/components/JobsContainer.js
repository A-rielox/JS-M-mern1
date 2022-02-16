import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';
import styled from 'styled-components';

const JobsContainer = () => {
   const {
      getJobs,
      jobs,
      isLoading,
      page,
      totalJobs,
      search,
      searchStatus,
      searchType,
      sort,
      numOfPages,
   } = useAppContext();

   useEffect(() => {
      getJobs();
   }, [search, searchStatus, searchType, sort, page]);

   if (isLoading) {
      return <Loading center />;
   }
   if (jobs.length === 0) {
      return (
         <Wrapper>
            <h2>No jobs to display...</h2>
         </Wrapper>
      );
   }

   return (
      <Wrapper>
         <h5>
            {totalJobs} job{jobs.length > 1 && 's'} found
         </h5>

         <div className="jobs">
            {jobs.map(job => {
               return <Job key={job._id} {...job} />;
            })}
         </div>
         {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
   );
};

export default JobsContainer;

const Wrapper = styled.section`
   margin-top: 4rem;
   h2 {
      text-transform: none;
   }
   & > h5 {
      font-weight: 700;
   }
   .jobs {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem;
   }
   @media (min-width: 992px) {
      .jobs {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 1rem;
      }
   }
`;
