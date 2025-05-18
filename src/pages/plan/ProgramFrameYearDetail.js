import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PROGRAM_FRAME_YEAR_API } from '../../constants/apiConstants';
import { PROGRAM_FRAME_YEAR } from '../../constants/routeConstants';
import planActions from '../../redux/actions/planActions';
import StatusBox from '../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import ReactPlayer from 'react-player';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    CustomApproveButton,
    CustomSubmitButton,
    CustomToggle,
    CustomInputNoOutline,
} from '../../_sharecomponents/customrsuite/CustomRsuite';

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
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
                    <div className="d-flex flex-row inline-group justify-content-between align-items-center gap-5 mb-4">
                        <div className='d-flex flex-row justify-content-center gap-2'>
                            <StatusBox status={formData.status} />
                            <div>
                                <h5 className='m-0'>Thực thần sóng núi</h5>
                                <small>Phim Trung Quốc</small>

                            </div>
                            
                        

                        </div>
                        
                        <div className="component-label-group">
                            <div className="label-text">10:00 15/05/2025</div>
                            {/* <CustomYearPicker
                                value={formData.year}
                                onChange={(value) => handleFormDataChange('year', value)}
                            /> */}
                        </div>
                    </div>
                    {/* <div>
                        <CustomToggle
                            checked={!formData.isPersonal}
                            onChange={(value) => handleFormDataChange('isPersonal', !value)}
                        >
                            Chia sẻ
                        </CustomToggle>
                    </div> */}
                    <div className="label-text">Kịch bản</div>
                     <ReactQuill
                        className="large-editor"
                        theme="snow"
                        value={formData.content}
                        onChange={(value) => handleFormDataChange("content", value)}
                        placeholder="Nội dung..."
                    />

                    <div className="label-text">Nguồn</div>
                    <ReactPlayer
                        url="https://1253562137.e.cdneverest.net/o-fLoPqv4kVBnT0PyvB3pg/1747102484/live/285a4c99665fdf84e94956c66bc7dc7eb5d/playlist.m3u8"
                        controls={true}
                      />
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
        </section>
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
