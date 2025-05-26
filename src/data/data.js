import routeConstants from "../constants/routeConstants"

export const menuLinks = [
    {
        text: 'Trang chủ',
        link:'/',
    },
    {
        text: 'Chương trình',
        link: routeConstants.PROGRAMME,
    },
    {
        text: 'Lịch phát sóng',
        link: routeConstants.EPISODE,
    },
    {
        text: 'Quản lý',
        link: '',
        subMenu: [
            {
                text: 'Phòng ban',
                link: routeConstants.ADMIN_SITEMAP,
            },
            {
                text: 'Kênh phát sóng',
                link: routeConstants.ADMIN_CHANNEL,
            },
            {
                text: 'Nhân sự',
                link: routeConstants.ADMIN_USERS,
            },

        ]
    }
]