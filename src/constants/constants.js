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

export default {
    SectorConst,
    StatusConst,
    ObjectTypeConst
}