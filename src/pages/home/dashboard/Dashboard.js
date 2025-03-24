import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ToDoListPanel from './ToDoListPanel';
const Dashboard = (props) => {
    // useEffect(() => {
    //     props.showLoading(props.isLoading)
    // }, [props.isLoading])
    
    return (
        <ToDoListPanel/>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading
    };
};

export default connect(mapStateToProps, null)(Dashboard);
