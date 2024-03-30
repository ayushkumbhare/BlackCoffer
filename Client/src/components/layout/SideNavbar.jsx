import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/home.scss';


const SideNavbar = () => {

    return (
        <div className="navbar">
            <div className="navbar-leftside">
                <div className="logo">
                    <NavLink
                        to="/"
                    >
                        BlackCoffer
                    </NavLink>
                </div>
            </div>

            <div className="navbar-rightside">
            <div className='icons'>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? '#294f70' : '',
                            color: isActive ? 'white' : ''
                        })}
                    >
                        home
                    </NavLink>
                </div>
                <div className="icons">
                    <NavLink
                        to="/about"
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#294f70' : '',
                                color: isActive ? 'white' : ''
                            };
                        }}
                    >
                        About
                    </NavLink>
                </div>
                <div className="icons">
                    <NavLink
                        to='/search'
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#294f70' : '',
                                color: isActive ? 'white' : ''
                            };
                        }}
                    >
                        Search
                    </NavLink>
                </div>
                <div className="icons">
                    <NavLink
                        to={'/home'}
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#294f70' : '',
                                color: isActive ? 'white' : ''
                            };
                        }}
                    >
                        ---
                    </NavLink>
                </div>

                <div className="icons logout" onClick={() => handleLogout()}>
                    {/* <NavLink
                        to={'/user/login'}
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#294f70' : ''
                            };
                        }}
                    >
                        <img src={signout} alt="logout" />
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
