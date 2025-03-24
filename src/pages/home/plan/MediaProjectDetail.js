import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ROOT_PATH, MEDIA_PROJECT_API, MEDIA_UPLOAD_API } from '../../../constants/apiConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { createSelector } from 'reselect';
import ReactPlayer from 'react-player';
import { 
    CustomApproveButton, 
    CustomSubmitButton, 
    CustomToggle, 
    CustomInputNoOutline 
} from '../../../_sharecomponents/customrsuite/CustomRsuite';

const selectPlan = createSelector(
    (state) => state.plan,
    (planState) => planState.selected
);

const role = localStorage.getItem('role');

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

    // useEffect(() => {
    //     props.showLoading(props.isLoading)
    // }, [props.isLoading])

    const handleFormDataChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        props.update(id,formData)
    };

    const handleApprove = (action) => {
        const newFormData = {
            ...formData,
            status: action
        }
        props.update(id,newFormData)
    }
    

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
                    <div style={{ position: 'relative', paddingTop: '56.25%' /* 9/16 = 56.25% */, width: '100%' }}>
                      <ReactPlayer
                        url={ROOT_PATH + formData.mediaUrl}
                        controls={true}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                </div>

                <div className="content">
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
    isLoading: state.view.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(MEDIA_PROJECT_API, id)),
    create: (data) => dispatch(planActions.create(MEDIA_PROJECT_API, data)),
    update: (id,data) => dispatch(planActions.update(MEDIA_PROJECT_API, id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectDetail);
