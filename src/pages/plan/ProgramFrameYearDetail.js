import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import planActions from '../../redux/actions/planActions';
import StatusBox from '../../_sharecomponents/statusbox/StatusBox';
import ReactPlayer from 'react-player';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomFormSelect, CustomFormInput } from '../../_sharecomponents/customrsuite/CustomRsuite';
import {
  CustomApproveButton,
  CustomSubmitButton
} from '../../_sharecomponents/customrsuite/CustomRsuite';
import { SectorConst } from '../../constants/constants';
import BootstrapVideoUploader from '../../components/BootstrapVideoUploader';

// Redux selector
const selectPlan = createSelector(
  (state) => state.plan,
  (planState) => planState.selected
);

const role = localStorage.getItem('role');

const ProgramFrameYearDetail = ({ selected, get, update }) => {
  const { id } = useParams();

  const nullForm = {
    collaboratorUsername: [],
    channelId: "00000000-0000-0000-0000-000000000000",
    status: "IN_PROGRESS",
    mediaUrl: "",
    sector: "TV",
    summary: "",
    content: "",
    start: "2025-05-19T23:30:00",
    end: "2025-05-20T02:30:00",
    title: "",
    rRule: "",
    body: ""
  };

  const [formData, setFormData] = useState(nullForm);

  useEffect(() => {
    if (id) {
      get(id);
    }
  }, [id]);

  useEffect(() => {
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        ...selected
      }));
    }
  }, [selected]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData)
    //update(id, formData);
  };

  const handleApprove = (action) => {
    update(id, { ...formData, status: action });
  };

  const isValidMediaUrl = (url) => {
  // A basic check: non-empty and likely a playable video format
  return url && /\.(m3u8|mp4|webm|mov)$/i.test(url);
    };

  return (
    <section className="container bg-white shadow-lg rounded p-4 my-5">
      <form className="d-grid gap-4">
        {/* Title & Status Row */}
        <div className="row align-items-center">
          <div className="col-auto pe-0">
            <StatusBox status={formData.status} />
          </div>
          <div className="col ps-0">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div className="col-auto">
            <div className="form-control">
              {new Date(formData.start).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </div>
          </div>
        </div>

        {/* Sector & Recurrence Rule */}
        <div className="row">
          <div className="col">
            <CustomFormSelect
                data = { SectorConst}
                label = "Lĩnh vực"
                placeholder = ' '
              value={formData.sector}
              onChange={(e) => handleChange('sector', e.target.value)}
            />
          </div>

          <div className="col">
            <CustomFormInput
              label="Chu kỳ phát sóng"
              type="text"
              placeholder="e.g., MO, TU"
              value={formData.rRule}
              onChange={(e) => handleChange('rRule', e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <CustomFormInput
            label="Tóm tắt"
            as="textarea"
            rows="5"
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </div>

        {/* Content */}
        <div>
          <label className="form-label">Nội dung kịch bản</label>
          <ReactQuill
            className="large-editor"
            theme="snow"
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
            placeholder="Nhập nội dung kịch bản..."
          />
        </div>

        <BootstrapVideoUploader
          mediaUrl={formData.mediaUrl}
          onUpload={(url) => handleChange("mediaUrl", url)}
        />
    
        {/* Action Buttons */}
        <div className="row">
          <div className="col-auto">
            <CustomApproveButton
              role={role}
              status={formData.status}
              type="button"
              onClick={handleApprove}
            />
          </div>
          <div className="col-auto">
            <CustomSubmitButton type="button" onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  selected: selectPlan(state)
});

const mapDispatchToProps = (dispatch) => ({
  get: (id) => dispatch(planActions.get(id)),
  update: (id, data) => dispatch(planActions.update(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameYearDetail);
