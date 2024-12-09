import { MdMenu } from 'react-icons/md';
import { useState } from 'react';


import './Header.css';

import { connect } from 'react-redux';

import viewActions from '../../../actions/viewActions';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Dropdown from 'rsuite/Dropdown';
import 'rsuite/Dropdown/styles/index.css';
import Avatar from 'rsuite/Avatar';
import 'rsuite/Avatar/styles/index.css';
const Header = (props) => {

    const userFullname = localStorage.getItem("name")
    const userEmail = localStorage.getItem("email")
    const userAvatar = localStorage.getItem("avatarUrl")

    const [sideIsOpen, setSidebarIsOpen] = useState(false)
    const clickMenuIcon = () => {
        //setSidebarIsOpen(!sideIsOpen)

        //props.clickMenuIcon(!isOpen)
      
        props.toggleSidebar();
    }
    const navigate = useNavigate();

    const renderToggle = props => (
        <Avatar circle {...props} src={userAvatar} alt={userFullname[0].toUpperCase()}/>
      );

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



    const pathSegments = location.pathname.split('/').map(segment => pageNames[segment]).filter(item => item && item !== "" && item?.trim() !== "");

    const pageDetails = {
        fullPath: pathSegments
            .join(' - '),
        pageName: pathSegments[pathSegments.length - 1]  , // Last segment of the path
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
                    <Dropdown renderToggle={renderToggle} placement="bottomEnd">
                        <Dropdown.Item panel style={{ padding: 16}}>
                          <strong>{userFullname}</strong>
                          <p>{userEmail}</p>
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item>Thông tin cá nhân</Dropdown.Item>
                        <Dropdown.Item
                            onSelect={() => {
                                localStorage.clear();
                                navigate("/sign-in")
                            }}
                        >
                          Đăng xuất
                        </Dropdown.Item>
                    </Dropdown>
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