import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import './Header.css';

import { connect } from 'react-redux';

import viewActions from '../../../actions/viewActions';
import { NavLink, useLocation } from 'react-router-dom';


const Header = (props) => {
    const [sideIsOpen, setSidebarIsOpen] = useState(false)
    const clickMenuIcon = () => {
        //setSidebarIsOpen(!sideIsOpen)

        //props.clickMenuIcon(!isOpen)
      
        props.toggleSidebar();
    }

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const _onClickAvatar = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    }

    const handleClickOutSideDropdown = () => {
        setDropdownIsOpen(false)
    }

    const location = useLocation();

    const pageNames = {
        '/': 'Home',
        'about': 'About Us',
        'contact': 'Contact',
        'dashboard': 'Dashboard',
        'MediaProject': 'Hậu kì',
        'ProductionRegistration': 'Tin bài phóng sự',
        'Detail': 'Chi tiết',
    }



    const pathSegments = location.pathname.split('/').filter(segment => segment);

    const pageDetails = {
        fullPath: pathSegments
            .map(segment => pageNames[segment] || segment)
            .join(' '),
        pageName: pageNames[pathSegments[pathSegments.length - 1]]  , // Last segment of the path
    };


    return (
        <nav className='header'>
            <div className='row-1'>
                <div className='nav-left'>
                    <MdMenu className='menu-icon' onClick={clickMenuIcon} />
                    <NavLink to="/" className="logo-link">
                        <img src="../../images/logo-ktv.png" alt="Logo" className="logo-image" />
                    </NavLink>
                </div>
                <div className='nav-right'>
                    <div className='header-avatar' onClick={_onClickAvatar}>
                        <img src="../../images/avatar.png"/>
                    </div>
                    {   
                        dropdownIsOpen && <Dropdown setDropdownClose={handleClickOutSideDropdown}/>
                    }
                </div>
            </div>
            <div className='row-2'>
                <h1 className="page-title">{pageDetails.pageName}</h1>
                <h1 className="page-path">|</h1>
                <h1 className="page-path">{pageDetails.fullPath}</h1>
            </div>
        </nav>
    )
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleSidebar: () => {
            dispatch(viewActions.toggleSidebar())
        }
    }
}

//export default Header;

export default connect(null, mapDispatchToProps)(Header);