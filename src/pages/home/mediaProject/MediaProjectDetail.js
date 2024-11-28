import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import '../PlanDetailsPage.scss'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MEDIA_PROJECT_API } from '../../../constants/apiConstants'
const MediaProjectDetail = (props) => {
    const [editorContent, setEditorContent] = useState('');

    const handleContentChange = (content) => {
        setEditorContent(content);
        console.log('Editor Content:', content); // For debugging
    };

    return (
        <div className="plan-page">
            
            <div className="plan-details">
                <input
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
        get: (id) => {
            dispatch(planActions.get(MEDIA_PROJECT_API, id))
        },
        delete: (id) => {
            dispatch(planActions.remove(MEDIA_PROJECT_API, id))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectDetail)