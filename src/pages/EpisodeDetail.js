import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { episodeActions } from '../redux/reduxes';
import StatusBox from '../components/StatusBox';
import { CustomFormInput } from '../components/CustomRsuite';
import { CustomSubmitButton } from '../components/CustomRsuite';
import BootstrapVideoUploader from '../components/BootstrapVideoUploader';
import { Tab, Nav } from 'react-bootstrap';
import DynamicForm from '../components/DynamicForm';
import { PROGRAMME_DETAIL } from '../constants/routeConstants';

// Redux selector
const selectEpisode = createSelector(
  (state) => state.episode,
  (episodeState) => episodeState.selected
);

const role = localStorage.getItem('role');

const EpisodeDetail = (
  { 
    selected, 
    get, create, update,
    defaultProgramme,
    ...props 

  }) => 
  {
  const { id } = useParams();

  const nullForm = {
    start: new Date(),
    end: new Date()
  };

  const fieldProps = {
    start: { type: "datetime-local", label: "Giờ bắt đầu"},
    end: { type: "datetime-local", label: "Giờ kết thúc" },
  }

  const [cfgForm, setCfgForm] = useState(nullForm);
  const [title, setTitle] = useState();
  const [programme, setProgramme] = useState(defaultProgramme)
  const [script, setScript] = useState();
  const [mediaUrl, setMediaUrl] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      get(id);
    } 
  }, [id]);

  useEffect(() => {
    if (selected) {
      console.log(selected)
      setCfgForm((prev) => ({
        ...prev,
        start: selected.start,
        end: selected.end,
      }));
      setTitle(selected.title);
      setScript(selected.script);
      setMediaUrl(selected.mediaUrl);
      setProgramme({ 
        id: selected.progSimple.value, 
        name: selected.progSimple.label
      })
    }
  }, [selected]);

  const handleChange = (key, value) => {
    setCfgForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    if (id) update(id, {title, script, mediaUrl, ...cfgForm});
    else create(programme.id, {title, script, mediaUrl, ...cfgForm});
  };

  const handleApprove = (action) => {
    update(id, { ...cfgForm, script, mediaUrl, status: action });
  };


  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }


  useEffect(() => {
      if (props.isCreated) navigate(PROGRAMME_DETAIL);
    }, [props.isCreated])


  return (
    <section className="container bg-white shadow-lg rounded p-4 my-5 gap-3">

    
          <div className="row align-items-center">
            <div className="col-auto pe-0">
              <StatusBox status={selected?.status} />
            </div>
            <div className="col ps-0">
              <input
                type="text"
                size={1}
                className="form-control border-0"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => handleTitleChange(e)}
              />
              <small className='text-muted ps-1'>@{programme?.name}</small>
            </div>
          </div>

          {(id && selected) && (
          <BootstrapVideoUploader
            mediaUrl={mediaUrl}
            onUpload={(url) => setMediaUrl(url)}
            className="w-100 rounded fixed-height mb-3"
            placeholder="Kéo & thả video vào đây hoặc click để chọn"
            type="video"
          />)}

              {(id && selected) && (
                  <div className="mb-3">
                    <CustomFormInput
                      label="Tóm tắt"
                      as="textarea"
                      rows="10"
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                    />
                  </div>)}
              <DynamicForm form={cfgForm} setForm={setCfgForm} fieldProps={fieldProps} onSubmit={handleSubmit}/>



    </section>
  );
};

const mapStateToProps = (state) => ({
  selected: selectEpisode(state),
  defaultProgramme: state.programme.selected,
  ...state.episode
});

const mapDispatchToProps = (dispatch) => ({
  get: (id) => dispatch(episodeActions.get(id)),
  update: (id, data) => dispatch(episodeActions.update(id, data)),
  create: (progId, data) => dispatch(episodeActions.create(progId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetail);
