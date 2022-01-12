export default function (ctx) {
    const DEFAULT_LOCALE = 'en-us'
    const appenv = {
        DEFAULT_LOCALE: JSON.stringify(DEFAULT_LOCALE)
    }
    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        boot: [
            'i18n',
            'axios'
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: [
            'app.styl'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            'roboto-font',
            'material-icons',
            'mdi-v5'
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        // framework: 'all', // --- includes everything; for dev only!
        framework: {
            components: [
                'QLayout',
                'QHeader',
                'QDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QSpace',
                'QBtn',
                'QBtnGroup',
                'QIcon',
                'QList',
                'QItem',
                'QItemSection',
                'QItemLabel',
                'QScrollArea',
                'QCheckbox'
            ],

            directives: [
                'ClosePopup'
            ],

            // Quasar plugins
            plugins: [
                'Notify'
            ]

            // iconSet: 'ionicons-v4'
            // lang: 'de' // Quasar language
        },

        supportIE: false,

        build: {
            scopeHoisting: true,
            vueRouterMode: 'history',
            vueCompiler: true,
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            extendWebpack(cfg) {
                cfg.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                })
            }
        },
    }

}