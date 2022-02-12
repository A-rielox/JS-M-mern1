import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Logo, FormRow, Alert } from '../components';
import styled from 'styled-components';

const initialState = {
   name: '',
   email: '',
   password: '',
   isMember: true,
};

const Register = () => {
   const { isLoading, showAlert, displayAlert, registerUser, user } =
      useAppContext();
   const [values, setValues] = useState(initialState);
   const navigate = useNavigate();

   const toggleMember = () => {
      setValues({ ...values, isMember: !values.isMember });
   };

   const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;

      setValues(prevState => {
         return { ...prevState, [name]: value };
      });
   };

   const onSubmit = e => {
      e.preventDefault();
      const { name, email, password, isMember } = values;

      if (!email || !password || (!isMember && !name)) {
         displayAlert();
         return;
      }

      const currentUser = { name, email, password };
      console.log(values);

      if (isMember) {
         console.log('already a member');
      } else {
         registerUser(currentUser);
      }
   };

   console.log(values);

   useEffect(() => {
      if (user) {
         setTimeout(() => {
            navigate('/');
         }, 3000);
      }
   }, [user, navigate]);

   return (
      <Wrapper className="full-page">
         <form className="form" onSubmit={onSubmit}>
            <Logo />
            <h3>{values.isMember ? 'login' : 'register'}</h3>
            {showAlert && <Alert />}

            {/* NOMBRE */}
            {!values.isMember && (
               <FormRow
                  type="text"
                  name="name"
                  value={values.name}
                  handleChange={handleChange}
               />
            )}

            {/* EMAIL */}
            <FormRow
               type="email"
               name="email"
               value={values.email}
               handleChange={handleChange}
            />

            {/* PASSWORD */}
            <FormRow
               type="password"
               name="password"
               value={values.password}
               handleChange={handleChange}
            />

            <button
               className="btn btn-block"
               type="submit"
               disabled={isLoading}
            >
               submit
            </button>

            <p>
               {values.isMember ? 'Not a member yet ? ' : 'Already a member?'}

               <button
                  type="button"
                  onClick={toggleMember}
                  className="member-btn"
               >
                  {values.isMember ? 'Register' : 'Login'}
               </button>
            </p>
         </form>
      </Wrapper>
   );
};

export default Register;

const Wrapper = styled.section`
   display: grid;
   align-items: center;
   .logo {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.38rem;
   }
   .form {
      max-width: 400px;
      border-top: 5px solid var(--primary-500);
   }

   h3 {
      text-align: center;
   }
   p {
      margin: 0;
      margin-top: 1rem;
      text-align: center;
   }
   .btn {
      margin-top: 1rem;
   }
   .member-btn {
      background: transparent;
      border: transparent;
      color: var(--primary-500);
      cursor: pointer;
      letter-spacing: var(--letterSpacing);
   }
`;
