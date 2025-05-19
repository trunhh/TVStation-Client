import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import DatePicker from "tui-date-picker";

import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const TuiDateRangePicker = forwardRef(({ start, end, style, onChange, ...rest }, ref) => {
  const rangePickerRef = useRef(null);
  const startPickerContainerRef = useRef(null);
  const startPickerInputRef = useRef(null);
  const endPickerContainerRef = useRef(null);
  const endPickerInputRef = useRef(null);

  // Create the picker only once on mount
  useLayoutEffect(() => {
    const instance = DatePicker.createRangePicker({
      ...rest,
      startpicker: {
        date: start || new Date(),
        input: startPickerInputRef.current,
        container: startPickerContainerRef.current
      },
      endpicker: {
        date: end || new Date(),
        input: endPickerInputRef.current,
        container: endPickerContainerRef.current
      }
    });

    rangePickerRef.current = instance;

    const onStartChange = () => {
      onChange?.([instance.getStartDate(), instance.getEndDate()]);
    };

    const onEndChange = () => {
      onChange?.([instance.getStartDate(), instance.getEndDate()]);
    };

    instance.on("change:start", onStartChange);
    instance.on("change:end", onEndChange);

    return () => {
      instance.off("change:start", onStartChange);
      instance.off("change:end", onEndChange);
      instance.destroy();
      rangePickerRef.current = null;
    };
  }, []); // run only once

  // Sync external start/end prop changes into picker only if different
  useEffect(() => {
    if (!rangePickerRef.current) return;

    const currentStart = rangePickerRef.current.getStartDate();
    if (start && +currentStart !== +start) {
      rangePickerRef.current.setStartDate(start);
    }
  }, [start]);

  useEffect(() => {
    if (!rangePickerRef.current) return;

    const currentEnd = rangePickerRef.current.getEndDate();
    if (end && +currentEnd !== +end) {
      rangePickerRef.current.setEndDate(end);
    }
  }, [end]);

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    setStartDate(date) {
      rangePickerRef.current?.setStartDate(date);
    },
    setEndDate(date) {
      rangePickerRef.current?.setEndDate(date);
    },
    setDates(startDate, endDate) {
      rangePickerRef.current?.setStartDate(startDate);
      rangePickerRef.current?.setEndDate(endDate);
    }
  }));

  return (
    <div style={style}>
      <div className="tui-full-calendar-popup-section">
        <div
          style={{ width: 224.5 }}
          className="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date"
        >
          <span className="tui-full-calendar-icon tui-full-calendar-ic-date" />
          <input
            className="tui-full-calendar-content"
            placeholder="Start date"
            id="startpicker-input"
            ref={startPickerInputRef}
            readOnly // optional: tui-date-picker manages input directly
          />
          <div id="startpicker-container" ref={startPickerContainerRef} />
        </div>
        <span className="tui-full-calendar-section-date-dash">-</span>
        <div
          style={{ width: 224.5 }}
          className="tui-full-calendar-popup-section-item tui-full-calendar-section-end-date"
        >
          <span className="tui-full-calendar-icon tui-full-calendar-ic-date" />
          <input
            className="tui-full-calendar-content"
            placeholder="End date"
            id="endpicker-input"
            ref={endPickerInputRef}
            readOnly // optional
          />
          <div id="endpicker-container" ref={endPickerContainerRef} />
        </div>
      </div>
    </div>
  );
});

export default TuiDateRangePicker;
