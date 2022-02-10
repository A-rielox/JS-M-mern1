import { Link } from 'react-router-dom';
import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
   return (
      <Wrapper>
         <nav>
            <Logo />
         </nav>

         <div className="container page">
            <div className="info">
               <h1>
                  job <span>tracking</span> app
               </h1>
               <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas dolor fugit earum, laudantium numquam quisquam
                  molestias, quidem natus quibusdam dolores molestiae maiores
                  vitae amet veritatis magnam assumenda sit, eaque fugiat?
               </p>

               <Link to="/register" className="btn btn-hero">
                  Login / Register
               </Link>
            </div>

            <img src={main} alt="job hunting" className="img main-img" />
         </div>
      </Wrapper>
   );
};

export default Landing;
