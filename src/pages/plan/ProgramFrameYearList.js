import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTuiCalendar from "../../components/BigCalendar/CustomTuiCalendar";
import CustomTuiModal from "../../components/BigCalendar/CustomTuiModal";
import { PROGRAM_FRAME_YEAR_DETAIL } from "../../constants/routeConstants";
import planActions from "../../redux/actions/planActions";

function ProgramFrameYearList(props) {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
      props.getList();
  }, []);


  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    console.log('onBeforeCreateSchedule', event)
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    props.create({...newEvent, channelId: newEvent.calendarId})
  }

  useEffect(() => {
    if (props.selected != null) {
      childRef.current.createSchedule(props.selected);
    }
    setModal(false);
  }, [props.selected]);

  function onBeforeUpdateSchedule(event) {
    if (event.triggerEventName == "click") {
      navigate(`${PROGRAM_FRAME_YEAR_DETAIL}/${event.schedule.id}`);
      return;
    }


    console.log('onBeforeUpdateSchedule', event)

    //props.update(event.schedule.id, event)

  }

  async function handleUpdateSchedule(updateEvent) {
    // props.update(updateEvent.id, updateEvent)
  } 

  function onBeforeDeleteSchedule(event) {
    console.log('onBeforeDeleteSchedule', event)

    // call api
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }


  return (
    <div>
      {props.channelList != null && props.channelList.length > 0 
      && props.eventList != null && props.eventList.length > 0 
      && (
        <CustomTuiCalendar
        ref={childRef}
        {...{
          isReadOnly: false,
          showSlidebar: true,
          showMenu: true,
          useCreationPopup: false,
          // onCreate: () => {
          //   console.log("create that!!!");
          //   childRef.current.getAlert();
          // },
          // createText: "Tao moi",
          calendars: props.channelList,
          schedules: props.eventList,
          onBeforeCreateSchedule,
          onBeforeUpdateSchedule,
          onBeforeDeleteSchedule
        }}
      />

      )}
      
      <CustomTuiModal
        {...{
          isOpen: modal,
          toggle,
          onSubmit:
            event?.triggerEventName === "mouseup"
              ? handleCreateSchedule
              : handleUpdateSchedule,
          submitText: event?.triggerEventName === "mouseup" ? "Save" : "Update",
          calendars: props.channelList,
          schedule: event?.schedule,
          startDate: event?.start,
          endDate: event?.end
        }}
      />
    </div>
  );
}


const mapStateToProps = (state) => ({
    ...state.plan,
    isLoading: state.view.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getList: () => dispatch(planActions.getList()),
    create: (data) => dispatch(planActions.create(data)),
    update: (id, data) => dispatch(planActions.update(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameYearList);
