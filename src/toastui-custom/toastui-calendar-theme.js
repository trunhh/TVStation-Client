const CommonTheme = {
  border: '0.041667rem solid #e5e5e5',
  backgroundColor: 'white',
  holiday: {
    color: '#ff4040'
  },
  saturday: {
    color: '#333'
  },
  dayName: {
    color: '#333'
  },
  today: {
    color: '#fff'
  },
  gridSelection: {
    backgroundColor: 'rgba(81, 92, 230, 0.05)',
    border: '0.041667rem solid #515ce6'
  }
};
const WeekTheme = {
  dayName: {
    borderLeft: 'none',
    borderTop: '0.041667rem solid #e5e5e5',
    borderBottom: '0.041667rem solid #e5e5e5',
    backgroundColor: 'inherit'
  },
  weekend: {
    backgroundColor: 'inherit'
  },
  today: {
    color: 'inherit',
    backgroundColor: 'rgba(81, 92, 230, 0.05)'
  },
  pastDay: {
    color: '#bbb'
  },
  panelResizer: {
    border: '0.041667rem solid #e5e5e5'
  },
  dayGrid: {
    borderRight: '0.041667rem solid #e5e5e5',
    backgroundColor: 'inherit'
  },
  dayGridLeft: {
    borderRight: '0.041667rem solid #e5e5e5',
    backgroundColor: 'inherit',
    width: '3rem'
  },
  timeGrid: {
    borderRight: '0.041667rem solid #e5e5e5'
  },
  timeGridLeft: {
    backgroundColor: 'inherit',
    borderRight: '0.041667rem solid #e5e5e5',
    width: '3rem'
  },
  timeGridLeftAdditionalTimezone: {
    backgroundColor: 'white'
  },
  timeGridHalfHourLine: {
    borderBottom: 'none'
  },
  timeGridHourLine: {
    borderBottom: '0.041667rem solid #e5e5e5'
  },
  nowIndicatorLabel: {
    color: '#515ce6'
  },
  nowIndicatorPast: {
    border: '0.041667rem dashed #515ce6'
  },
  nowIndicatorBullet: {
    backgroundColor: '#515ce6'
  },
  nowIndicatorToday: {
    border: '0.041667rem solid #515ce6'
  },
  nowIndicatorFuture: {
    border: 'none'
  },
  pastTime: {
    color: '#bbb'
  },
  futureTime: {
    color: '#333'
  },
  gridSelection: {
    color: '#515ce6'
  }
};
const MonthTheme = {
  dayName: {
    borderLeft: 'none',
    backgroundColor: 'inherit'
  },
  holidayExceptThisMonth: {
    color: 'rgba(255, 64, 64, 0.4)'
  },
  dayExceptThisMonth: {
    color: 'rgba(51, 51, 51, 0.4)'
  },
  weekend: {
    backgroundColor: 'inherit'
  },
  moreView: {
    border: '0.041667rem solid #d5d5d5',
    boxShadow: '0 0.083333rem 0.25rem 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: null,
    height: null
  },
  gridCell: {
    headerHeight: '1.291667rem',
    footerHeight: null
  },
  moreViewTitle: {
    backgroundColor: 'inherit'
  }
};

export const customTheme = {
  common: CommonTheme,
  week: WeekTheme,
  month: MonthTheme,
}

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
export const attendees = [
  {
    id: "1",
    name: "Chin"
  },
  { id: "2", name: "Khanh" },
  { id: "3", name: "Linh" },
  { id: "4", name: "Hai" }
];


export const customTemplate = {
  popupIsAllday: function () {
    return 'All day?';
  },
  popupStateFree: function () {
    return '🏝️ Free';
  },
  popupStateBusy: function () {
    return '🔥 Busy';
  },
  titlePlaceholder: function () {
    return 'Enter title';
  },
  locationPlaceholder: function () {
    return 'Enter location';
  },
  startDatePlaceholder: function () {
    return 'Start date';
  },
  endDatePlaceholder: function () {
    return 'End date';
  },
  popupSave: function () {
    return 'Add Event';
  },
  popupUpdate: function () {
    return 'Update Event';
  },
  popupEdit: function () {
    return 'Modify';
  },
  popupDelete: function () {
    return 'Remove';
  },
  popupDetailTitle: function (data) {
    return 'Detail of ' + data.title;
  },
}