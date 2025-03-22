System.register(["./index-legacy-CQDA4mDn.js"],(function(e,t){"use strict";var n,o,r,i,s,a,d,l;return{setters:[e=>{n=e.W,o=e.X,r=e.T,i=e.S,s=e.Q,a=e.Y,d=e.Z,l=e._}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
const t=new WeakMap,c=(e,n,o,r=0,i=!1)=>{t.has(e)!==o&&(o?m(e,n,r,i):f(e,n))},u=e=>e===e.getRootNode().activeElement,m=(e,n,o,r=!1)=>{const i=n.parentNode,s=n.cloneNode(!1);s.classList.add("cloned-input"),s.tabIndex=-1,r&&(s.disabled=!0),i.appendChild(s),t.set(e,s);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",n.style.transform=`translate3d(${a}px,${o}px,0) scale(0)`},f=(e,n)=>{const o=t.get(e);o&&(t.delete(e),o.remove()),e.style.pointerEvents="",n.style.transform=""},v="input, textarea, [no-blur], [contenteditable]",p=(e,t,n,o)=>{const r=e.top,i=e.bottom,s=t.top,a=s+15,d=.75*Math.min(t.bottom,o-n)-i,l=a-r,c=Math.round(d<0?-d:l>0?-l:0),u=Math.min(c,r-s),m=Math.abs(u)/.3;return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,m)),scrollPadding:n,inputSafeY:4-(r-a)}},w=async(e,t,n,o,r,i=!1)=>{if(!n&&!o)return;const s=((e,t,n)=>{var o;const r=null!==(o=e.closest("ion-item,[ion-item]"))&&void 0!==o?o:e;return p(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)})(e,n||o,r);if(n&&Math.abs(s.scrollAmount)<4)t.focus();else if(c(e,t,!0,s.inputSafeY,i),t.focus(),a((()=>e.click())),"undefined"!=typeof window){let o;const r=async()=>{void 0!==o&&clearTimeout(o),window.removeEventListener("ionKeyboardDidShow",i),window.removeEventListener("ionKeyboardDidShow",r),n&&await l(n,0,s.scrollAmount,s.scrollDuration),c(e,t,!1,s.inputSafeY),t.focus()},i=()=>{window.removeEventListener("ionKeyboardDidShow",i),window.addEventListener("ionKeyboardDidShow",r)};if(n){const e=await d(n),a=e.scrollHeight-e.clientHeight;if(s.scrollAmount>a-e.scrollTop)return"password"===t.type?(s.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",i)):window.addEventListener("ionKeyboardDidShow",r),void(o=setTimeout(r,1e3))}r()}},y=(e,t,n)=>{if(t&&n){const o=t.x-n.x,r=t.y-n.y;return o*o+r*r>e*e}return!1},h="$ionPaddingTimer",g=(e,t)=>{var n,o;if("INPUT"!==e.tagName)return;if(e.parentElement&&"ION-INPUT"===e.parentElement.tagName)return;if("ION-SEARCHBAR"===(null===(o=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===o?void 0:o.tagName))return;const r=i(e);if(null===r)return;const s=r[h];s&&clearTimeout(s),t>0?r.style.setProperty("--keyboard-offset",`${t}px`):r[h]=setTimeout((()=>{r.style.setProperty("--keyboard-offset","0px")}),120)};e("startInputShims",((e,t)=>{const a=document,d="ios"===t,l="android"===t,m=e.getNumber("keyboardHeight",290),f=e.getBoolean("scrollAssist",!0),p=e.getBoolean("hideCaretOnScroll",d),h=e.getBoolean("inputBlurring",d),E=e.getBoolean("scrollPadding",!0),S=Array.from(a.querySelectorAll("ion-input, ion-textarea")),b=new WeakMap,L=new WeakMap,x=async e=>{await new Promise((t=>r(e,t)));const t=e.shadowRoot||e,a=t.querySelector("input")||t.querySelector("textarea"),d=i(e),v=d?null:e.closest("ion-footer");if(a){if(d&&p&&!b.has(e)){const t=((e,t,r)=>{if(!r||!t)return()=>{};const i=n=>{u(t)&&c(e,t,n)},s=()=>c(e,t,!1),a=()=>i(!0),d=()=>i(!1);return n(r,"ionScrollStart",a),n(r,"ionScrollEnd",d),t.addEventListener("blur",s),()=>{o(r,"ionScrollStart",a),o(r,"ionScrollEnd",d),t.removeEventListener("blur",s)}})(e,a,d);b.set(e,t)}if("date"!==a.type&&"datetime-local"!==a.type&&(d||v)&&f&&!L.has(e)){const t=((e,t,n,o,r,i=!1)=>{let a;const d=e=>{a=s(e)},l=d=>{if(!a)return;const l=s(d);y(6,a,l)||u(t)||w(e,t,n,o,r,i)};return e.addEventListener("touchstart",d,{capture:!0,passive:!0}),e.addEventListener("touchend",l,!0),()=>{e.removeEventListener("touchstart",d,!0),e.removeEventListener("touchend",l,!0)}})(e,a,d,v,m,l);L.set(e,t)}}};h&&(()=>{let e=!0,t=!1;const o=document,r=()=>{t=!0},i=()=>{e=!0},s=n=>{if(t)return void(t=!1);const r=o.activeElement;if(!r)return;if(r.matches(v))return;const i=n.target;i!==r&&(i.matches(v)||i.closest(v)||(e=!1,setTimeout((()=>{e||r.blur()}),50)))};n(o,"ionScrollStart",r),o.addEventListener("focusin",i,!0),o.addEventListener("touchend",s,!1)})(),E&&(e=>{const t=document,n=t=>{g(t.target,e)},o=e=>{g(e.target,0)};t.addEventListener("focusin",n),t.addEventListener("focusout",o)})(m);for(const n of S)x(n);a.addEventListener("ionInputDidLoad",(e=>{x(e.detail)})),a.addEventListener("ionInputDidUnload",(e=>{(e=>{if(p){const t=b.get(e);t&&t(),b.delete(e)}if(f){const t=L.get(e);t&&t(),L.delete(e)}})(e.detail)}))}))}}}));
