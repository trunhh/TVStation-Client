import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MEDIA_PROJECT_API } from '../../../constants/apiConstants';
import { MEDIA_PROJECT } from '../../../constants/routeConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';

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

const MediaProjectDetail = (props) => {
    const nullForm = {
        title: '',
        status: "IN_PROGRESS",
        mediaUrl: "",
        content: '',
        isPersonal: true,
    };

    const { id } = useParams();

    const [formData, setFormData] = useState(nullForm);
    

    useEffect(() => {
        setFormData(nullForm);
        props.get(id);
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
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    const handleFormDataChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        props.update(id,formData)
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
                    <video width="100%" height="auto" controls>
                      <source src={"https://localhost:7031/" + formData.mediaUrl} type="video/quicktime" />
                    </video>

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
    ...state.plan,
    selected: selectPlan(state),
    isLoading: state.view.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(MEDIA_PROJECT_API, id)),
    create: (data) => dispatch(planActions.create(MEDIA_PROJECT_API, data)),
    update: (id,data) => dispatch(planActions.update(MEDIA_PROJECT_API, id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectDetail);
