if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let o={};const t=e=>i(e,c),d={module:{uri:c},exports:o,require:t};s[c]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-74f2ef77"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DJf3sgvn.css",revision:null},{url:"assets/index-sX2bNwRo.js",revision:null},{url:"index.html",revision:"ace1cd19bda74d14b2b196fc3971ab79"},{url:"registerSW.js",revision:"93251d17f71066cab7a46ec720064e99"},{url:"img/icons/android-chrome-192x192.png",revision:"f130a0b70e386170cf6f011c0ca8c4f4"},{url:"img/icons/android-chrome-512x512.png",revision:"0ff1bc4d14e5c9abcacba7c600d97814"},{url:"manifest.webmanifest",revision:"6e3f790ce8ca8cd75415ee526b755c10"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(png|jpg|jpeg|svg|gif|css|js)/,new e.CacheFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:600})]}),"GET")}));
