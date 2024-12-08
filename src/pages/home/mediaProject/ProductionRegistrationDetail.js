import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTION_REGISTRATION_API } from '../../../constants/apiConstants';
import { PRODUCTION_REGISTRATION } from '../../../constants/routeConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';

import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.css';

import { CustomApproveButton, CustomSubmitButton, CustomDatePicker, CustomToggle, CustomInputNoOutline } from '../../../_sharecomponents/customrsuite/CustomRsuite';

const selectPlan = createSelector(
    (state) => state.productionRegistration,
    (planState) => planState.selected
);

const ProductionRegistrationDetail = (props) => {
    const nullForm = {
        title: '',
        status: "IN_PROGRESS",
        sector: "TV",
        airdate: new Date(),
        content: '',
        isPersonal: true
    };

    const { id } = useParams(); // Extract id from URL
    const navigate = useNavigate(); // For navigation

    const [formData, setFormData] = useState(nullForm);
    

    // Fetch data on load if id is present
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
        if (props.isCreated) navigate(PRODUCTION_REGISTRATION);
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
                            <SelectPicker
                                value={formData.sector}
                                onChange={(value) => handleFormDataChange("sector", value)}
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
                    <ReactQuill
                        className="large-editor"
                        theme="snow"
                        value={formData.content}
                        onChange={(value) => handleFormDataChange("content", value)}
                        placeholder="Nội dung..."
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
    ...state.productionRegistration,
    selected: selectPlan(state),
    isLoading: state.view.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(PRODUCTION_REGISTRATION_API, id)),
    create: (data) => dispatch(planActions.create(PRODUCTION_REGISTRATION_API, data)),
    update: (id,data) => dispatch(planActions.update(PRODUCTION_REGISTRATION_API, id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRegistrationDetail);
