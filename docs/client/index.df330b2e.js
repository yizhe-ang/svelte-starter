import{S as s,i as t,s as n,e,t as c,c as a,a as l,b as h,d as r,f as v,g as o,h as i,j as p,n as d,k as f,l as m,m as g,o as u,p as M,q as x,r as V,u as z,v as $}from"./client.0a49f92d.js";function w(s){let t,n,f,m;return{c(){t=e("p"),n=c("I have been here for "),f=c(s[0]),m=c(" seconds."),this.h()},l(e){t=a(e,"P",{class:!0});var c=l(t);n=h(c,"I have been here for "),f=h(c,s[0]),m=h(c," seconds."),c.forEach(r),this.h()},h(){v(t,"class","svelte-1mp1l7x")},m(s,e){o(s,t,e),i(t,n),i(t,f),i(t,m)},p(s,[t]){1&t&&p(f,s[0])},i:d,o:d,d(s){s&&r(t)}}}function k(s,t,n){let e=0;return setInterval(()=>n(0,e+=1),1e3),[e]}class H extends s{constructor(s){super(),t(this,s,k,w,n,{})}}var L=[{name:"Russell",pet:"Smokey"},{name:"Amelia",pet:"Lennie"}];function S(s,t,n){const e=s.slice();return e[0]=t[n].name,e[1]=t[n].pet,e}function b(s){let t,n,p,f,m,g,u=s[0]+"",M=s[1]+"";return{c(){t=e("p"),n=c(u),p=c(" has\n    "),f=e("strong"),m=c(M),g=c("."),this.h()},l(s){t=a(s,"P",{});var e=l(t);n=h(e,u),p=h(e," has\n    "),f=a(e,"STRONG",{class:!0});var c=l(f);m=h(c,M),g=h(c,"."),c.forEach(r),e.forEach(r),this.h()},h(){v(f,"class","svelte-1scn1di")},m(s,e){o(s,t,e),i(t,n),i(t,p),i(t,f),i(f,m),i(f,g)},p:d,d(s){s&&r(t)}}}function y(s){let t,n,p,d,w,k,y,E,I,C,G=L,j=[];for(let t=0;t<G.length;t+=1)j[t]=b(S(s,G,t));const A=new H({});return{c(){t=e("a"),n=f(),p=e("h1"),d=c("Hello!"),w=f();for(let s=0;s<j.length;s+=1)j[s].c();k=f(),y=e("img"),I=f(),m(A.$$.fragment),this.h()},l(s){t=a(s,"A",{class:!0,href:!0}),l(t).forEach(r),n=g(s),p=a(s,"H1",{class:!0});var e=l(p);d=h(e,"Hello!"),e.forEach(r),w=g(s);for(let t=0;t<j.length;t+=1)j[t].l(s);k=g(s),y=a(s,"IMG",{alt:!0,src:!0,class:!0}),I=g(s),u(A.$$.fragment,s),this.h()},h(){v(t,"class","wordmark"),v(t,"href","https://pudding.cool"),v(p,"class","svelte-1scn1di"),v(y,"alt","smokey"),y.src!==(E="assets/smokey.jpg")&&v(y,"src","assets/smokey.jpg"),v(y,"class","svelte-1scn1di")},m(s,e){o(s,t,e),t.innerHTML='<?xml version="1.0" encoding="utf-8"?>\n\x3c!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<svg version="1.1" id="wordmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 192.6 50" style="enable-background:new 0 0 192.6 50;" xml:space="preserve">\n<g>\n\t<path class="st0" d="M150.1,9.5c1.5,0,2.8,1.3,2.8,2.8s-1.3,2.8-2.8,2.8s-2.8-1.3-2.8-2.8S148.6,9.5,150.1,9.5z"/>\n\t<path class="st0" d="M147.2,17.3h5.6v18.2h-5.6V17.3z"/>\n\t<path class="st0" d="M77.1,9.5h-1.9h-7v19.3v6.7h5.6v-6.7v-1.4h1.4h1.9c4.9,0,8.9-4,8.9-8.9S82.1,9.5,77.1,9.5z M77.1,21.8h-1.9\n\t\th-1.4v-1.4v-3.8v-1.4h1.4h1.9c1.8,0,3.3,1.5,3.3,3.3S79,21.8,77.1,21.8z"/>\n\t<path class="st0" d="M105.7,17.6h-5.6v8.9c0,1.8-1.5,3.3-3.3,3.3s-3.3-1.5-3.3-3.3v-8.9h-5.6v8.9c0,4.9,4,8.9,8.9,8.9\n\t\ts8.9-4,8.9-8.9V17.6z"/>\n\t<path class="st0" d="M164.1,17.6c-4.9,0-8.9,4-8.9,8.9v8.9h5.6v-8.9c0-1.8,1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3v8.9h5.6v-8.9\n\t\tC173,21.6,169,17.6,164.1,17.6z"/>\n\t<path class="st0" d="M119.7,16.2v1.4h-1.4h-1.9c-4.9,0-8.9,4-8.9,8.9s4,8.9,8.9,8.9h1.9h7V16.2V9.5l-5.6,3.3\n\t\tC119.7,12.8,119.7,16.2,119.7,16.2z M119.8,24.6v3.8v1.4h-1.4h-1.9c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3h1.9h1.4V24.6z"/>\n\t<path class="st0" d="M139.3,16.2v1.4h-1.4H136c-4.9,0-8.9,4-8.9,8.9s4,8.9,8.9,8.9h1.9h7V16.2V9.5l-5.6,3.3V16.2z M139.4,24.6v3.8\n\t\tv1.4h-1.5H136c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3h1.9h1.4v1.4H139.4z"/>\n\t<path class="st0" d="M183.7,17.6c-4.9,0-8.9,4-8.9,8.9s4,8.9,8.9,8.9h1.9h1.4v1.4v0.9v1.4v1.4c0,1.8-1.5,3.3-3.3,3.3\n\t\ts-3.3-1.5-3.3-3.3V38l-5.6,3.3c0.4,4.5,4.2,8.1,8.9,8.1c4.9,0,8.9-4,8.9-8.9v-1.4v-2.3V17.6h-7H183.7z M187,23.4v1.4v3.8V30h-1.4\n\t\th-1.9c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3h1.9C185.6,23.4,187,23.4,187,23.4z"/>\n\t<path class="st0" d="M28.6,17.6c-1.2,0-2.3,0.2-3.3,0.6V9.5l-5.6,3.3v13.7v2v6.9h5.6v-6.9l0,0v-2c0-1.8,1.5-3.3,3.3-3.3\n\t\ts3.3,1.5,3.3,3.3v8.9h5.6v-8.9C37.5,21.6,33.5,17.6,28.6,17.6z"/>\n\t<path class="st0" d="M17.8,9.5H0v5.6h6.1v20.3h5.6V15.1h6.1V9.5z"/>\n\t<path class="st0" d="M48.3,30.2c-0.4,0-1.2-0.1-1.8-0.4l5.2-2.1l5.6-2.3l-1-2.3l-0.1-0.2c-0.1-0.3-0.3-0.6-0.5-1\n\t\tc-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0-0.1-0.1-0.1l-0.1-0.1l-0.1-0.1c-1.6-2.2-4-3.5-6.7-3.7l0,0h-0.6c-4.9,0-8.9,4-8.9,8.9\n\t\tc0,0.4,0,0.9,0.1,1.4l0,0V28c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0.3,0.1,0.5,0.2,0.8v0.1v0.1c0.1,0.3,0.2,0.7,0.4,1v0.1v0.1\n\t\tc0.1,0.3,0.3,0.5,0.4,0.8c0,0.1,0.1,0.1,0.1,0.2l0,0c0.1,0.2,0.3,0.4,0.4,0.6c0,0,0,0,0,0.1c0,0,0,0.1,0.1,0.1l0.1,0.1\n\t\tc1.7,2.1,4.4,3.4,7.2,3.4h6.1v-5.2C54.5,30.2,50.6,30.2,48.3,30.2L48.3,30.2z M56.2,22.9L56.2,22.9L56.2,22.9z M44.6,25.7\n\t\tL44.6,25.7l-0.2,0.1c0.2-1.9,1.8-3.5,3.7-3.5c0.9,0,1.8,0.4,2.4,0.9L46.2,25L44.6,25.7L44.6,25.7z"/>\n</g>\n</svg>',o(s,n,e),o(s,p,e),i(p,d),o(s,w,e);for(let t=0;t<j.length;t+=1)j[t].m(s,e);o(s,k,e),o(s,y,e),o(s,I,e),M(A,s,e),C=!0},p(s,[t]){if(0&t){let n;for(G=L,n=0;n<G.length;n+=1){const e=S(s,G,n);j[n]?j[n].p(e,t):(j[n]=b(e),j[n].c(),j[n].m(k.parentNode,k))}for(;n<j.length;n+=1)j[n].d(1);j.length=G.length}},i(s){C||(x(A.$$.fragment,s),C=!0)},o(s){V(A.$$.fragment,s),C=!1},d(s){s&&r(t),s&&r(n),s&&r(p),s&&r(w),z(j,s),s&&r(k),s&&r(y),s&&r(I),$(A,s)}}}class E extends s{constructor(s){super(),t(this,s,null,y,n,{})}}function I(s){let t;const n=new E({});return{c(){m(n.$$.fragment)},l(s){u(n.$$.fragment,s)},m(s,e){M(n,s,e),t=!0},p:d,i(s){t||(x(n.$$.fragment,s),t=!0)},o(s){V(n.$$.fragment,s),t=!1},d(s){$(n,s)}}}export default class extends s{constructor(s){super(),t(this,s,null,I,n,{})}}