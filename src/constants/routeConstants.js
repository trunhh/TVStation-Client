export const SIGN_IN = "/SignIn"
export const SIGN_UP = "/SignUp"
export const USER_INFO = "/User"
export const PROGRAMME = "/Programme"
export const PROGRAMME_DETAIL = "/Programme/Detail"
export const EPISODE = "/Episode"
export const EPISODE_DETAIL = "/Episode/Detail"
export const ADMIN = "/Admin/General"
export const ADMIN_USER = "/Admin/User"

export const MenuLinks = [
    {
        text: 'Trang chủ',
        link:'/',
    },
    {
        text: 'Chương trình',
        link: PROGRAMME,
    },
    {
        text: 'Lịch phát sóng',
        link: EPISODE,
    },
    {
        text: 'Quản lý',
        link: '',
        subMenu: [
            {
                text: 'Chung',
                link: ADMIN,
            },
            {
                text: 'Nhân sự',
                link: ADMIN_USER,
            },

        ]
    }
]

export default {
    SIGN_IN, SIGN_UP,
    USER_INFO,
    PROGRAMME, PROGRAMME_DETAIL,
    EPISODE, EPISODE_DETAIL,
    ADMIN, ADMIN_USER
}