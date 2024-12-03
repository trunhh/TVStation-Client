import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTION_REGISTRATION_API } from '../../../constants/apiConstants';
import { PRODUCTION_REGISTRATION_DETAIL } from '../../../constants/routeConstants';
import planActions from '../../../actions/planActions';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import SearchInput from '../../../_sharecomponents/filterform/SearchInput';

import Toggle from 'rsuite/Toggle';
import 'rsuite/Toggle/styles/index.css';
import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.css';

import { CustomApproveButton, CustomSubmitButton, CustomDatePicker, CustomToggle } from '../../../_sharecomponents/customrsuite/CustomRsuite';

const ProductionRegistrationDetail = (props) => {
    const nullForm = {
        title: '',
        status: "IN_PROGRESS",
        sector: '',
        airdate: '',
        content: '',
        isPersonal: false,
    };

    const { id } = useParams(); // Extract id from URL
    const navigate = useNavigate(); // For navigation

    const [formData, setFormData] = useState(nullForm);

    // Fetch data on load if id is present
    useEffect(() => {
        if (id) {
            props.get(id)
                .then((data) => {
                    if (data) {
                        setFormData(data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching media project:', error);
                });
        } else {
            setFormData(nullForm);
        }
    }, [id, props]);

    // Handle form data change - updated to match handleQueryChange pattern
    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const saveData = { ...formData };
        if (id) {
            // Update existing media project
            props.update(saveData)
                .then((updatedData) => {
                    setFormData(updatedData);
                    alert('Media project updated successfully!');
                })
                .catch((error) => {
                    console.error('Error updating media project:', error);
                });
        } else {
            // Create new media project
            props.create(saveData)
                .then((newData) => {
                    setFormData(newData);
                    alert('Media project created successfully!');
                    navigate.push(`${PRODUCTION_REGISTRATION_DETAIL}/${newData.id}`); // Redirect to detail view
                })
                .catch((error) => {
                    console.error('Error creating media project:', error);
                });
        }
    };

    return (
        <div className="plan-detail-page">
            <div className="main-form">
                <div className="content">
                    <div className="inline-group">
                        <StatusBox status={formData.status} />
                        <SearchInput
                            name="title"
                            value={formData.title}
                            placeholder="Đề tài chưa đặt tên"
                            noOutline={true}
                            onChange={handleFormDataChange} // Title change handler
                        />
                    </div>
                    <div className="inline-group">
                        <div className="component-label-group">
                            <p className="label-text">Thể loại</p>
                            <SelectPicker
                                name="sector"
                                value={formData.sector}
                                onChange={(value) => handleFormDataChange({ target: { name: 'sector', value } })}
                            />
                        </div>
                        <div className="component-label-group">
                            <p className="label-text">Dự kiến phát sóng</p>
                            <CustomDatePicker
                                name="airdate"
                                value={formData.airdate}
                                onChange={(value) => handleFormDataChange({ target: { name: 'airdate', value } })}
                            />
                        </div>
                    </div>
                    <div>
                        <CustomToggle
                            name="isPersonal"
                            checked={formData.isPersonal}
                            onChange={(value) => handleFormDataChange({ target: { name: 'isPersonal', value } })}
                        >
                            Chia sẻ
                        </CustomToggle>
                    </div>
                    <p className="label-text">Nội dung</p>
                    <ReactQuill
                        name="content"
                        className="large-editor"
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => handleFormDataChange({ target: { name: 'content', value: content } })}
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
    isLoading: state.view.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    get: (id) => dispatch(planActions.get(PRODUCTION_REGISTRATION_API, id)),
    create: (data) => dispatch(planActions.create(PRODUCTION_REGISTRATION_API, data)),
    update: (data) => dispatch(planActions.update(PRODUCTION_REGISTRATION_API, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRegistrationDetail);
