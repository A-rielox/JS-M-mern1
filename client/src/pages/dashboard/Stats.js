import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
   const { showStats, isLoading, monthlyApplications } = useAppContext();

   // fetcheo los stats y los meto en el state gral
   useEffect(() => {
      showStats();
   }, []);

   if (isLoading) {
      return <Loading center />;
   }

   return (
      <>
         <StatsContainer />
         {monthlyApplications.length > 0 && <ChartsContainer />}
      </>
   );
};

export default Stats;
