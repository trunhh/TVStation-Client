import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import '../PlanDetailsPage.scss'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectDetail)