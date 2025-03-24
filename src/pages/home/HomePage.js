import React, { useEffect} from 'react';
import { Routes, Route, Outlet}  from 'react-router-dom';
import Header from './header/Header';

import './HomePage.css';

import { connect } from 'react-redux';
import viewActions from '../../actions/viewActions';



const HomePage = (props) => {
    


    useEffect(() => {
        if (props.errorMessage) {
            alert(props.errorMessage)
            props.clearErrorMessage();
        }
            
    }, [props.errorMessage])

    return(
        <>
            <Header/>
            <div className='main-content'>
                <Outlet />
            </div>
        </>
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