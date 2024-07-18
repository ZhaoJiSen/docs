import { defineConfig } from 'vitepress';

import { backEnd } from './backend';
import { basicsNav } from './basics';
import { browserNav } from './browser';
import { buildToolNav } from './buildTool';
import { frameworkNav } from './framework';

import { v8SideBar } from './browser/v8SideBar';
import { vueSideBar } from './framework/vueSideBar';
import { loopSideBar } from './browser/loopSideBar';
import { basicsJSSideBar } from './basics/jsSideBar';
import { basicsCSSSideBar } from './basics/cssSideBar';
import { webpackSideBar } from './buildTool/webpackSideBar';
import { securitySideBar } from './browser/securitySideBar';
import { browserBrowserSideBar } from './browser/browserSideBar';

export default defineConfig({
	title: '秘密の花園',
	description: 'A VitePress Site',
	outDir: 'docs',
	base: '/docs/',
	themeConfig: {
		logo: '/img/logo.jpg',
		outline: 'deep',
		nav: [{ text: '首页', link: '/' }, basicsNav, browserNav, buildToolNav, frameworkNav, backEnd],

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
			'/basics/JavaScript': basicsJSSideBar,
			'/browser/browser': browserBrowserSideBar,
			'/browser/v8/': v8SideBar,
			'/framework/Vue': vueSideBar,
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
