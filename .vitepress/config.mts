import { defineConfig } from 'vitepress';

import { basicsNav } from './basics';
import { browserNav } from './browser';
import { buildToolNav } from './buildTool';
import { frameworkNav } from './framework';

import { v8SideBar } from './browser/v8SideBar';
import { loopSideBar } from './browser/loopSideBar';
import { basicsCSSSideBar } from './basics/cssSideBar';
import { webpackSideBar } from './buildTool/webpackSideBar';
import { securitySideBar } from './browser/securitySideBar';
import { browserBrowserSideBar } from './browser/browserSideBar';

export default defineConfig({
  title: '森弟儿の笔记空间',
  description: 'A VitePress Site',
  outDir: 'docs',
  themeConfig: {
    outline: 'deep',

    nav: [{ text: '首页', link: '/' }, basicsNav, browserNav, buildToolNav, frameworkNav],

    lastUpdated: {
      text: '最后更改时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },

    search: {
      provider: 'local',
    },

    sidebar: {
      '/basics/CSS': basicsCSSSideBar,
      '/browser/browser': browserBrowserSideBar,
      '/browser/v8/': v8SideBar,
      '/browser/loop/': loopSideBar,
      '/browser/security/': securitySideBar,
      'buildTools/Webpack': webpackSideBar,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/ZhaoJiSen/docs' }],

    footer: {
      copyright: 'Copyringht @ 2024 森弟儿',
    },
  },
});
