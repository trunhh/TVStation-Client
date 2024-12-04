import React, { useEffect} from 'react';
import { Routes, Route, Outlet}  from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

import UserInfo from './userinfo/UserInfo';
import ListGroups from './listgroups/ListGroups';
import Settings from './settings/Settings';

import WithLoading from '../../_sharecomponents/loading/WithLoading';

import './HomePage.css';

import { connect } from 'react-redux';
import viewActions from '../../actions/viewActions';



const HomePage = (props) => {
    //const [sideBarIsOpen, setSidebarIsOpen] = useState(true)
    const handleClickMenuIcon = (sidebarIsOpen) => {
        //setSidebarIsOpen(sidebarIsOpen)
    }

    useEffect(() => {
        if (props.errorMessage) {
            alert(props.errorMessage)
            props.clearErrorMessage();
        }
            
    }, [props.errorMessage])

    return(
        <div className='home-container'>
            <Sidebar />
            <div className={props.sidebarIsOpen ? 'home-main' : 'home-main sidebar-close'}>
                <Header clickMenuIcon={handleClickMenuIcon}/>
                <div className='main-content'>
                    {/* react router ver 5 */}
                    {/* <Switch>
                        <Route path="/user-info" component={UserWithLoading} />
                        <Route path="/list-groups" component={ListGroupsWithLoading} />
                        <Route path="/settings" component={SettingsWithLoading} />
                    </Switch> */}

                    {/* react router ver 6 */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        ...state.view
    }
}

const mapDispatchToProps = (dispatch) => ({
    clearErrorMessage: () => dispatch(viewActions.clearErrorMessage()), // Map clearError action to props
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);