import { Link } from 'react-router-dom';
import image from '../assets/images/not-found.svg';
import styled from 'styled-components';

const Error = () => {
   return (
      <Wrapper className="full-page">
         <div>
            <img src={image} alt="not found" />
            <h3>Ohh!! page not found</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to="/">Back to home</Link>
         </div>
      </Wrapper>
   );
};

export default Error;

const Wrapper = styled.main`
   text-align: center;
   img {
      max-width: 600px;
      display: block;
      margin-bottom: 2rem;
   }
   display: flex;
   align-items: center;
   justify-content: center;
   h3 {
      margin-bottom: 0.5rem;
   }
   p {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: var(--grey-500);
   }
   a {
      color: var(--primary-500);
      text-decoration: underline;
      text-transform: capitalize;
   }
`;
