import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import todoActions from '../../../actions/todoActions';
import { SCRIPT_PROGRAM_DETAIL } from '../../../constants/routeConstants';
import { List, Text, Avatar } from 'rsuite';
import HStack from 'rsuite/HStack';
import 'rsuite/Stack/styles/index.css';
import { TextLink } from '../../../_sharecomponents/customrsuite/CustomRsuite';
import { useNavigate } from 'react-router-dom';
import "./ToDoPanel.css"
const ToDoListPanel = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        props.getList();
    }, []);

    const handleRowClick = (id) => {
            navigate(`${SCRIPT_PROGRAM_DETAIL}/${id}`);
        };

    return (
        <div className="to-do-panel">
            <Text size="lg">Công việc cần xử lý</Text>
            <List>
              {props.list.map(message => (
                <List.Item key={message.id}>
                  <HStack spacing={15} alignItems="center">
                    <Avatar src="" alt={message.creatorName[0]} circle />
                    <div>
                        <TextLink
                            onRowClick={()=>handleRowClick(message.id)}
                            text={message.title}
                        />
                        <Text muted size="sm">
                          {message.creatorName}
                        </Text>
                      </div>
                      <Text>{new Intl.DateTimeFormat('en-GB').format(new Date(message.createdDate))}</Text>
                  </HStack>
                </List.Item>
              ))}
            </List>
        </div>
        
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.todo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => dispatch(todoActions.getList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListPanel);
