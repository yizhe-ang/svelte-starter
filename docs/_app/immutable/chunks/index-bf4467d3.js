function v(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function L(t){return t()}function z(){return Object.create(null)}function p(t){t.forEach(L)}function P(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let g;function _t(t,e){return g||(g=document.createElement("a")),g.href=e,t===g.href}function Q(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return v;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ht(t,e,n){t.$$.on_destroy.push(R(e,n))}function mt(t,e,n,i){if(t){const r=W(t,e,n,i);return t[0](r)}}function W(t,e,n,i){return t[1]&&i?K(n.ctx.slice(),t[1](i(e))):n.ctx}function pt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(e.dirty.length,r.length);for(let s=0;s<c;s+=1)u[s]=e.dirty[s]|r[s];return u}return e.dirty|r}return e.dirty}function yt(t,e,n,i,r,u){if(r){const c=W(e,n,i,u);t.p(c,r)}}function gt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function bt(t){return t==null?"":t}function xt(t,e,n){return t.set(n),e}function wt(t){return t&&P(t.destroy)?t.destroy:v}let k=!1;function U(){k=!0}function V(){k=!1}function X(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=l?r+1:X(1,r,y=>e[n[y]].claim_order,l))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const u=[],c=[];let s=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(u.push(e[o-1]);s>=o;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);u.reverse(),c.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<c.length;o++){for(;l<u.length&&c[o].claim_order>=u[l].claim_order;)l++;const f=l<u.length?u[l]:null;t.insertBefore(c[o],f)}}function Z(t,e){t.appendChild(e)}function tt(t,e){if(k){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function $t(t,e,n){k&&!n?tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function B(t){t.parentNode.removeChild(t)}function vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function I(t){return document.createElement(t)}function et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function C(t){return document.createTextNode(t)}function kt(){return C(" ")}function Et(){return C("")}function O(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function nt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:nt(t,i,e[i])}function St(t){return t===""?null:+t}function it(t){return Array.from(t.childNodes)}function rt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){rt(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function F(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];n[s.name]||u.push(s.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(e))}function jt(t,e,n){return F(t,e,n,I)}function Nt(t,e,n){return F(t,e,n,et)}function ot(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>C(e),!0)}function Ct(t){return ot(t," ")}function qt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Mt(t,e){t.value=e==null?"":e}function zt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ot(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Tt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let b;function ct(){if(b===void 0){b=!1;try{typeof window!="undefined"&&window.parent&&window.parent.document}catch{b=!0}}return b}function Lt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=I("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=ct();let u;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",u=O(window,"message",c=>{c.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{u=O(i.contentWindow,"resize",e)}),Z(t,i),()=>{(r||u&&i.contentWindow)&&u(),B(i)}}function Pt(t,e,n){t.classList[n?"add":"remove"](e)}function Wt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let m;function h(t){m=t}function E(){if(!m)throw new Error("Function called outside component initialization");return m}function Bt(t){E().$$.on_mount.push(t)}function It(t){E().$$.after_update.push(t)}function Dt(t,e){return E().$$.context.set(t,e),e}function Ft(t){return E().$$.context.get(t)}const _=[],T=[],w=[],S=[],H=Promise.resolve();let j=!1;function G(){j||(j=!0,H.then(J))}function Ht(){return G(),H}function N(t){w.push(t)}function Gt(t){S.push(t)}const A=new Set;let x=0;function J(){const t=m;do{for(;x<_.length;){const e=_[x];x++,h(e),st(e.$$)}for(h(null),_.length=0,x=0;T.length;)T.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];A.has(n)||(A.add(n),n())}w.length=0}while(_.length);for(;S.length;)S.pop()();j=!1,A.clear(),h(t)}function st(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const $=new Set;let d;function Jt(){d={r:0,c:[],p:d}}function Kt(){d.r||p(d.c),d=d.p}function ut(t,e){t&&t.i&&($.delete(t),t.i(e))}function Qt(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Rt(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const c=t[u],s=e[u];if(s){for(const o in c)o in s||(i[o]=1);for(const o in s)r[o]||(n[o]=s[o],r[o]=1);t[u]=s}else for(const o in c)r[o]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Ut(t){return typeof t=="object"&&t!==null?t:{}}function Vt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Xt(t){t&&t.c()}function Yt(t,e){t&&t.l(e)}function lt(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:c,after_update:s}=t.$$;r&&r.m(e,n),i||N(()=>{const o=u.map(L).filter(P);c?c.push(...o):p(o),t.$$.on_mount=[]}),s.forEach(N)}function at(t,e){const n=t.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(_.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Zt(t,e,n,i,r,u,c,s=[-1]){const o=m;h(t);const l=t.$$={fragment:null,ctx:null,props:u,update:v,not_equal:r,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:z(),dirty:s,skip_bound:!1,root:e.target||o.$$.root};c&&c(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,y,...q)=>{const M=q.length?q[0]:y;return l.ctx&&r(l.ctx[a],l.ctx[a]=M)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](M),f&&ft(t,a)),y}):[],l.update(),f=!0,p(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){U();const a=it(e.target);l.fragment&&l.fragment.l(a),a.forEach(B)}else l.fragment&&l.fragment.c();e.intro&&ut(t.$$.fragment),lt(t,e.target,e.anchor,e.customElement),V(),J()}h(o)}class te{$destroy(){at(this,1),this.$destroy=v}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Tt as $,Ut as A,at as B,K as C,Ht as D,v as E,R as F,p as G,P as H,tt as I,mt as J,yt as K,gt as L,pt as M,Wt as N,wt as O,O as P,vt as Q,Mt as R,te as S,St as T,_t as U,Pt as V,T as W,Vt as X,Gt as Y,N as Z,Ot as _,it as a,bt as a0,Lt as a1,ht as a2,xt as a3,et as a4,Nt as a5,Ft as a6,At as a7,nt as b,jt as c,B as d,I as e,zt as f,$t as g,ot as h,Zt as i,qt as j,kt as k,Et as l,Ct as m,Jt as n,Qt as o,Kt as p,ut as q,Dt as r,dt as s,C as t,It as u,Bt as v,Xt as w,Yt as x,lt as y,Rt as z};