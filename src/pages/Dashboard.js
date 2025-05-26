import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ToDoListPanel from './ToDoListPanel';
const Dashboard = (props) => {
    
    return (
        <ToDoListPanel/>
    );
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, null)(Dashboard);
