import React, { useState, useRef, useEffect } from "react";
import { Modal } from "reactstrap";

import DateRangePicker from "./DateRangePicker";

export default function CustomTuiModal({
  isOpen = false,
  toggle,
  onSubmit,
  submitText = "Save",
  calendars = [],
  schedule,
  startDate,
  endDate
}) {
  const [openSelectCalendars, setOpenSelectCalendars] = useState(false);
  const wrapperSelectCalendarsRef = useRef(null);
  const subjectRef = useRef(null);

  // Initialize with fallback to first calendar or null
  const [calendarId, setCalendarId] = useState(calendars[0]?.id ?? null);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // Click outside handler to close dropdowns
  const handleClick = (e) => {
    if (wrapperSelectCalendarsRef.current?.contains(e.target)) {
      // inside click - do nothing
      return;
    }
    setOpenSelectCalendars(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, []);

  // Sync state when modal opens or schedule/startDate/endDate changes
  useEffect(() => {
    if (!isOpen) return;

    if (schedule) {
      const startVal = schedule.start?.toDate?.() ?? new Date();
      const endVal = schedule.end?.toDate?.() ?? new Date();

      setCalendarId(schedule.calendarId ?? calendars[0]?.id ?? null);
      setTitle(schedule.title ?? "");
      setStart(startVal);
      setEnd(endVal);
    } else if (startDate && endDate) {
      setStart(startDate?.toDate?.() ?? new Date());
      setEnd(endDate?.toDate?.() ?? new Date());
      setTitle("");
      setCalendarId(calendars[0]?.id ?? null);
    } else {
      // reset to defaults if no schedule or dates
      setStart(new Date());
      setEnd(new Date());
      setTitle("");
      setCalendarId(calendars[0]?.id ?? null);
    }
  }, [isOpen, schedule, startDate, endDate, calendars]);

  function reset() {
    setCalendarId(calendars[0]?.id ?? null);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        reset();
      }}
      centered
    >
      <div className="tui-full-calendar-popup-container">
        <div style={{ display: "flex" }}>
          {/* Calendar Selector */}
          <div
            ref={wrapperSelectCalendarsRef}
            className={`tui-full-calendar-popup-section tui-full-calendar-dropdown tui-full-calendar-close tui-full-calendar-section-calendar ${
              openSelectCalendars ? "tui-full-calendar-open" : ""
            }`}
          >
            <button
              onClick={() => setOpenSelectCalendars(!openSelectCalendars)}
              className="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item"
            >
              <span
                className="tui-full-calendar-icon tui-full-calendar-calendar-dot"
                style={{
                  backgroundColor:
                    calendars.find((el) => el.id === calendarId)?.backgroundColor ?? "#000"
                }}
              />
              <span
                id="tui-full-calendar-schedule-calendar"
                className="tui-full-calendar-content"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {calendars.find((el) => el.id === calendarId)?.name ?? "Select calendar"}
              </span>
              <span className="tui-full-calendar-icon tui-full-calendar-dropdown-arrow" />
            </button>
            <ul className="tui-full-calendar-dropdown-menu" style={{ zIndex: 1004 }}>
              {calendars.map((element, i) => (
                <li
                  onClick={() => {
                    setCalendarId(element.id);
                    setOpenSelectCalendars(false);
                  }}
                  key={i}
                  className="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item"
                  data-calendar-id={element.id}
                >
                  <span
                    className="tui-full-calendar-icon tui-full-calendar-calendar-dot"
                    style={{ backgroundColor: element.backgroundColor }}
                  />
                  <span className="tui-full-calendar-content">{element.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <span className="tui-full-calendar-section-date-dash">-</span>
        </div>

        {/* Subject input */}
        <div className="tui-full-calendar-popup-section">
          <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-location">
            <span className="tui-full-calendar-icon tui-full-calendar-ic-title" />
            <input
              ref={subjectRef}
              id="tui-full-calendar-schedule-title"
              className="tui-full-calendar-content"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="tui-full-calendar-popup-section">
          <DateRangePicker
            start={start}
            end={end}
            format="HH:mm dd/MM"
            timePicker={{
              layoutType: "tab",
              inputType: "selectbox"
            }}
            onChange={(dates) => {
              setStart(dates[0]);
              setEnd(dates[1]);
            }}
            autoClose={false}
          />
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            toggle();
            reset();
          }}
          className="tui-full-calendar-button tui-full-calendar-popup-close"
        >
          <span className="tui-full-calendar-icon tui-full-calendar-ic-close" />
        </button>

        {/* Save button */}
        <div className="tui-full-calendar-section-button-save">
          <button
            onClick={() => {
              if (!subjectRef.current.value.trim()) {
                subjectRef.current.focus();
                return;
              }

              const event = {
                calendarId, 
                title,
                start,
                end,
                ...calendars.find((el) => el.id === calendarId)
              };
              onSubmit(event);
            }}
            className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
          >
            <span>{submitText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
