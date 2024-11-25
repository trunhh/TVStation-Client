import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react'; // Import useState for managing the toggle state
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Arrow icons

const GroupLink = styled.div`
    .menu-item {
        display: flex;
        padding: 16px 32px 0px 24px;
        color: #8E8FA1;
        text-decoration: none;
        align-items: center;
        cursor: pointer;
    }

    .menu-item:hover {
        color: white;
    }

    .menu-item.active {
        color: #39f !important;
    }

    .menu-item span {
        margin-left: 30px;
    }

    .menu-item i {
        font-size: .85rem;
    }

    .submenu {
        list-style: none;
        padding: 0px 0px 0px 16px;
        display: none; /* Initially hidden */
    }

    .submenu.show {
        display: block; /* Show submenu when it has 'show' class */
    }

    .submenu-item {
    }

    .submenu-item a {
        color: #8E8FA1;
        text-decoration: none;
    }

    .submenu-item a:hover {
        color: white;
    }

    .arrow {
        margin-left: auto;
        transition: transform 0.3s ease;
    }

    .arrow.up {
        transform: rotate(180deg);
    }
`;

const CustomLinks2 = ({ menuLinks }) => {
    // State to manage which menu items have open submenus
    const [activeSubMenu, setActiveSubMenu] = useState({});

    // Toggle submenu visibility
    const toggleSubMenu = (index) => {
        setActiveSubMenu(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <GroupLink>
            {menuLinks.map((item, index) => (
                <div key={index}>
                    {/* If submenu exists, make parent item non-navigable */}
                    {item.subMenu ? (
                        // Parent link for items with submenus, no navigation
                        <div
                            className="menu-item"
                            onClick={() => toggleSubMenu(index)} // Toggle the submenu on click
                        >
                            <i className={item.icon}></i>
                            <span>{item.text}</span>
                            {/* Arrow for collapse/expand */}
                            <FaChevronDown className={`arrow ${activeSubMenu[index] ? 'up' : ''}`} />
                        </div>
                    ) : (
                        // Simple link for items without a submenu
                        <NavLink
                            to={item.link}
                            className={({ isActive }) =>
                                isActive ? 'menu-item active' : 'menu-item'
                            }
                        >
                            <i className={item.icon}></i>
                            <span>{item.text}</span>
                        </NavLink>
                    )}

                    {/* Submenu (if exists) */}
                    {item.subMenu && (
                        <ul className={`submenu ${activeSubMenu[index] ? 'show' : ''}`}>
                            {item.subMenu.map((subItem, subIndex) => (
                                <li key={subIndex} className="submenu-item">
                                    <NavLink
                                        to={subItem.link}
                                        className={({ isActive }) =>
                                            isActive ? 'menu-item active' : 'menu-item'
                                        }
                                    >
                                        <i className={subItem.icon}></i>
                                        <span>{subItem.text}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </GroupLink>
    );
};

export default CustomLinks2;
