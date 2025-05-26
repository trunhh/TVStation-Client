import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Overlay, Popover, ListGroup } from "react-bootstrap";
import { menuLinks } from '../data/data';
import { USER_INFO, SIGN_IN } from '../constants/routeConstants';
import { THP_Logo } from '../components/Logo';

const Header = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const avatarRef = useRef(null);
    const navigate = useNavigate();
    
    const userName = localStorage.getItem("userName");
    const userFullname = localStorage.getItem("name") || "Nhân viên mới";
    const userEmail = localStorage.getItem("email") || "email@email.com";
    const userAvatar = localStorage.getItem("avatarUrl") || " ";

    return (
        <Navbar sticky="top" expand="lg" variant="dark" className="d-flex flex-column bg-primary bg-gradient shadow-lg" expanded={expanded}>
            <Container className="h-100 w-100">
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                >
                    <i className="bi bi-list"></i>
                </Navbar.Toggle>
                
                <THP_Logo size={2}/>
                
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="fw-bold text-uppercase me-auto">
                        {menuLinks.map(({ text, link, subMenu }) => (
                            subMenu ? (
                                <NavDropdown title={text} id={`dropdown-${link}`} key={text} >
                                    {subMenu.map(({ text: subText, link: subLink }) => (
                                        <NavDropdown.Item as={NavLink} to={subLink} key={subLink} onClick={(e) => e.stopPropagation()}>
                                            {subText}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={NavLink} to={link} end key={link} className="px-3">
                                    {text}
                                </Nav.Link>
                            )
                        ))}
                    </Nav>
                    
                    {/* Avatar with dropdown */}
                    <div className="d-flex align-items-center ms-auto position-relative">
                        <div
                            ref={avatarRef}
                            onClick={() => setShowPopover(!showPopover)}
                            className="d-flex align-items-center justify-content-center rounded-circle bg-light text-primary cursor-pointer"
                            style={{ width: '2rem', height: '2rem' }}
                        >
                            {userAvatar && userAvatar !== " " ? (
                                <img 
                                    src={userAvatar} 
                                    alt={userFullname} 
                                    className="w-100 h-100 rounded-circle object-fit-cover"
                                />
                            ) : (
                                <span>{userFullname.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        
                        <Overlay
                            show={showPopover}
                            target={avatarRef.current}
                            placement="bottom-end"
                            rootClose
                            onHide={() => setShowPopover(false)}
                        >
                            <Popover id="user-popover" className="shadow">
                                <Popover.Header className="bg-light">
                                    <div className="fw-bold">{userFullname}</div>
                                    <small className="text-muted">{userEmail}</small>
                                </Popover.Header>
                                <Popover.Body className="p-0">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item action as={NavLink} to={`${USER_INFO}/${userName}`} className="d-flex align-items-center py-2 px-3">
                                            <i className="bi bi-person me-2"/>
                                            Tài khoản
                                        </ListGroup.Item>
                                        <ListGroup.Item 
                                            action 
                                            onClick={() => {
                                                localStorage.clear()
                                                navigate(SIGN_IN)
                                            }}
                                            className="d-flex align-items-center py-2 px-3 text-danger"
                                        >
                                            <i className="bi bi-box-arrow-right me-2"/>
                                            Đăng xuất
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;