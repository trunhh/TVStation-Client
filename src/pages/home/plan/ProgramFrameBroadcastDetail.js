import React, { useEffect, useState } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import './PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PROGRAM_FRAME_BROADCAST_API } from '../../../constants/apiConstants';
import { PROGRAM_FRAME_BROADCAST } from '../../../constants/routeConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';
import SpreadsheetEditor from '../../../_sharecomponents/speadsheet/SpreadsheetEditor';

import { 
    CustomApproveButton, 
    CustomSubmitButton, 
    CustomDatePicker, 
    CustomGenrePicker,
    CustomToggle, 
    CustomInputNoOutline 
} from '../../../_sharecomponents/customrsuite/CustomRsuite';

const selectPlan = createSelector(
    (state) => state.plan,
    (planState) => planState.selected
);

const ProgramFrameBroadcastDetail = (props) => {
    const nullForm = {
        title: '',
        status: "IN_PROGRESS",
        sector: "TV",
        airdate: new Date(),
        content: '',
        isPersonal: true,
        genre: null,
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(nullForm);
    

    useEffect(() => {
        setFormData(nullForm);
        if (id) {
            props.get(id);
        }
    }, []);

    useEffect(() => {
        if (props.selected) {
            setFormData((prevFormData) => ({
            ...prevFormData,
            ...props.selected
        }));
        }
    }, [props.selected]);

    useEffect(() => {
        if (props.isCreated) navigate(PROGRAM_FRAME_BROADCAST);
    }, [props.isCreated])

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    const handleFormDataChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (id) props.update(id,formData)
        else props.create(formData)
    };
    

    console.log(formData)

    return (
        <div className="plan-detail-page">
            <div className="main-form">
                <div className="content">
                    <div className="inline-group">
                        <StatusBox status={formData.status} />
                        <CustomInputNoOutline
                            value={formData.title}
                            placeholder="Đề tài chưa đặt tên"
                            onChange={(value) => handleFormDataChange("title", value)}
                        />
                    </div>
                    <div className="inline-group">
                        <div className="component-label-group">
                            <p className="label-text">Thể loại</p>
                            <CustomGenrePicker
                                value={formData.genre}
                                onChange={(value) => handleFormDataChange("genre", value)}
                            />
                        </div>
                        <div className="component-label-group">
                            <p className="label-text">Dự kiến phát sóng</p>
                            <CustomDatePicker
                                value={formData.airdate}
                                onChange={(value) => handleFormDataChange("airdate", value)}
                            />
                        </div>
                    </div>
                    <div>
                        <CustomToggle
                            checked={!formData.isPersonal}
                            onChange={(value) => handleFormDataChange("isPersonal", !value)}
                        >
                            Chia sẻ
                        </CustomToggle>
                    </div>
                    <p className="label-text">Nội dung</p>
                    <SpreadsheetEditor
                        value={formData.content} // JSON string
                        onChange={(newContent) => handleFormDataChange('content', newContent)}
                    />
                </div>
            </div>
            <div className="side-bar">
                <div className="component-label-group">
                    <p className="label-text">Luân chuyển</p>
                    <CustomApproveButton type="button" onClick={handleSubmit} />
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
    isLoading: state.view.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(PROGRAM_FRAME_BROADCAST_API, id)),
    create: (data) => dispatch(planActions.create(PROGRAM_FRAME_BROADCAST_API, data)),
    update: (id,data) => dispatch(planActions.update(PROGRAM_FRAME_BROADCAST_API, id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameBroadcastDetail);