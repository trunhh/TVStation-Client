import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../PlanDetailsPage.scss';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTION_REGISTRATION_API } from '../../../constants/apiConstants';
import planActions from '../../../actions/planActions';
import ToggleSwitch from '../../../_sharecomponents/customswitch/ToggleSwitch';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import CustomInputNonOutline from '../../../_sharecomponents/custominput/CustomInputNonOutline';

const ProductionRegistrationDetail = (props) => {
    const nullForm = {
        title: '',
        status: "IN_PROGRESS",
        sector: '',
        createdDate: '',
        creator: '',
        isPersonal: false,
    }
    const { id } = useParams(); // Extract id from URL
    const navigate = useNavigate(); // For navigation
    const [editorContent, setEditorContent] = useState('');
    const [formData, setFormData] = useState(nullForm);

    // Fetch data on load if id is present
    useEffect(() => {
        if (id) {
            props.get(id)
                .then((data) => {
                    if (data) {
                        setFormData(data);
                        setEditorContent(data.content || ''); // Set editor content
                    }
                })
                .catch((error) => {
                    console.error('Error fetching media project:', error);
                    // Optionally navigate back if fetch fails
                });
        } else {
            // Reset form data for create mode
            setFormData({
                id: '',
                title: '',
                status: "IN_PROGRESS",
                sector: '',
                createdDate: '',
                creator: '',
                isPersonal: false,
            });
            setEditorContent('');
        }
    }, [id, props]);

    // Handle form submission
    const handleSubmit = () => {
        const saveData = { ...formData, content: editorContent };
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
                    navigate.push(`/MediaProject/Details/${newData.id}`); // Redirect to detail view
                })
                .catch((error) => {
                    console.error('Error creating media project:', error);
                });
        }
    };

    const handleContentChange = (content) => {
        setEditorContent(content);
    };

    return (
        <div className="plan-detail-page ">
            <div className="main-form">
                <div className="plan-details">
                    <div className="title-line">
                        <StatusBox status={formData.status} />
                        <CustomInputNonOutline
                            name="title"
                            type="text"
                            placeholder="Đề tài chưa đặt tên..."
                            className="search-bar"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    
                    <ToggleSwitch
                        label = "Chia sẻ"
                    />
                    <b>Nội dung</b>
                    <ReactQuill
                        className="large-editor"
                        theme="snow"
                        value={editorContent}
                        onChange={handleContentChange}
                        placeholder="Nội dung..."
                    />
                    <button
                        type="button"
                        className="blue-button"
                        onClick={handleSubmit}
                    >
                        {id ? 'Lưu' : 'Thêm'}
                    </button>
                </div>
            </div>
            <div className="side-bar"></div>
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
