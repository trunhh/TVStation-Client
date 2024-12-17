import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ToDoListPanel from './ToDoListPanel';
const Dashboard = (props) => {
    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])
    
    return (
        <div style={{padding: "24px 32px"}}>
            <ToDoListPanel/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading
    };
};

export default connect(mapStateToProps, null)(Dashboard);
