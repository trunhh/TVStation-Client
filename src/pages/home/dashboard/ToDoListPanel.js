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
            <HStack spacing={15} alignItems="center" justifyContent='space-around'>
                <strong>Công việc cần xử lý</strong>
            </HStack>
            
            <List>
              {props.list.map(message => (
                <List.Item key={message.id} className="list-item">
                  <HStack spacing={15} alignItems="center" justifyContent='space-between'>
                    <HStack spacing={15} alignItems="flex-start" className="truncate-single-line">
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
                      </HStack>
                      <Text muted size="sm">{new Intl.DateTimeFormat('en-GB').format(new Date(message.airdate))}</Text>
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
