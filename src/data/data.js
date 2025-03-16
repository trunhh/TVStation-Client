import routeConstants from "../constants/routeConstants"

export const menuLinks = [
    {
        text: 'Dashboard',
        link:'/',
    },
    {
        text: 'Kế hoạch',
        link: '',
        subMenu: [
            {
                text: 'Khung năm',
                link: routeConstants.PROGRAM_FRAME_YEAR,
            },
            {
                text: 'Khung tuần',
                link: routeConstants.PROGRAM_FRAME_WEEK,
            },
            {
                text: 'Lịch phát sóng',
                link: routeConstants.PROGRAM_FRAME_BROADCAST,
            }
        ]
    },
    {
        text: 'Tiền kì',
        link: '',
        subMenu: [
            {
                text: 'Tin bài phóng sự',
                link: routeConstants.PRODUCTION_REGISTRATION,
            },
            {
                text: 'Kịch bản tác phẩm',
                link: routeConstants.SCRIPT_PROGRAM,
            }
        ]
    },
    {
        text: 'Hậu kì',
        link: routeConstants.MEDIA_PROJECT,
    }
]