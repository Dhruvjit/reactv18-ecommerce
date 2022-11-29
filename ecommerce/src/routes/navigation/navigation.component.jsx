import { Fragment } from 'react';
import {Link, Outlet} from 'react-router-dom';
import { ReactComponent as SiteLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      /* Fragment hides the wrapping div from the dom when page renders */
      <Fragment>
        <div className='navigation'>
          
          {/* link to navigate to home */}
          <Link className='logo-container' to='/'>
            <SiteLogo className='logo'/>
          </Link>
          
          {/*  */}
          <div className="nav-links-container">
            <Link className='nav-link' to='/shop'>
              SHOP
            </Link>
          </div>

        </div>
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;