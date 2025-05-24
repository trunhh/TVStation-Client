import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import planActions from '../../redux/actions/planActions';
import StatusBox from '../../_sharecomponents/statusbox/StatusBox';
import 'react-quill/dist/quill.snow.css';
import { CustomFormSelect, CustomFormInput } from '../../_sharecomponents/customrsuite/CustomRsuite';
import {
  CustomApproveButton,
  CustomSubmitButton
} from '../../_sharecomponents/customrsuite/CustomRsuite';
import BootstrapVideoUploader from '../../components/BootstrapVideoUploader';
import { Tab, Nav } from 'react-bootstrap';
import FilterForm from '../../components/FilterForm';
import siteMapActions from '../../redux/actions/siteMapActions';
import channelActions from '../../redux/actions/channelActions';
import { DurationConst, DayOfWeekConst } from '../../constants/constants';


// Redux selector
const selectPlan = createSelector(
  (state) => state.plan,
  (planState) => planState.selected
);

const role = localStorage.getItem('role');

const ProgramFrameYearDetail = (
  { 
    selected, 
    get, update,
    getChannel, getSiteMap,
    siteMap, channel, 
    ...props 

  }) => 
  {
  const { id } = useParams();

  const nullForm = {
    startDate: new Date(),
    startTime: "00:00:00",
    duration: 1,
    siteMapId: null,
    channelId: null,
    frequency: null,
    episodeNumber: 0,
  };


  const fieldProps = {
    duration: { data: DurationConst, label: "Thời lượng"},
    frequency: { type: "email", required: true, list: "iw", multiple: true, children: (<DayOfWeekConst id="iw"/>), label: "Lặp lại" },
    siteMapId: { data: siteMap, label: "Phòng ban" },
    channelId: { data: channel, label: "Kênh phát sóng" },
    startDate: { type: "date", label: "Ngày khởi chiếu"},
    startTime: { type: "time", label: "Khung giờ" },
    episodeNumber: { type: "number", label: "Số tập", min: 1 },
  }

  const [cfgForm, setCfgForm] = useState(nullForm);
  const [title, setTitle] = useState();
  const [scripts, setScripts] = useState();
  const [mediaUrl, setMediaUrl] = useState();

  useEffect(() => {
    getChannel();
    getSiteMap();
    if (id) {
      get(id);
    }
  }, [id]);

  useEffect(() => {
    if (selected) {
      console.log(selected)
      setCfgForm((prev) => ({
        ...prev,
        startDate: selected.startDate,
        startTime: selected.startTime,
        duration: selected.duration,
        siteMapId: selected.siteMap?.id,
        channelId: selected.channel?.id,
        frequency: selected.frequency,
        episodeNumber: selected.episodeNumber
      }));
      setTitle(selected.title);
    }
  }, [selected]);

  const handleChange = (key, value) => {
    setCfgForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    console.log(cfgForm);
    update(id, cfgForm);
  };

  const handleApprove = (action) => {
    update(id, { ...cfgForm, status: action });
  };


  return (
    <section className="container bg-white shadow-lg rounded p-4 my-5">

      
        <Tab.Container defaultActiveKey="config">
          <div className="row align-items-center">
            <div className="col-auto pe-0">
              <StatusBox status={selected?.status} />
            </div>
            <div className="col ps-0">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
          </div>

          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="config">Tổng quan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="episodes">Tập phát sóng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="permission">Phân quyền</Nav.Link>
            </Nav.Item>
          </Nav>



          <Tab.Content className="py-3">
            <Tab.Pane eventKey="config">
              <FilterForm form={cfgForm} setForm={setCfgForm} fieldProps={fieldProps}/>
              <CustomSubmitButton type="button" onClick={handleSubmit} className="ms-auto" />
              {/* <div className="row">
                <div className="col-auto">
                  <CustomApproveButton
                    role={role}
                    status={selected?.status}
                    type="button"
                    onClick={handleApprove}
                  />
                </div>
              </div> */}
            </Tab.Pane>
            <Tab.Pane eventKey="episodes">
              {/* <div>
                <CustomFormInput
                  label="Tóm tắt"
                  as="textarea"
                  rows="10"
                  value={scripts}
                  onChange={(e) => setScripts(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Nội dung kịch bản</label>
                <ReactQuill
                  className="large-editor"
                  theme="snow"
                  value={cfgForm.content}
                  onChange={(value) => handleChange("content", value)}
                  placeholder="Nhập nội dung kịch bản..."
                />

                <BootstrapVideoUploader
                mediaUrl={mediaUrl}
                onUpload={(url) => setMediaUrl(url)}
              />
              </div> */}
            </Tab.Pane>

            <Tab.Pane eventKey="permission">

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

    </section>
  );
};

const mapStateToProps = (state) => ({
  selected: selectPlan(state),
  siteMap: state.siteMap.list,
  channel: state.channel.list
});

const mapDispatchToProps = (dispatch) => ({
  get: (id) => dispatch(planActions.get(id)),
  update: (id, data) => dispatch(planActions.update(id, data)),
  getSiteMap: () => dispatch(siteMapActions.getList()),
  getChannel: () => dispatch(channelActions.getList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameYearDetail);
