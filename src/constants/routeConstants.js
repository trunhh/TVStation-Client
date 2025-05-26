export const SIGN_IN = "/SignIn"
export const USER_INFO = "/User"
export const PROGRAMME = "/Programme"
export const PROGRAMME_DETAIL = "/Programme/Detail"
export const EPISODE = "/Episode"
export const EPISODE_DETAIL = "/Episode/Detail"
export const ADMIN = "/Admin"
export const ADMIN_SITEMAP = "/Admin/SiteMap"
export const ADMIN_CHANNEL = "/Admin/Channel"
export const ADMIN_USER = "/Admin/User"

export const MenuLinks = [
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
                link: routeConstants.ADMIN_USER,
            },

        ]
    }
]

export default {
    SIGN_IN,
    USER_INFO,
    PROGRAMME, PROGRAMME_DETAIL,
    EPISODE, EPISODE_DETAIL,
    ADMIN_SITEMAP, ADMIN_CHANNEL, ADMIN_USER
}