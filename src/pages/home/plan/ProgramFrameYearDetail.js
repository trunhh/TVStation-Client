import React, { useEffect, useState, useRef } from 'react';
import './PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PROGRAM_FRAME_YEAR_API } from '../../../constants/apiConstants';
import { PROGRAM_FRAME_YEAR } from '../../../constants/routeConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css';

import {
    CustomApproveButton,
    CustomSubmitButton,
    CustomYearPicker,
    CustomToggle,
    CustomInputNoOutline,
} from '../../../_sharecomponents/customrsuite/CustomRsuite';

const GC = require('@mescius/spread-sheets');

const selectPlan = createSelector(
    (state) => state.plan,
    (planState) => planState.selected
);

const role = localStorage.getItem('role');

const ProgramFrameYearDetail = (props) => {
    const nullForm = {
        title: '',
        status: 'IN_PROGRESS',
        sector: 'TV',
        year: new Date().getFullYear(),
        content: '', // JSON string to initialize the spreadsheet
        isPersonal: true,
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(nullForm);
    const spreadsheetRef = useRef(null);
    const workbookRef = useRef(null); // Persistent reference for the workbook

    useEffect(() => {
        setFormData(nullForm);
        if (id) {
            props.get(id); // Fetch the data for the given id
        }
    }, [id]);

    useEffect(() => {
        if (props.selected) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...props.selected, // Update the form data once fetched
            }));
        }
    }, [props.selected]); // Only update when selected data changes

    useEffect(() => {
        if (props.isCreated) navigate(PROGRAM_FRAME_YEAR);
    }, [props.isCreated]);

    // useEffect(() => {
    //     props.showLoading(props.isLoading);
    // }, [props.isLoading]);

    useEffect(() => {
            // Ensure the spreadsheet container exists
            if (spreadsheetRef.current) {
                // Initialize workbook only if it hasn't been created yet
                if (!workbookRef.current) {
                    workbookRef.current = new GC.Spread.Sheets.Workbook(spreadsheetRef.current);
                }
        
                // Load content into the workbook
                if (formData.content) {
                    try {
                        const data = JSON.parse(formData.content);
                        // Clear existing data to avoid conflicts
                        workbookRef.current.clearSheets();
                        workbookRef.current.fromJSON(data);
                    } catch (error) {
                        console.error('Failed to load spreadsheet content:', error);
                    }
                }
            }
        }, [formData.content]);

    const handleFormDataChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (workbookRef.current) {
            const spreadsheetData = JSON.stringify(workbookRef.current.toJSON());
            const updatedFormData = { ...formData, content: spreadsheetData };

            if (id) props.update(id, updatedFormData);
            else props.create(updatedFormData);
        }
    };

    const handleApprove = (action) => {
        const newFormData = {
            ...formData,
            status: action
        }
        props.update(id,newFormData)
    }

    return (
        <div className="plan-detail-page">
            <div className="main-form">
                <div className="content">
                    <div className="inline-group">
                        <StatusBox status={formData.status} />
                        <CustomInputNoOutline
                            value={formData.title}
                            placeholder="Đề tài chưa đặt tên"
                            onChange={(value) => handleFormDataChange('title', value)}
                        />
                    </div>
                    <div className="inline-group">
                        <div className="component-label-group">
                            <p className="label-text">Dự kiến phát sóng</p>
                            <CustomYearPicker
                                value={formData.year}
                                onChange={(value) => handleFormDataChange('year', value)}
                            />
                        </div>
                    </div>
                    <div>
                        <CustomToggle
                            checked={!formData.isPersonal}
                            onChange={(value) => handleFormDataChange('isPersonal', !value)}
                        >
                            Chia sẻ
                        </CustomToggle>
                    </div>
                    <p className="label-text">Nội dung</p>
                    <div
                        id="spreadsheet"
                        ref={spreadsheetRef}
                        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                    ></div>
                </div>
            </div>
            <div className="side-bar">
                <div className="component-label-group">
                    <p className="label-text">Luân chuyển</p>
                    <CustomApproveButton 
                        role={role} 
                        status={formData.status} 
                        type="button" 
                        onClick={handleApprove} 
                    />
                </div>
                <div className="component-label-group">
                    <p className="label-text">Chức năng</p>
                    <CustomSubmitButton type="button" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state.plan,
    selected: selectPlan(state),
    isLoading: state.view.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(PROGRAM_FRAME_YEAR_API, id)),
    create: (data) => dispatch(planActions.create(PROGRAM_FRAME_YEAR_API, data)),
    update: (id, data) => dispatch(planActions.update(PROGRAM_FRAME_YEAR_API, id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameYearDetail);
