import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './PlanDetailsPage.scss'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MEDIA_PROJECT_API } from '../../../constants/apiConstants'
import planActions from '../../../actions/planActions'
import CustomInputNonOutline from '../../../_sharecomponents/custominput/CustomInputNonOutline';
const MediaProjectDetail = (props) => {
    const [editorContent, setEditorContent] = useState('');
    const nullFormData = {
        id: '',
        title: '',
        status: '',
        sector: '',
        createdDate: '',
        creatorName: '',
        isPersonal: false,
    }
    const [formData, setFormData] = useState(nullFormData);

    const handleModalClose = () => {
        setFormData(nullFormData)
        props.onClose();
    };

    useEffect(() => {
        setFormData(props.selected || nullFormData)
    }, [props.selected]);

    const handleSubmit = () => {
        if (formData.id) {
            // Update action
            props.update(formData)
                .then((updatedObject) => {
                    setFormData(updatedObject);
                    // Optionally show success message
                })
                .catch(error => {
                });
        } else {
            props.create(formData)
                .then((newObject) => {
                    setFormData(newObject);
                    // Optionally show success message
                })
                .catch(error => {
                    // Handle error
                });
        }
    };



    const handleContentChange = (content) => {
        setEditorContent(content);
        console.log('Editor Content:', content); // For debugging
    };

    return (
        <div className="plan-detail-page">
            <div className="modal-backdrop" onClick={handleModalClose}></div>
            
            <div className="plan-details">
                <CustomInputNonOutline
                    name="keyword"
                    type="text"
                    placeholder="Tiêu đề"
                    className="search-bar" 
                />
                <ReactQuill
                    className="large-editor"
                    theme="snow"
                    value={editorContent}
                    onChange={handleContentChange}
                    placeholder=""
                />
                <button
                    type="button"
                    className="blue-button"
                    onClick={handleSubmit}
                >
                    {formData && formData.id ? "Lưu" : "Thêm"}
                </button>

            </div>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.plan ,
        isLoading: state.view.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(planActions.get(MEDIA_PROJECT_API, data)),
        update: (data) => dispatch(planActions.update(MEDIA_PROJECT_API, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectDetail)