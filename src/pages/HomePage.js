import React, { useEffect} from 'react';
import { Routes, Route, Outlet}  from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import viewActions from '../redux/actions/viewActions';



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
            <Outlet/>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        ...state.loading
    }
}

const mapDispatchToProps = (dispatch) => ({
    clearErrorMessage: () => dispatch(viewActions.clearErrorMessage()), // Map clearError action to props
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);