if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),d={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-74f2ef77"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BCtYuyag.css",revision:null},{url:"assets/index-DlsOgpud.js",revision:null},{url:"firebase-messaging-sw.js",revision:"f0ff823229ee4a296e5d88ba74ceef20"},{url:"index.html",revision:"7feea3fc0c7cd070137eb904f486e0ee"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"img/icons/192x192.png",revision:"54375716ac3c717c45d0fddaf557283f"},{url:"img/icons/512x512.png",revision:"3abd5c0de92780a2a598f457d35dccef"},{url:"manifest.webmanifest",revision:"eb687e286da0a227bf276945efd1bdee"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(png|jpg|jpeg|svg|gif|css|js)/,new e.CacheFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:600})]}),"GET")}));
