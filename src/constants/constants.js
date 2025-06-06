export const StatusConst = [
    { value: "IN_PROGRESS", label: "Đang thực hiện", style: "info" },
    { value: "WAITING_FOR_APPROVAL", label: "Chờ duyệt", style: "warning" },
    { value: "APPROVED", label: "Đã duyệt", style: "success" },
    { value: "RETURNED", label: "Trả lại", style: "danger" },
    { value: "RETRIEVED", label: "Thu hồi", style: "danger" },
    { value: "CANCELLED", label: "Đã hủy", style: "danger" },
];

export const DurationConst = [
    { value: 0.25, label: "15 phút" },
    { value: 0.5, label: "Nửa tiếng" },
    { value: 0.75, label: "45 phút" },
    { value: 1, label: "1 tiếng" },
    { value: 1.5, label: "1 tiếng rưỡi" },
    { value: 2, label: "2 tiếng" },
]


export const RoleConst = [
    { value: "ADMIN", label: "Admin" },
    { value: "DIRECTOR", label: "Giám đốc" },
    { value: "MANAGER", label: "Quản lý" },
    { value: "REPORTER",  label: "Phóng viên" },
    { value: "SCREENWRITER", label: "Biên kịch" },
    { value: "VIDEOEDITOR", label: "Dựng phim" }
]

export const DayOfWeekConst = [
    { value: "Monday", label: "Thứ hai" },
    { value: "Tuesday", label: "Thứ ba" },
    { value: "Wednesday", label: "Thứ tư" },
    { value: "Thursday", label: "Thứ năm" },
    { value: "Friday", label: "Thứ sáu" },
    { value: "Saturday", label: "Thứ bảy" },
    { value: "Sunday", label: "Chủ nhật" },
]

export const DayOfWeekConst1 = ({id}) => {
  return (
    <datalist id = {id}>
      <option value="Monday">Thứ Hai</option>
      <option value="Tuesday">Thứ Ba</option>
      <option value="Wednesday">Thứ Tư</option>
      <option value="Thursday">Thứ Năm</option>
      <option value="Friday">Thứ Sáu</option>
      <option value="Saturday">Thứ Bảy</option>
      <option value="Sunday">Chủ Nhật</option>
    </datalist>
  );
};

export const ActionConst = {
    "WAITING_FOR_APPROVAL": "Trình lên cấp trên",
    "APPROVED": "Duyệt theo ủy quyền",
    "RETURNED": "Trả lại",
    "RETRIEVED": "Thu hồi",
};

export const RoleActionConst = {
    "REPORTER": {
        "IN_PROGRESS": ["WAITING_FOR_APPROVAL"],
        "WAITING_FOR_APPROVAL": ["RETRIEVED"],
        "APPROVED": ["RETRIEVED"],
        "RETURNED": ["WAITING_FOR_APPROVAL"],
        "RETRIEVED": ["WAITING_FOR_APPROVAL"]
    },
    "MANAGER": {
        "IN_PROGRESS": ["WAITING_FOR_APPROVAL", "APPROVED"],
        "WAITING_FOR_APPROVAL": ["RETURNED", "APPROVED"],
        "APPROVED": ["RETURNED"],
    },
    "DIRECTOR": {
        "IN_PROGRESS": ["APPROVED"],
        "WAITING_FOR_APPROVAL": ["RETURNED", "APPROVED"],
        "APPROVED": ["RETURNED"],
    },
    "ADMIN": {
        "IN_PROGRESS": ["WAITING_FOR_APPROVAL", "APPROVED"],
        "WAITING_FOR_APPROVAL": ["RETRIEVED", "RETURNED", "APPROVED"],
        "APPROVED": ["RETRIVED", "RETURNED"],
        "RETURNED": ["WAITING_FOR_APPROVAL" , "APPROVED"],
        "RETRIEVED": ["WAITING_FOR_APPROVAL" ,"APPROVED"],
    },
};

export default {
    StatusConst,
    ActionConst,
    RoleActionConst
}