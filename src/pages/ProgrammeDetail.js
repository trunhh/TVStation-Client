import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { programmeActions, siteMapActions, episodeActions, channelActions } from '../redux/reduxes';
import StatusBox from '../_sharecomponents/statusbox/StatusBox';
import {
  TextLink,
  CustomSubmitButton
} from '../_sharecomponents/customrsuite/CustomRsuite';
import { Tab, Nav } from 'react-bootstrap';
import DynamicForm from '../components/DynamicForm';
import { DurationConst, DayOfWeekConst } from '../constants/constants';
import DynamicTable from '../components/DynamicTable';
import { EPISODE_DETAIL, PROGRAMME } from '../constants/routeConstants';

// Redux selector
const selectPlan = createSelector(
  (state) => state.programme,
  (programmeState) => programmeState.selected
);

const role = localStorage.getItem('role');

const ProgrammeDetail = (
  { 
    selected, 
    get, create, update,
    deleteEpisode,
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
    duration: { data: DurationConst, label: "Thời lượng", disabled: (id != null) },
    frequency: { type: "email", required: true, list: "iw", multiple: true, children: (<DayOfWeekConst id="iw"/>), label: "Lặp lại", disabled: (id != null) },
    siteMapId: { data: siteMap, label: "Phòng ban" },
    channelId: { data: channel, label: "Kênh phát sóng" },
    startDate: { type: "date", label: "Ngày khởi chiếu", required: true},
    startTime: { type: "time", label: "Khung giờ", step: 1, required: true },
    episodeNumber: { type: "number", label: "Số tập", min: 1, disabled: (id != null) },
  }

  const [cfgForm, setCfgForm] = useState(nullForm);
  const [title, setTitle] = useState("Đề tài mới");

  const navigate = useNavigate();

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

  useEffect(() => {
    if (props.isCreated) navigate(PROGRAMME);
  }, [props.isCreated])


  const handleSubmit = (cfgForm) => {
    console.log(cfgForm )
    if (id) update(id, {title, ...cfgForm});
    else create({title, ...cfgForm});
  };

  const handleRowClick = (rowData) => {
      navigate(`${EPISODE_DETAIL}/${rowData.id}`);
  };

  const handleDeleteClick = (item) => {
      deleteEpisode(item.id);
  };
  
  const handleAddButtonClick = () => {
      navigate(`${EPISODE_DETAIL}`);
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }


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
                onChange={(e) => handleTitleChange(e)}
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
              <DynamicForm form={cfgForm} setForm={setCfgForm} fieldProps={fieldProps} onSubmit={handleSubmit}/>
            </Tab.Pane>
            {(id && selected) && (
            <>
              <Tab.Pane eventKey="episodes">
                <div className="d-flex justify-content-end gap-2">
                  <a 
                      className="bi bi-plus-circle-fill link-secondary"
                      onClick={handleAddButtonClick}
                  />
                </div>
                <DynamicTable 
                  data={selected.episodes} 
                  onRowClick={handleRowClick} 
                  onRowDelete={handleDeleteClick} 
                  columns={[
                      { header: "Tập", body: (rowData) => `Tập ${rowData.index}` },
                      { header: "Ngày phát sóng", body: (rowData) => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.start)) },
                      { header: "Tiêu đề", body: (rowData) => (<TextLink text={rowData.title}/>), focus: true },
                      { header: "Trạng thái", body: (rowData) => (<StatusBox status={rowData.status} />) }          
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="permission">
                <DynamicTable 
                  data={selected.collaborators} 
                  onRowClick={handleRowClick} 
                  onRowDelete={handleDeleteClick} 
                  columns={[
                      { header: "Phòng ban", body: (rowData) => rowData.siteMapName },
                      { header: "Người dùng", body: (rowData) => rowData.userName, focus: true },
                      { header: "Phân quyền", body: (rowData) => rowData.permission }       
                  ]}
                />
              </Tab.Pane>
              
            </>


            )}
          </Tab.Content>
        </Tab.Container>

    </section>
  );
};

const mapStateToProps = (state) => ({
  selected: selectPlan(state),
  siteMap: state.siteMap.list,
  channel: state.channel.list,
  ...state.programme
});

const mapDispatchToProps = (dispatch) => ({
  get: (id) => dispatch(programmeActions.get(id)),
  update: (id, data) => dispatch(programmeActions.update(id, data)),
  create: (data) => dispatch(programmeActions.create(data)),
  deleteEpisode: (id) => dispatch(episodeActions.remove(id)),
  getSiteMap: () => dispatch(siteMapActions.getList()),
  getChannel: () => dispatch(channelActions.getList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgrammeDetail);
