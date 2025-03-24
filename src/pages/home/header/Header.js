import { MdMenu } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { menuLinks } from '../../../data/data';
import { USER_INFO, SIGN_IN } from '../../../constants/routeConstants';
import Dropdown from 'rsuite/Dropdown';
import Avatar from 'rsuite/Avatar';
import 'rsuite/Dropdown/styles/index.css';
import 'rsuite/Avatar/styles/index.css';


const userFullname = localStorage.getItem("name") || " ";
const userEmail = localStorage.getItem("email") || " ";
const userAvatar = localStorage.getItem("avatarUrl") || " ";

const pageNames = {
    '/': 'Home',
    'about': 'About Us',
    'contact': 'Contact',
    'dashboard': 'Dashboard',
    'MediaProject': 'Hậu kì',
    'ProductionRegistration': 'Tin bài phóng sự',
    'ScriptProgram': 'Kịch bản tác phẩm',
    'ProgramFrameYear': 'Khung năm',
    'ProgramFrameWeek': 'Khung tuần',
    'ProgramFrameBroadcast': 'Lịch phát s',
    'Detail': 'Chi tiết',
};

const Header = (props) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setExpanded(false);
      }, [location.pathname]);

    const pathSegments = location.pathname.split('/').map(segment => pageNames[segment]).filter(item => item && item !== "" && item?.trim() !== "");

    const pageDetails = {
        fullPath: pathSegments.join(' - '),
        pageName: pathSegments[pathSegments.length - 1],
    };

    const renderToggle = props => (
        <Avatar circle {...props} src={userAvatar} alt={userFullname[0].toUpperCase()} />
    );

    return (
    <Navbar sticky="top" expand="lg" variant="dark" className="d-flex flex-column bg-primary bg-gradient shadow-lg" expanded={expanded}>
      <Container>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        >
            <MdMenu />
          {/* {expanded ? <FaTimes /> : <FaBars />} */}
        </Navbar.Toggle>
        <img src="../../images/logo-haiphong.svg" alt="Logo" className="img-fluid " style={{maxWidth: "128px"}} />
        <Navbar.Collapse id="navbar-nav">
        <Nav className="fw-bold text-uppercase ">
            {menuLinks.map(({ text, link, subMenu }) => (
                subMenu ? (
                    // If there are submenus, use NavDropdown
                    <NavDropdown title={text} id="navbarScrollingDropdown"  key={text}>
                        {subMenu.map(({ text, link }) => (
                            <NavDropdown.Item as={NavLink} to={link} key={link}>
                                {text}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                ) : (
                    // If no submenus, just a regular Nav.Link
                    <Nav.Link 
                        as={NavLink} 
                        to={link} 
                        end 
                        key={link}
                        className="px-3"
                    >
                        {text}
                    </Nav.Link>
                )
            ))}
        </Nav>
        </Navbar.Collapse>
        <Dropdown renderToggle={renderToggle} placement="bottomEnd">
          <Dropdown.Item panel style={{ padding: "1rem" }}>
              <strong>{userFullname}</strong>
              <p>{userEmail}</p>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onSelect={() => navigate(USER_INFO)}>
              Thông tin cá nhân
          </Dropdown.Item>
          <Dropdown.Item
              onSelect={() => {
                  localStorage.clear();
                  navigate(SIGN_IN);
              }}
          >
              Đăng xuất
          </Dropdown.Item>
        </Dropdown>
      </Container>
        {/* <div className="row-2">
                <h1 className="page-title">{pageDetails.pageName}</h1>
                <h1 className="page-path">|</h1>
                <h1 className="page-path">{pageDetails.fullPath}</h1>
        </div> */}
    </Navbar>
    );
};

export default Header;
