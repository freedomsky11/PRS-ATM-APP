export default {
  debug: false,

  sequelizeLogging: false,

  serviceRoot: '',

  serviceKey: '',

  host: 'localhost',

  port: 9000,

  queuePort: 9001,

  testPort: 9002,

  favicon: 'https://img-cdn.xue.cn/favicon.ico',

  staticCDN: '',

  db: {
    host: 'postgres',
    database: 'flying_pub',
    user: 'postgres',
    password: '39f12851f5275222e8b50fddddf04ee4',
    dialect: 'postgres',
  },

  redis: {
    host: 'redis',
    port: 6379,
    password: 'a863a35d270fceb110f96374d75c219f',
    connectTimeout: 1000 * 3,
  },

  session: {
    key: 'session',
    maxAge: 1000 * 60 * 60 * 24,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  },

  provider: {
    mixin: {
      callbackUrl: `/api/auth/mixin/callback`,
    },
  },

  settings: {
    'site.name': '',
    'site.title': '',
    'site.logo': 'https://img-cdn.xue.cn/17-flying-pub.png',
    'notification.mixin.enabled': true,
    'author.page.enabled': true,
    'subscriptions.enabled': true,
    'filter.enabled': true,
    'filter.type': 'LATEST',
    'filter.popularity.enabled': false,
    'filter.dayRangeOptions': [7, 30],
    'wallet.currencies': ['CNB', 'PRS', 'BOX', 'BTC', 'EOS', 'ETH'],
    'menu.links': [],
    'permission.isPrivate': false,
    'permission.isOnlyPubPrivate': false,
    'permission.denyText': ``,
    'permission.denyActionText': `如何加入？`,
    'permission.denyActionLink': `https://abc.com/如何加入？`,
    'auth.providers': ['mixin'],
    'mixinApp.name': '新生大讲堂',
    'mixinApp.downloadUrl': 'https://www.firesbox.com/app',
    'mixinApp.logo':
      'https://static-assets.xue.cn/images/395b16fecce9f5bca118ee59c3b0ce82abcca800bcf8500eefa1750c3f11aff8',
  },

  auth: {
    tokenKey: '',
    adminList: {
      mixin: [],
    },
    whitelist: {
      mixin: [],
    },
  },

  recommendation: {
    authors: {
      cachedDuration: 60 * 60 * 12,
    },
  },

  postView: {
    enabled: true,
    visible: true,
    ipExpiredDuration: 10 * 60,
  },
};
