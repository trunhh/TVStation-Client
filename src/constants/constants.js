export const PAGE_SIZE = 10

export const ObjectTypeConst = [
    { value: "PRODUCTION_REGISTRATION", label: "Tin bài phóng sự"},
    { value: "SCRIPT_PROGRAM", label: "Kịch bản tác phẩm"}
]

export const SectorConst = [
    { value: "TV", label: "Truyền hình" },
    { value: "BROADCAST", label: "Phát thanh" }
];

export const StatusConst = [
    { value: "IN_PROGRESS", label: "Đang thực hiện" },
    { value: "WAITING_FOR_APPROVAL", label: "Chờ xác nhận" },
    { value: "APPROVED", label: "Đã xác nhận" },
    { value: "RETURNED", label: "Trả lại" },
    { value: "RETRIEVED", label: "Thu hồi" },
    { value: "CANCELLED", label: "Đã hủy" }
];

export const GenreConst = [
    { value: "NEWS", label: "Bản tin" },
    { value: "PROGRAM", label: "Chương trình" },
    { value: "WEATHER_FORECAST", label: "Dự báo thời tiết" },
    { value: "MOVIE", label: "Phim lẻ" },
    { value: "TV_SHOWS", label: "Phim bộ" },
    { value: "DOCUMENTARY", label: "Phim tài liệu" },
    { value: "REPORTS", label: "Phóng sự" },
    { value: "PROMOTION", label: "Quảng cáo" }
]

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
    PAGE_SIZE,
    SectorConst,
    StatusConst,
    ObjectTypeConst,
    GenreConst,
    ActionConst,
    RoleActionConst
}