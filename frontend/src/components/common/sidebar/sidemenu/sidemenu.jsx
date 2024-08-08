export const MENUITEMS = [
    {
        menutitle: '',
        Items: [
            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Главная',
                path: `${import.meta.env.BASE_URL}dashboards/crm`
            },
            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Обучение',
                path: `${import.meta.env.BASE_URL}learning`
            },
            {
                title: "Заработать",
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="side-menu__icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                ),
                badge: '',
                badgetxt: '12',
                class: 'badge bg-warning-transparent ms-2',
                type: "sub",
                selected: false,
                active: false,
                children: [
                    {
                        path: `${import.meta.env.BASE_URL}serf`,
                        title: "Серфинг",
                        type: "link",
                        active: false,
                        selected: false,
                    },
                    {
                        path: `${import.meta.env.BASE_URL}serf-video`,
                        title: "Видео",
                        type: "link",
                        selected: false,
                        active: false,
                    },
                ],
            }
        ]
    },
    {
        menutitle: "",
        Items: [

            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Рекламировать',
                path: `${import.meta.env.BASE_URL}adv`,
            },
            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Кошелек',
                path: `${import.meta.env.BASE_URL}wallet`,
            }, {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Мои рефералы',
                path: `${import.meta.env.BASE_URL}referals`,
            },
            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Блог',
                badge: '',
                badgetxt: '1',
                class: 'badge bg-warning-transparent ms-2',
                path: `${import.meta.env.BASE_URL}blog`,
            },
            {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Чат',
                badge: '',
                badgetxt: '3',
                class: 'badge bg-warning-transparent ms-2',
                path: `${import.meta.env.BASE_URL}chat`,
            }, {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Настройки',
                path: `${import.meta.env.BASE_URL}settings`,
            }, {
                icon: (<i className="side-menu__icon bx bx-home"></i>),
                type: 'link',
                Name: '',
                active: false,
                selected: false,
                title: 'Выход',
                path: `${import.meta.env.BASE_URL}quit`,
            }
        ],
    },

];
