if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>i(e,c),l={module:{uri:c},exports:t,require:o};s[c]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-74f2ef77"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BSSJVAJY.js",revision:null},{url:"assets/index-CfRrcmxQ.css",revision:null},{url:"firebase-messaging-sw.js",revision:"00a68141e992dfcabdca8e8105f7b99c"},{url:"index.html",revision:"f4eb8b6ca4393a274abce33bdf13d3bb"},{url:"registerSW.js",revision:"7845c973e8674473b09d4ce75ccbeac4"},{url:"img/icons/192x192.png",revision:"03e4cf194e61388a438209e792d4d896"},{url:"img/icons/512x512.png",revision:"0a12c449b27b28c081403639786aa7b5"},{url:"manifest.webmanifest",revision:"e3c375b09d8a7cf62944854f1a0522ad"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(png|jpg|jpeg|svg|gif|css|js)/,new e.CacheFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:600})]}),"GET")}));