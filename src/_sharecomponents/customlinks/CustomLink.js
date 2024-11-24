import classNames from 'classnames'
// import { withRouter, Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
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

const CustomLinks = (props) => {
    //console.log(props)
    const LinkItem = (item, index) => {
        let active = false
        if (props.location.pathname === item.link) {
            active = true
        }

        const _onClick = () => {
            //console.log(props.location.pathname)
        }
        
        return (
            <Link key={index} className={classNames('menu-item', {'active': active})} to={item.link} onClick={_onClick}>
                <i className={item.icon}></i>
                <span>{item.text}</span>
            </Link>
        )
    }

    return (
        <GroupLink>
            {
                props.menuLinks.map((item, index) => {
                    return LinkItem(item, index)
                })
            }
        </GroupLink>
    )
}

//export default withRouter(CustomLinks)

export default CustomLinks