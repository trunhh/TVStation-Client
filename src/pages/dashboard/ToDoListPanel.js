import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import todoActions from '../../redux/actions/todoActions';
import { TextLink } from '../../_sharecomponents/customrsuite/CustomRsuite';
import { useNavigate } from 'react-router-dom';
import "./ToDoPanel.css"
const ToDoListPanel = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        props.getList();
    }, []);

    const handleRowClick = (id) => {
            // navigate(`${SCRIPT_PROGRAM_DETAIL}/${id}`);
        };

    return (
        <div className="to-do-panel">
            {/* <div spacing={15} alignItems="center" justifyContent='space-around'>
                <strong>Công việc cần xử lý</strong>
            </div>
            
            <List>
              {props.list.map(message => (
                <List.Item key={message.id} className="list-item">
                  <div spacing={15} alignItems="center" justifyContent='space-between'>
                    <div spacing={15} alignItems="flex-start" className="truncate-single-line">
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
                      </div>
                      <Text muted size="sm">{new Intl.DateTimeFormat('en-GB').format(new Date(message.airdate))}</Text>
                  </div>
                </List.Item>
              ))}
            </List> */}
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
