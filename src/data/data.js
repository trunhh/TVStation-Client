export const menuLinks = [
    {
        text: 'User Info',
        link: '/user-info',
        icon: 'fa-solid fa-user'
    },
    {
        text: 'Change Password',
        link: '/password-changing',
        icon: 'fa fa-key'
    },
    {
        text: 'Kế hoạch',
        link: '',
        icon: 'fa-solid fa-calendar',
        subMenu: [
            {
                text: 'Khung năm',
                link: '/ProgramFrameYear',
                icon: 'fa-solid fa-calendar-days'
            },
            {
                text: 'Khung tuần',
                link: '/ProgramFrameWeek',
                icon: 'fa-solid fa-calendar-week'
            },
            {
                text: 'Lịch phát sóng',
                link: '/ProgramFrameBroadcast',
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
                link: '/ProductionRegistration',
                icon: 'fa-solid fa-pen-ruler'
            },
            {
                text: 'Kịch bản tác phẩm',
                link: '/ScriptProgram',
                icon: 'fa-solid fa-pen-clip'
            }
        ]
    },
    {
        text: 'Hậu kì',
        link: '/MediaProject',
        icon: 'fa-solid fa-file-pen',
    }
]