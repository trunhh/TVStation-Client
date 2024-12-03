import routeConstants from "../constants/routeConstants"

export const menuLinks = [
    {
        text: 'User Info',
        link: routeConstants.USER_INFO,
        icon: 'fa-solid fa-user'
    },
    {
        text: 'Kế hoạch',
        link: '',
        icon: 'fa-solid fa-calendar',
        subMenu: [
            {
                text: 'Khung năm',
                link: routeConstants.PROGRAM_FRAME_YEAR,
                icon: 'fa-solid fa-calendar-days'
            },
            {
                text: 'Khung tuần',
                link: routeConstants.PROGRAM_FRAME_WEEK,
                icon: 'fa-solid fa-calendar-week'
            },
            {
                text: 'Lịch phát sóng',
                link: routeConstants.PROGRAM_FRAME_BROADCAST,
                icon: 'fa-solid fa-calendar-day'
            }
        ]
    },
    {
        text: 'Tiền kì',
        link: '',
        icon: 'fa-solid fa-pen',
        subMenu: [
            {
                text: 'Tin bài phóng sự',
                link: routeConstants.PRODUCTION_REGISTRATION,
                icon: 'fa-solid fa-pen-ruler'
            },
            {
                text: 'Kịch bản tác phẩm',
                link: routeConstants.SCRIPT_PROGRAM,
                icon: 'fa-solid fa-pen-clip'
            }
        ]
    },
    {
        text: 'Hậu kì',
        link: routeConstants.MEDIA_PROJECT,
        icon: 'fa-solid fa-file-pen',
    }
]