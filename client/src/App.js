import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import {
   SharedLayout,
   Stats,
   AllJobs,
   AddJob,
   Profile,
} from './pages/dashboard';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedRoute>
                     <SharedLayout />
                  </ProtectedRoute>
               }
            >
               <Route index element={<Stats />} />
               <Route path="all-jobs" element={<AllJobs />} />
               <Route path="add-job" element={<AddJob />} />
               <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

// el index en
// <Route index element={<Stats />} />
// es para q agarre esta al cargar el parent q es:
// <Route path="/"
