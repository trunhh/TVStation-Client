import { NavLink, Outlet } from "react-router-dom"
import styled from 'styled-components'

const GroupLink = styled.div `
    .menu-item {
        -webkit-display: flex;
        display: flex;
        padding: 20px 18px;
        color: #fff;
        text-decoration: none;
        font-size: .75rem;
        -webkit-align-items: center;
        align-items: center
    }

    .menu-item:hover {
        color: orange;
    }

    .menu-item.active {
        color: #39f !important;
    }

    .menu-item span {
        margin-left: 30px
    }

    .menu-item i {
        font-size: .85rem;
    }
`

const CustomLinks2 = (props) => {

    // console.log('props with router: ')

    // console.log(props)
    
    return (
        <GroupLink>
            {
                props.menuLinks.map((item, index) => 
                    <NavLink key={index} to={item.link} className={({ isAcitve }) => isAcitve ? 'menu-item active' : 'menu-item'}>
                        <i className={item.icon}></i>
                        <span>{item.text}</span>
                    </NavLink>
                )
            }
        </GroupLink>
    )
}

export default CustomLinks2;