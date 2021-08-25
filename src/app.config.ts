export default {
  pages: [
    'pages/login/preindex',
    'pages/login/index',
    'pages/login/phone_register',
    'pages/index/index',
    //'pages/project/index',
    // 'pages/daily/index',
    // 'pages/daily/dailyview',
    // 'pages/daily/dailyedit',
    // 'pages/stakeholder/index',
    // 'pages/stakeholder/edit',
    // 'pages/stakeholder/view',
    // 'pages/safetycontent/index',
    // 'pages/safetycontent/sign',
    // 'pages/safetycontent/next',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  //  分包路径
  subPackages: [
    {
      root: 'packageA',
      pages: [
        'pages/safetycontent/index',
        'pages/safetycontent/sign',
        'pages/safetycontent/next',
        'pages/safetycontent/view',
      ],
    },
    {
      root: 'packageB',
      pages: [
        'pages/stakeholder/index',
        'pages/stakeholder/edit',
        'pages/stakeholder/view',
      ],
    },
    {
      root: 'packageC',
      pages: [
        'pages/daily/index',
        'pages/daily/dailyview',
        'pages/daily/dailyedit',
      ],
    },
    {
      root: 'packageD',
      pages: ['pages/project/index'],
    },
  ],
  independent: true,
}
