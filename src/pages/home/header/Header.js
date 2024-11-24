import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import './Header.css';

import { connect } from 'react-redux';

import viewActions from '../../../actions/viewActions';

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
    return (
        <div className='header'>
            <div className='row-1'>
                <div className='nav-left'>
                    <MdMenu className='menu-icon' onClick={clickMenuIcon} />
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
                
            </div>
        </div>
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