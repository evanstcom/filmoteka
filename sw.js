if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-74f2ef77"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BdoxJhKU.css",revision:null},{url:"assets/index-BQF3s2Yv.js",revision:null},{url:"index.html",revision:"47c4f4513e10179809c5d82783fb0090"},{url:"registerSW.js",revision:"93251d17f71066cab7a46ec720064e99"},{url:"img/icons/192x192.png",revision:"03e4cf194e61388a438209e792d4d896"},{url:"img/icons/512x512.png",revision:"0a12c449b27b28c081403639786aa7b5"},{url:"manifest.webmanifest",revision:"e3c375b09d8a7cf62944854f1a0522ad"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(png|jpg|jpeg|svg|gif|css|js)/,new e.CacheFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:600})]}),"GET")}));
