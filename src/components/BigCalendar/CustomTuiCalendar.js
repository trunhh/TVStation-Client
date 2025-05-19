import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback
} from "react";
import TuiCalendar from "tui-calendar";
import moment from "moment";
import "tui-calendar/dist/tui-calendar.css";
import "./styles.css";

const CustomTuiCalendar = forwardRef(
  (
    {
      height = "800px",
      defaultView = "week",
      calendars = [],
      schedules = [],
      isReadOnly = true,
      showSlidebar = false,
      showMenu = false,
      onCreate,
      createText = "New schedule",
      onBeforeCreateSchedule = () => false,
      onBeforeUpdateSchedule = () => false,
      onBeforeDeleteSchedule = () => false,
      ...rest
    },
    ref
  ) => {
    const calendarInstRef = useRef(null);
    const tuiRef = useRef(null);
    const wrapperRef = useRef(null);
    
    const [open, setOpen] = useState(false);
    const [renderRange, setRenderRange] = useState("");
    const [workweek, setWorkweek] = useState(true);
    const [narrowWeekend, setNarrowWeekend] = useState(true);
    const [startDayOfWeek, setStartDayOfWeek] = useState(1);
    const [viewType, setViewType] = useState("Weekly");
    const [checkedCalendars, setCheckedCalendars] = useState(
      calendars.map(cal => ({ ...cal, isChecked: true }))
    );
    const [filteredSchedules, setFilteredSchedules] = useState(schedules);

    // Initialize calendar instance
    const initializeCalendar = useCallback(() => {
      if (!tuiRef.current) return;

      calendarInstRef.current = new TuiCalendar(tuiRef.current, {
        defaultView,
        useDetailPopup: true,
        useCreationPopup: !isReadOnly,
        taskView: false,
        scheduleView: true,
        template: getTemplateConfig(),
        calendars,
        ...rest
      });

      setRenderRangeText();
      updateCalendarSchedules(filteredSchedules);

      // Set up event handlers
      calendarInstRef.current.on("beforeCreateSchedule", onBeforeCreateSchedule);
      calendarInstRef.current.on("beforeUpdateSchedule", onBeforeUpdateSchedule);
      calendarInstRef.current.on("beforeDeleteSchedule", onBeforeDeleteSchedule);
      
      calendarInstRef.current.on("clickDayname", (event) => {
        if (calendarInstRef.current.getViewName() === "week") {
          calendarInstRef.current.setDate(new Date(event.date));
          calendarInstRef.current.changeView("day", true);
        }
      });

      calendarInstRef.current.on("afterRenderSchedule", () => {
        setRenderRangeText();
      });

      return () => {
        calendarInstRef.current?.destroy();
      };
    }, [defaultView, isReadOnly]);

    // Initialize on mount
    useEffect(() => {
      initializeCalendar();
      return () => calendarInstRef.current?.destroy();
    }, [initializeCalendar]);

    // Handle prop updates
    useEffect(() => {
      if (!calendarInstRef.current) return;

      // Update calendars when prop changes
      calendarInstRef.current.setCalendars(calendars);
      setCheckedCalendars(calendars.map(cal => ({ 
        ...cal, 
        isChecked: checkedCalendars.some(c => c.id === cal.id && c.isChecked) || true 
      })))

      // Update schedules when prop changes
      const newFilteredSchedules = filterSchedulesByCheckedCalendars(schedules, checkedCalendars);
      setFilteredSchedules(newFilteredSchedules);
      updateCalendarSchedules(newFilteredSchedules);
    }, [calendars, schedules]);

    // Update calendar schedules
    const updateCalendarSchedules = (schedulesToRender) => {
      if (!calendarInstRef.current) return;
      calendarInstRef.current.clear();
      calendarInstRef.current.createSchedules(schedulesToRender);
      calendarInstRef.current.render();
    };

    // Filter schedules based on checked calendars
    const filterSchedulesByCheckedCalendars = (schedules, calendars) => {
      const hiddenCalendarIds = calendars
        .filter(cal => !cal.isChecked)
        .map(cal => cal.id);
      
      return schedules.filter(schedule => 
        !hiddenCalendarIds.includes(schedule.calendarId)
      );
    };

    // Set render range text
    const setRenderRangeText = () => {
      if (!calendarInstRef.current) return;

      const options = calendarInstRef.current.getOptions();
      const viewName = calendarInstRef.current.getViewName();
      let html = [];

      if (viewName === "day") {
        html.push(currentCalendarDate("YYYY.MM.DD"));
      } else if (viewName === "month" && (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
        html.push(currentCalendarDate("YYYY.MM"));
      } else {
        html.push(moment(calendarInstRef.current.getDateRangeStart().getTime()).format("YYYY.MM.DD"));
        html.push(" ~ ");
        html.push(moment(calendarInstRef.current.getDateRangeEnd().getTime()).format(" MM.DD"));
      }

      setRenderRange(html.join(""));
    };

    // Get current calendar date
    const currentCalendarDate = (format) => {
      const currentDate = calendarInstRef.current?.getDate();
      if (!currentDate) return "";
      return moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()]).format(format);
    };

    // Calendar template configuration
    const getTemplateConfig = () => ({
      milestone: (schedule) => (
        `<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ${schedule.bgColor}">${schedule.title}</span>`
      ),
      milestoneTitle: () => '<span class="tui-full-calendar-left-content">MILESTONE</span>',
      time: (schedule) => getTimeTemplate(schedule, false),
      allday: (schedule) => getTimeTemplate(schedule, true),
      popupSave: () => "Save",
      popupUpdate: () => "Update",
      // ... (include other template methods as needed)
    });

    // Time template helper
    const getTimeTemplate = (schedule, isAllDay) => {
      const html = [];
      if (!isAllDay) {
        html.push(`<strong>${moment(schedule.start.toDate()).format("HH:mm")}</strong> `);
      }
      if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span> Private');
      } else {
        if (schedule.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule.attendees?.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(` ${schedule.title}`);
      }
      return html.join("");
    };

    // Handle calendar checkbox changes
    const handleAllChecked = (event) => {
      const updatedCalendars = checkedCalendars.map(cal => ({
        ...cal,
        isChecked: event.target.checked
      }));
      setCheckedCalendars(updatedCalendars);
      updateFilteredSchedules(updatedCalendars);
    };

    const handleCheckChildElement = (event) => {
      const updatedCalendars = checkedCalendars.map(cal => 
        cal.id === event.target.value 
          ? { ...cal, isChecked: event.target.checked } 
          : cal
      );
      setCheckedCalendars(updatedCalendars);
      updateFilteredSchedules(updatedCalendars);
    };

    const updateFilteredSchedules = (calendarsToCheck) => {
      const newFilteredSchedules = filterSchedulesByCheckedCalendars(schedules, calendarsToCheck);
      setFilteredSchedules(newFilteredSchedules);
      updateCalendarSchedules(newFilteredSchedules);
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      createSchedule: (schedule) => {
        calendarInstRef.current.createSchedules([schedule]);
        setFilteredSchedules(prev => [...prev, schedule]);
      },
      updateSchedule: (schedule, changes) => {
        calendarInstRef.current.updateSchedule(schedule.id, schedule.calendarId, changes);
        setFilteredSchedules(prev => 
          prev.map(item => item.id === schedule.id ? { ...item, ...changes } : item)
        );
      },
      deleteSchedule: (schedule) => {
        calendarInstRef.current.deleteSchedule(schedule.id, schedule.calendarId);
        setFilteredSchedules(prev => prev.filter(item => item.id !== schedule.id));
      },
      getInstance: () => calendarInstRef.current
    }));

    // View change handlers
    const changeView = (view, displayName) => {
      calendarInstRef.current.changeView(view, true);
      setViewType(displayName);
      setOpen(false);
    };

    const toggleOption = (option, setter) => {
      const newValue = !option;
      setter(newValue);
      calendarInstRef.current.setOptions({
        month: { [option]: newValue },
        week: { [option]: newValue }
      }, true);
      calendarInstRef.current.render();
      setOpen(false);
    };

    return (
      <div className="tui-calendar-container">
        {showSlidebar && (
          <div id="lnb">
            {onCreate && (
              <div className="lnb-new-schedule">
                <button
                  id="btn-new-schedule"
                  type="button"
                  className="btn btn-default btn-block lnb-new-schedule-btn"
                  onClick={onCreate}
                >
                  {createText}
                </button>
              </div>
            )}
            <div id="lnb-calendars" className="lnb-calendars">
              <div>
                <div className="lnb-calendars-item">
                  <label>
                    <input
                      className="tui-full-calendar-checkbox-square"
                      type="checkbox"
                      checked={checkedCalendars.every(cal => cal.isChecked)}
                      onChange={handleAllChecked}
                    />
                    <span />
                    <strong>View all</strong>
                  </label>
                </div>
              </div>
              <div id="calendarList" className="lnb-calendars-d1">
                {checkedCalendars.map((calendar) => (
                  <div key={calendar.id} className="lnb-calendars-item">
                    <label>
                      <input
                        type="checkbox"
                        className="tui-full-calendar-checkbox-round"
                        value={calendar.id}
                        checked={calendar.isChecked}
                        onChange={handleCheckChildElement}
                      />
                      <span
                        style={{
                          borderColor: calendar.backgroundColor,
                          backgroundColor: calendar.isChecked
                            ? calendar.backgroundColor
                            : "transparent"
                        }}
                      />
                      <span>{calendar.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div id="right" style={{ left: !showSlidebar && 0 }}>
          {showMenu && (
            <div id="menu">
              <span
                ref={wrapperRef}
                className={`dropdown ${open && "open"}`}
              >
                <button
                  className="btn btn-default btn-sm dropdown-toggle"
                  type="button"
                  onClick={() => setOpen(!open)}
                >
                  <i className="calendar-icon ic_view_week" />
                  <span>{viewType}</span>&nbsp;
                  <i className="calendar-icon tui-full-calendar-dropdown-arrow" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/" onClick={(e) => {
                      e.preventDefault();
                      changeView("day", "Ngày");
                    }}>
                      <i className="calendar-icon ic_view_day" /> Daily
                    </a>
                  </li>
                  <li>
                    <a href="/" onClick={(e) => {
                      e.preventDefault();
                      changeView("week", "Tuần");
                    }}>
                      <i className="calendar-icon ic_view_week" /> Weekly
                    </a>
                  </li>
                  <li>
                    <a href="/" onClick={(e) => {
                      e.preventDefault();
                      calendarInstRef.current.setOptions({ month: { visibleWeeksCount: 6 } }, true);
                      changeView("month", "Tháng");
                    }}>
                      <i className="calendar-icon ic_view_month" /> Month
                    </a>
                  </li>
                  <li className="dropdown-divider" />
                  <li>
                    <a href="/" onClick={(e) => {
                      e.preventDefault();
                      toggleOption(workweek, setWorkweek);
                    }}>
                      <input
                        type="checkbox"
                        className="tui-full-calendar-checkbox-square"
                        checked={workweek}
                        readOnly
                      />
                      <span className="checkbox-title" />
                      Show weekends
                    </a>
                  </li>
                </ul>
              </span>

              <span id="menu-navi">
                <button
                  type="button"
                  className="btn btn-default btn-sm move-today"
                  onClick={() => {
                    calendarInstRef.current.today();
                    setRenderRangeText();
                  }}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm move-day"
                  onClick={() => {
                    calendarInstRef.current.prev();
                    setRenderRangeText();
                  }}
                >
                  <i className="calendar-icon ic-arrow-line-left" />
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm move-day"
                  onClick={() => {
                    calendarInstRef.current.next();
                    setRenderRangeText();
                  }}
                >
                  <i className="calendar-icon ic-arrow-line-right" />
                </button>
              </span>
              <span id="renderRange" className="render-range">
                {renderRange}
              </span>
            </div>
          )}
          <div ref={tuiRef} style={{ height }} />
        </div>
      </div>
    );
  }
);

export default CustomTuiCalendar;