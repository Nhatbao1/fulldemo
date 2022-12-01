import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { doLogout } from '../../redux/action/userAction';
import { postLogOut } from '../../service/apiServices';
import Language from './Language';
import Profile from './Profile';
import { useTranslation } from 'react-i18next';
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleRegister = () => {
    navigate('/register');
  }
  const [showProfile, setShowProfile] = useState(false)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const usernameAccount = useSelector(state => state.user.account.username);
  const refresh_token = useSelector(state => state.user.account.refresh_token);
  const email = useSelector(state => state.user.account.email);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const handleClickLogOut = async () => {
    let res = await postLogOut(email, refresh_token);
    if (res && res.EC === 0) {
      navigate('/login');
      dispatch(doLogout(res));
    }
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink to='/' className="navbar-brand">Demo</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='nav-link home' to="/" >  {t('header.home')} </NavLink>
              <NavLink className='nav-link user' to="/users"> {t('header.user')}</NavLink>
              <NavLink className='nav-link admin' to="/admin"> {t('header.admin')}</NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>   <button className='btn-login login' onClick={() => { handleLogin() }}>{t('header.login')}</button>
                  <button className='btn-signup signup' onClickCapture={() => { handleRegister() }}>{t('header.signup')}</button>
                </>
                :
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setShowProfile(true)} className="profile">{t('header.profile')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleClickLogOut()} className="logout">{t('header.logout')}</NavDropdown.Item>
                </NavDropdown>
              }
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showProfile} setShow={setShowProfile} />
    </>
  );
}

export default Header;