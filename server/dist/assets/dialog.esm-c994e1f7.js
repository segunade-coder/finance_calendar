import{r as l,I as we,C as Dt,P as Pt,U as wt,u as $,g as Ot,i as J,k as kt,D as y,Z as W,n as V,o as It,c as X,m as D,q as Rt,O as G,s as zt,T as At,l as ve,R as he}from"./index-82ae9a98.js";function ee(){return ee=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}return r},ee.apply(this,arguments)}function Ft(r){if(Array.isArray(r))return r}function Tt(r,n){var e=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e!=null){var t,a,i,u,s=[],f=!0,C=!1;try{if(i=(e=e.call(r)).next,n===0){if(Object(e)!==e)return;f=!1}else for(;!(f=(t=i.call(e)).done)&&(s.push(t.value),s.length!==n);f=!0);}catch(v){C=!0,a=v}finally{try{if(!f&&e.return!=null&&(u=e.return(),Object(u)!==u))return}finally{if(C)throw a}}return s}}function Ce(r,n){(n==null||n>r.length)&&(n=r.length);for(var e=0,t=new Array(n);e<n;e++)t[e]=r[e];return t}function Mt(r,n){if(r){if(typeof r=="string")return Ce(r,n);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return Ce(r,n)}}function Nt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Lt(r,n){return Ft(r)||Tt(r,n)||Mt(r,n)||Nt()}function P(r){"@babel/helpers - typeof";return P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},P(r)}function $t(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}function Vt(r,n){if(P(r)!=="object"||r===null)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var t=e.call(r,n||"default");if(P(t)!=="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(r)}function Ht(r){var n=Vt(r,"string");return P(n)==="symbol"?n:String(n)}function be(r,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,Ht(t.key),t)}}function _t(r,n,e){return n&&be(r.prototype,n),e&&be(r,e),Object.defineProperty(r,"prototype",{writable:!1}),r}var jt=function(){function r(){$t(this,r)}return _t(r,null,[{key:"equals",value:function(e,t,a){return a&&e&&P(e)==="object"&&t&&P(t)==="object"?this.resolveFieldData(e,a)===this.resolveFieldData(t,a):this.deepEquals(e,t)}},{key:"deepEquals",value:function(e,t){if(e===t)return!0;if(e&&t&&P(e)=="object"&&P(t)=="object"){var a=Array.isArray(e),i=Array.isArray(t),u,s,f;if(a&&i){if(s=e.length,s!==t.length)return!1;for(u=s;u--!==0;)if(!this.deepEquals(e[u],t[u]))return!1;return!0}if(a!==i)return!1;var C=e instanceof Date,v=t instanceof Date;if(C!==v)return!1;if(C&&v)return e.getTime()===t.getTime();var k=e instanceof RegExp,A=t instanceof RegExp;if(k!==A)return!1;if(k&&A)return e.toString()===t.toString();var O=Object.keys(e);if(s=O.length,s!==Object.keys(t).length)return!1;for(u=s;u--!==0;)if(!Object.prototype.hasOwnProperty.call(t,O[u]))return!1;for(u=s;u--!==0;)if(f=O[u],!this.deepEquals(e[f],t[f]))return!1;return!0}return e!==e&&t!==t}},{key:"resolveFieldData",value:function(e,t){if(e&&Object.keys(e).length&&t){if(this.isFunction(t))return t(e);if(r.isNotEmpty(e[t]))return e[t];if(t.indexOf(".")===-1)return e[t];for(var a=t.split("."),i=e,u=0,s=a.length;u<s;++u){if(i==null)return null;i=i[a[u]]}return i}else return null}},{key:"isFunction",value:function(e){return!!(e&&e.constructor&&e.call&&e.apply)}},{key:"isObject",value:function(e){return e!==null&&e instanceof Object&&e.constructor===Object}},{key:"isLetter",value:function(e){return e&&(e.toUpperCase()!=e.toLowerCase()||e.codePointAt(0)>127)}},{key:"findDiffKeys",value:function(e,t){return!e||!t?{}:Object.keys(e).filter(function(a){return!t.hasOwnProperty(a)}).reduce(function(a,i){return a[i]=e[i],a},{})}},{key:"reduceKeys",value:function(e,t){var a={};return!e||!t||t.length===0||Object.keys(e).filter(function(i){return t.some(function(u){return i.startsWith(u)})}).forEach(function(i){a[i]=e[i],delete e[i]}),a}},{key:"reorderArray",value:function(e,t,a){e&&t!==a&&(a>=e.length&&(a%=e.length,t%=e.length),e.splice(a,0,e.splice(t,1)[0]))}},{key:"findIndexInList",value:function(e,t,a){var i=this;return t?a?t.findIndex(function(u){return i.equals(u,e,a)}):t.findIndex(function(u){return u===e}):-1}},{key:"getJSXElement",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),i=1;i<t;i++)a[i-1]=arguments[i];return this.isFunction(e)?e.apply(void 0,a):e}},{key:"getProp",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=e?e[t]:void 0;return i===void 0?a[t]:i}},{key:"getMergedProps",value:function(e,t){return Object.assign({},t,e)}},{key:"getDiffProps",value:function(e,t){return this.findDiffKeys(e,t)}},{key:"getPropValue",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),i=1;i<t;i++)a[i-1]=arguments[i];return this.isFunction(e)?e.apply(void 0,a):e}},{key:"getComponentProp",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.isNotEmpty(e)?this.getProp(e.props,t,a):void 0}},{key:"getComponentProps",value:function(e,t){return this.isNotEmpty(e)?this.getMergedProps(e.props,t):void 0}},{key:"getComponentDiffProps",value:function(e,t){return this.isNotEmpty(e)?this.getDiffProps(e.props,t):void 0}},{key:"isValidChild",value:function(e,t,a){if(e){var i=this.getComponentProp(e,"__TYPE")||(e.type?e.type.displayName:void 0),u=i===t;try{var s}catch{}return u}return!1}},{key:"getRefElement",value:function(e){return e?P(e)==="object"&&e.hasOwnProperty("current")?e.current:e:null}},{key:"combinedRefs",value:function(e,t){e&&t&&(typeof t=="function"?t(e.current):t.current=e.current)}},{key:"removeAccents",value:function(e){return e&&e.search(/[\xC0-\xFF]/g)>-1&&(e=e.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),e}},{key:"convertToFlatCase",value:function(e){return this.isNotEmpty(e)&&typeof e=="string"?e.replace(/(-|_)/g,"").toLowerCase():e}},{key:"isEmpty",value:function(e){return e==null||e===""||Array.isArray(e)&&e.length===0||!(e instanceof Date)&&P(e)==="object"&&Object.keys(e).length===0}},{key:"isNotEmpty",value:function(e){return!this.isEmpty(e)}},{key:"sort",value:function(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,i=arguments.length>3?arguments[3]:void 0,u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:1,s=r.compare(e,t,i,a),f=a;return(r.isEmpty(e)||r.isEmpty(t))&&(f=u===1?a:u),f*s}},{key:"compare",value:function(e,t,a){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1,u=-1,s=r.isEmpty(e),f=r.isEmpty(t);return s&&f?u=0:s?u=i:f?u=-i:typeof e=="string"&&typeof t=="string"?u=e.localeCompare(t,a,{numeric:!0}):u=e<t?-1:e>t?1:0,u}}]),r}(),Ee=0;function Ut(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"pr_id_";return Ee++,"".concat(r).concat(Ee)}var Oe=l.memo(l.forwardRef(function(r,n){var e=we.getPTI(r),t=l.useState(r.id),a=Lt(t,2),i=a[0],u=a[1];return l.useEffect(function(){jt.isEmpty(i)&&u(Ut("pr_icon_clip_"))},[i]),l.createElement("svg",ee({ref:n,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),l.createElement("g",{clipPath:"url(#".concat(i,")")},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"})),l.createElement("defs",null,l.createElement("clipPath",{id:i},l.createElement("rect",{width:"14",height:"14",fill:"white"}))))}));Oe.displayName="WindowMaximizeIcon";function te(){return te=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}return r},te.apply(this,arguments)}function qt(r){if(Array.isArray(r))return r}function Xt(r,n){var e=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e!=null){var t,a,i,u,s=[],f=!0,C=!1;try{if(i=(e=e.call(r)).next,n===0){if(Object(e)!==e)return;f=!1}else for(;!(f=(t=i.call(e)).done)&&(s.push(t.value),s.length!==n);f=!0);}catch(v){C=!0,a=v}finally{try{if(!f&&e.return!=null&&(u=e.return(),Object(u)!==u))return}finally{if(C)throw a}}return s}}function xe(r,n){(n==null||n>r.length)&&(n=r.length);for(var e=0,t=new Array(n);e<n;e++)t[e]=r[e];return t}function Kt(r,n){if(r){if(typeof r=="string")return xe(r,n);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return xe(r,n)}}function Yt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Zt(r,n){return qt(r)||Xt(r,n)||Kt(r,n)||Yt()}function w(r){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},w(r)}function Bt(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}function Jt(r,n){if(w(r)!=="object"||r===null)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var t=e.call(r,n||"default");if(w(t)!=="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(r)}function Wt(r){var n=Jt(r,"string");return w(n)==="symbol"?n:String(n)}function Se(r,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,Wt(t.key),t)}}function Gt(r,n,e){return n&&Se(r.prototype,n),e&&Se(r,e),Object.defineProperty(r,"prototype",{writable:!1}),r}var Qt=function(){function r(){Bt(this,r)}return Gt(r,null,[{key:"equals",value:function(e,t,a){return a&&e&&w(e)==="object"&&t&&w(t)==="object"?this.resolveFieldData(e,a)===this.resolveFieldData(t,a):this.deepEquals(e,t)}},{key:"deepEquals",value:function(e,t){if(e===t)return!0;if(e&&t&&w(e)=="object"&&w(t)=="object"){var a=Array.isArray(e),i=Array.isArray(t),u,s,f;if(a&&i){if(s=e.length,s!==t.length)return!1;for(u=s;u--!==0;)if(!this.deepEquals(e[u],t[u]))return!1;return!0}if(a!==i)return!1;var C=e instanceof Date,v=t instanceof Date;if(C!==v)return!1;if(C&&v)return e.getTime()===t.getTime();var k=e instanceof RegExp,A=t instanceof RegExp;if(k!==A)return!1;if(k&&A)return e.toString()===t.toString();var O=Object.keys(e);if(s=O.length,s!==Object.keys(t).length)return!1;for(u=s;u--!==0;)if(!Object.prototype.hasOwnProperty.call(t,O[u]))return!1;for(u=s;u--!==0;)if(f=O[u],!this.deepEquals(e[f],t[f]))return!1;return!0}return e!==e&&t!==t}},{key:"resolveFieldData",value:function(e,t){if(e&&Object.keys(e).length&&t){if(this.isFunction(t))return t(e);if(r.isNotEmpty(e[t]))return e[t];if(t.indexOf(".")===-1)return e[t];for(var a=t.split("."),i=e,u=0,s=a.length;u<s;++u){if(i==null)return null;i=i[a[u]]}return i}else return null}},{key:"isFunction",value:function(e){return!!(e&&e.constructor&&e.call&&e.apply)}},{key:"isObject",value:function(e){return e!==null&&e instanceof Object&&e.constructor===Object}},{key:"isLetter",value:function(e){return e&&(e.toUpperCase()!=e.toLowerCase()||e.codePointAt(0)>127)}},{key:"findDiffKeys",value:function(e,t){return!e||!t?{}:Object.keys(e).filter(function(a){return!t.hasOwnProperty(a)}).reduce(function(a,i){return a[i]=e[i],a},{})}},{key:"reduceKeys",value:function(e,t){var a={};return!e||!t||t.length===0||Object.keys(e).filter(function(i){return t.some(function(u){return i.startsWith(u)})}).forEach(function(i){a[i]=e[i],delete e[i]}),a}},{key:"reorderArray",value:function(e,t,a){e&&t!==a&&(a>=e.length&&(a%=e.length,t%=e.length),e.splice(a,0,e.splice(t,1)[0]))}},{key:"findIndexInList",value:function(e,t,a){var i=this;return t?a?t.findIndex(function(u){return i.equals(u,e,a)}):t.findIndex(function(u){return u===e}):-1}},{key:"getJSXElement",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),i=1;i<t;i++)a[i-1]=arguments[i];return this.isFunction(e)?e.apply(void 0,a):e}},{key:"getProp",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=e?e[t]:void 0;return i===void 0?a[t]:i}},{key:"getMergedProps",value:function(e,t){return Object.assign({},t,e)}},{key:"getDiffProps",value:function(e,t){return this.findDiffKeys(e,t)}},{key:"getPropValue",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),i=1;i<t;i++)a[i-1]=arguments[i];return this.isFunction(e)?e.apply(void 0,a):e}},{key:"getComponentProp",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.isNotEmpty(e)?this.getProp(e.props,t,a):void 0}},{key:"getComponentProps",value:function(e,t){return this.isNotEmpty(e)?this.getMergedProps(e.props,t):void 0}},{key:"getComponentDiffProps",value:function(e,t){return this.isNotEmpty(e)?this.getDiffProps(e.props,t):void 0}},{key:"isValidChild",value:function(e,t,a){if(e){var i=this.getComponentProp(e,"__TYPE")||(e.type?e.type.displayName:void 0),u=i===t;try{var s}catch{}return u}return!1}},{key:"getRefElement",value:function(e){return e?w(e)==="object"&&e.hasOwnProperty("current")?e.current:e:null}},{key:"combinedRefs",value:function(e,t){e&&t&&(typeof t=="function"?t(e.current):t.current=e.current)}},{key:"removeAccents",value:function(e){return e&&e.search(/[\xC0-\xFF]/g)>-1&&(e=e.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),e}},{key:"convertToFlatCase",value:function(e){return this.isNotEmpty(e)&&typeof e=="string"?e.replace(/(-|_)/g,"").toLowerCase():e}},{key:"isEmpty",value:function(e){return e==null||e===""||Array.isArray(e)&&e.length===0||!(e instanceof Date)&&w(e)==="object"&&Object.keys(e).length===0}},{key:"isNotEmpty",value:function(e){return!this.isEmpty(e)}},{key:"sort",value:function(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,i=arguments.length>3?arguments[3]:void 0,u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:1,s=r.compare(e,t,i,a),f=a;return(r.isEmpty(e)||r.isEmpty(t))&&(f=u===1?a:u),f*s}},{key:"compare",value:function(e,t,a){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1,u=-1,s=r.isEmpty(e),f=r.isEmpty(t);return s&&f?u=0:s?u=i:f?u=-i:typeof e=="string"&&typeof t=="string"?u=e.localeCompare(t,a,{numeric:!0}):u=e<t?-1:e>t?1:0,u}}]),r}(),De=0;function er(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"pr_id_";return De++,"".concat(r).concat(De)}var ke=l.memo(l.forwardRef(function(r,n){var e=we.getPTI(r),t=l.useState(r.id),a=Zt(t,2),i=a[0],u=a[1];return l.useEffect(function(){Qt.isEmpty(i)&&u(er("pr_icon_clip_"))},[i]),l.createElement("svg",te({ref:n,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),l.createElement("g",{clipPath:"url(#".concat(i,")")},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"})),l.createElement("defs",null,l.createElement("clipPath",{id:i},l.createElement("rect",{width:"14",height:"14",fill:"white"}))))}));ke.displayName="WindowMinimizeIcon";function H(r){"@babel/helpers - typeof";return H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},H(r)}function tr(r,n){if(H(r)!=="object"||r===null)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var t=e.call(r,n||"default");if(H(t)!=="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(r)}function rr(r){var n=tr(r,"string");return H(n)==="symbol"?n:String(n)}function nr(r,n,e){return n=rr(n),n in r?Object.defineProperty(r,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[n]=e,r}function re(r,n){(n==null||n>r.length)&&(n=r.length);for(var e=0,t=new Array(n);e<n;e++)t[e]=r[e];return t}function ar(r){if(Array.isArray(r))return re(r)}function ir(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function Ie(r,n){if(r){if(typeof r=="string")return re(r,n);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return re(r,n)}}function or(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ur(r){return ar(r)||ir(r)||Ie(r)||or()}function lr(r){if(Array.isArray(r))return r}function sr(r,n){var e=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e!=null){var t,a,i,u,s=[],f=!0,C=!1;try{if(i=(e=e.call(r)).next,n===0){if(Object(e)!==e)return;f=!1}else for(;!(f=(t=i.call(e)).done)&&(s.push(t.value),s.length!==n);f=!0);}catch(v){C=!0,a=v}finally{try{if(!f&&e.return!=null&&(u=e.return(),Object(u)!==u))return}finally{if(C)throw a}}return s}}function cr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function R(r,n){return lr(r)||sr(r,n)||Ie(r,n)||cr()}var Q=Dt.extend({defaultProps:{__TYPE:"Dialog",appendTo:null,ariaCloseIconLabel:null,baseZIndex:0,blockScroll:!1,breakpoints:null,className:null,closable:!0,closeIcon:null,closeOnEscape:!0,contentClassName:null,contentStyle:null,dismissableMask:!1,draggable:!0,focusOnShow:!0,footer:null,header:null,headerClassName:null,headerStyle:null,icons:null,id:null,keepInViewport:!0,maskClassName:null,maskStyle:null,maximizable:!1,maximizeIcon:null,maximized:!1,minX:0,minY:0,minimizeIcon:null,modal:!0,onClick:null,onDrag:null,onDragEnd:null,onDragStart:null,onHide:null,onMaskClick:null,onMaximize:null,onResize:null,onResizeEnd:null,onResizeStart:null,onShow:null,position:"center",resizable:!0,rtl:!1,showHeader:!0,style:null,transitionOptions:null,visible:!1,children:void 0}});function Pe(r,n){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);n&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),e.push.apply(e,t)}return e}function fr(r){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?arguments[n]:{};n%2?Pe(Object(e),!0).forEach(function(t){nr(r,t,e[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Pe(Object(e)).forEach(function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))})}return r}var mr=l.forwardRef(function(r,n){var e=l.useContext(Pt),t=Q.getProps(r,e),a=t.id?t.id:wt(),i=l.useState(a),u=R(i,2),s=u[0];u[1];var f=l.useState(!1),C=R(f,2),v=C[0],k=C[1],A=l.useState(!1),O=R(A,2),_=O[0],ne=O[1],Re=l.useState(t.maximized),ae=R(Re,2),ie=ae[0],ze=ae[1],g=l.useRef(null),F=l.useRef(null),K=l.useRef(null),oe=l.useRef(null),ue=l.useRef(null),le=l.useRef(null),Y=l.useRef(null),L=l.useRef(!1),j=l.useRef(!1),T=l.useRef(null),M=l.useRef(null),Z=l.useRef(null),se=l.useRef(a),z=t.onMaximize?t.maximized:ie,Ae=Q.setMetaData({props:t,state:{id:s,maximized:z,containerVisible:v}}),x=Ae.ptm,Fe=$({type:"keydown",listener:function(o){return Ge(o)}}),ce=R(Fe,2),Te=ce[0],Me=ce[1],Ne=$({type:"mousemove",target:function(){return window.document},listener:function(o){return nt(o)}}),fe=R(Ne,2),Le=fe[0],$e=fe[1],Ve=$({type:"mouseup",target:function(){return window.document},listener:function(o){return at(o)}}),me=R(Ve,2),He=me[0],_e=me[1],je=$({type:"mousemove",target:function(){return window.document},listener:function(o){return et(o)}}),pe=R(je,2),Ue=pe[0],qe=pe[1],Xe=$({type:"mouseup",target:function(){return window.document},listener:function(o){return tt(o)}}),ge=R(Xe,2),Ke=ge[0],Ye=ge[1],B=function(o){t.onHide(),o.preventDefault()},Ze=function(){var o=document.activeElement,m=o&&g.current&&g.current.contains(o);!m&&t.closable&&t.showHeader&&Y.current.focus()},Be=function(o){K.current=o.target,t.onPointerDown&&t.onPointerDown(o)},Je=function(o){t.dismissableMask&&t.modal&&F.current===o.target&&!K.current&&B(o),t.onMaskClick&&t.onMaskClick(o),K.current=null},We=function(o){t.onMaximize?t.onMaximize({originalEvent:o,maximized:!z}):ze(function(m){return!m}),o.preventDefault()},Ge=function(o){var m=o.currentTarget;if(!(!m||!m.primeDialogParams)){var p=m.primeDialogParams,h=p.length,E=p[h-1]?p[h-1].id:void 0;if(E===s){var S=document.getElementById(E);if(t.closable&&t.closeOnEscape&&o.key==="Escape")B(o),o.stopImmediatePropagation(),p.splice(h-1,1);else if(o.key==="Tab"){o.preventDefault();var d=y.getFocusableElements(S);if(d&&d.length>0)if(!document.activeElement)d[0].focus();else{var b=d.indexOf(document.activeElement);o.shiftKey?b===-1||b===0?d[d.length-1].focus():d[b-1].focus():b===-1||b===d.length-1?d[0].focus():d[b+1].focus()}}}}},Qe=function(o){y.hasClass(o.target,"p-dialog-header-icon")||y.hasClass(o.target.parentElement,"p-dialog-header-icon")||t.draggable&&(L.current=!0,T.current=o.pageX,M.current=o.pageY,g.current.style.margin="0",y.addClass(document.body,"p-unselectable-text"),t.onDragStart&&t.onDragStart(o))},et=function(o){if(L.current){var m=y.getOuterWidth(g.current),p=y.getOuterHeight(g.current),h=o.pageX-T.current,E=o.pageY-M.current,S=g.current.getBoundingClientRect(),d=S.left+h,b=S.top+E,I=y.getViewport();g.current.style.position="fixed",t.keepInViewport?(d>=t.minX&&d+m<I.width&&(T.current=o.pageX,g.current.style.left=d+"px"),b>=t.minY&&b+p<I.height&&(M.current=o.pageY,g.current.style.top=b+"px")):(T.current=o.pageX,g.current.style.left=d+"px",M.current=o.pageY,g.current.style.top=b+"px"),t.onDrag&&t.onDrag(o)}},tt=function(o){L.current&&(L.current=!1,y.removeClass(document.body,"p-unselectable-text"),t.onDragEnd&&t.onDragEnd(o))},rt=function(o){t.resizable&&(j.current=!0,T.current=o.pageX,M.current=o.pageY,y.addClass(document.body,"p-unselectable-text"),t.onResizeStart&&t.onResizeStart(o))},de=function(o,m,p){!p&&(p=y.getViewport());var h=parseInt(o);return/^(\d+|(\.\d+))(\.\d+)?%$/.test(o)?h*(p[m]/100):h},nt=function(o){if(j.current){var m=o.pageX-T.current,p=o.pageY-M.current,h=y.getOuterWidth(g.current),E=y.getOuterHeight(g.current),S=g.current.getBoundingClientRect(),d=y.getViewport(),b=!parseInt(g.current.style.top)||!parseInt(g.current.style.left),I=de(g.current.style.minWidth,"width",d),U=de(g.current.style.minHeight,"height",d),N=h+m,q=E+p;b&&(N+=m,q+=p),(!I||N>I)&&S.left+N<d.width&&(g.current.style.width=N+"px"),(!U||q>U)&&S.top+q<d.height&&(g.current.style.height=q+"px"),T.current=o.pageX,M.current=o.pageY,t.onResize&&t.onResize(o)}},at=function(o){j.current&&(j.current=!1,y.removeClass(document.body,"p-unselectable-text"),t.onResizeEnd&&t.onResizeEnd(o))},it=function(){g.current.style.position="",g.current.style.left="",g.current.style.top="",g.current.style.margin=""},ot=function(){var o=["center","left","right","top","top-left","top-right","bottom","bottom-left","bottom-right"],m=o.find(function(p){return p===t.position||p.replace("-","")===t.position});return m?"p-dialog-".concat(m):""},ut=function(){g.current.setAttribute(se.current,"")},lt=function(){t.onShow&&t.onShow(),t.focusOnShow&&Ze(),ft()},st=function(){t.modal&&y.addClass(F.current,"p-component-overlay-leave"),t.blockScroll&&y.removeClass(document.body,"p-overflow-hidden")},ct=function(){L.current=!1,W.clear(F.current),k(!1),ye()},ft=function(){mt(),(t.blockScroll||t.maximizable&&z)&&y.addClass(document.body,"p-overflow-hidden")},ye=function(){pt();var o=t.maximizable&&z;if(t.modal){var m=document.primeDialogParams&&document.primeDialogParams.some(function(p){return p.hasBlockScroll});(m||o)&&y.removeClass(document.body,"p-overflow-hidden")}else(t.blockScroll||o)&&y.removeClass(document.body,"p-overflow-hidden")},mt=function(){t.draggable&&(Ue(),Ke()),t.resizable&&(Le(),He()),Te();var o={id:s,hasBlockScroll:t.blockScroll};document.primeDialogParams=document.primeDialogParams?[].concat(ur(document.primeDialogParams),[o]):[o]},pt=function(){qe(),Ye(),$e(),_e(),Me(),document.primeDialogParams=document.primeDialogParams&&document.primeDialogParams.filter(function(o){return o.id!==s})},gt=function(){Z.current=y.createInlineStyle(e&&e.nonce||V.nonce);var o="";for(var m in t.breakpoints)o+=`
                @media screen and (max-width: `.concat(m,`) {
                    .p-dialog[`).concat(se.current,`] {
                        width: `).concat(t.breakpoints[m],` !important;
                    }
                }
            `);Z.current.innerHTML=o},dt=function(){if(!t.blockScroll){var o=z&&_?"addClass":"removeClass";y[o](document.body,"p-overflow-hidden")}};Ot(function(){t.visible&&k(!0),t.breakpoints&&gt()}),J(function(){t.visible&&!v&&k(!0),t.visible!==_&&v&&ne(t.visible)}),J(function(){v&&(W.set("modal",F.current,e&&e.autoZIndex||V.autoZIndex,t.baseZIndex||e&&e.zIndex.modal||V.zIndex.modal),ne(!0))},[v]),J(function(){dt()},[t.maximized,ie,_]),kt(function(){ye(),y.removeInlineStyle(Z.current),W.clear(F.current)}),l.useImperativeHandle(n,function(){return{props:t,resetPosition:it,getElement:function(){return g.current},getMask:function(){return F.current},getContent:function(){return oe.current},getHeader:function(){return ue.current},getFooter:function(){return le.current},getCloseButton:function(){return Y.current}}});var yt=function(){if(t.closable){var o=t.ariaCloseIconLabel||zt("close"),m=D({className:"p-dialog-header-close-icon","aria-hidden":!0},x("closeButtonIcon")),p=t.closeIcon||l.createElement(At,m),h=ve.getJSXIcon(p,fr({},m),{props:t}),E=D({ref:Y,type:"button",className:"p-dialog-header-icon p-dialog-header-close p-link","aria-label":o,onClick:B},x("closeButton"));return l.createElement("button",E,h,l.createElement(he,null))}return null},vt=function(){var o,m="p-dialog-header-maximize-icon",p=D({className:m},x("maximizableIcon"));z?o=t.minimizeIcon||l.createElement(ke,p):o=t.maximizeIcon||l.createElement(Oe,p);var h=ve.getJSXIcon(o,p,{props:t});if(t.maximizable){var E=D({type:"button",className:"p-dialog-header-icon p-dialog-header-maximize p-link",onClick:We},x("maximizableButton"));return l.createElement("button",E,h,l.createElement(he,null))}return null},ht=function(){if(t.showHeader){var o=yt(),m=vt(),p=G.getJSXElement(t.icons,t),h=G.getJSXElement(t.header,t),E=s+"_header",S=X("p-dialog-header",t.headerClassName),d=D({ref:ue,style:t.headerStyle,className:S,onMouseDown:Qe},x("header")),b=D({id:E,className:"p-dialog-title"},x("headerTitle")),I=D({className:"p-dialog-header-icons"},x("headerIcons"));return l.createElement("div",d,l.createElement("div",b,h),l.createElement("div",I,p,m,o))}return null},Ct=function(){var o=X("p-dialog-content",t.contentClassName),m=s+"_content",p=D({id:m,ref:oe,style:t.contentStyle,className:o},x("content"));return l.createElement("div",p,t.children)},bt=function(){var o=G.getJSXElement(t.footer,t),m=D({ref:le,className:"p-dialog-footer"},x("footer"));return o&&l.createElement("div",m,o)},Et=function(){return t.resizable?l.createElement("span",{className:"p-resizable-handle",style:{zIndex:90},onMouseDown:rt}):null},xt=function(){var o=X("p-dialog p-component",t.className,{"p-dialog-rtl":t.rtl,"p-dialog-maximized":z,"p-dialog-default":!z,"p-input-filled":e&&e.inputStyle==="filled"||V.inputStyle==="filled","p-ripple-disabled":e&&e.ripple===!1||V.ripple===!1}),m=X("p-dialog-mask",ot(),{"p-component-overlay p-component-overlay-enter":t.modal,"p-dialog-visible":v,"p-dialog-draggable":t.draggable,"p-dialog-resizable":t.resizable},t.maskClassName),p=ht(),h=Ct(),E=bt(),S=Et(),d=s+"_header",b=s+"_content",I={enter:t.position==="center"?150:300,exit:t.position==="center"?150:300},U=D({ref:F,style:t.maskStyle,className:m,onPointerUp:Je},x("mask")),N=D({ref:g,id:s,className:o,style:t.style,onClick:t.onClick,role:"dialog","aria-labelledby":d,"aria-describedby":b,"aria-modal":t.modal,onPointerDown:Be},Q.getOtherProps(t),x("root"));return l.createElement("div",U,l.createElement(Rt,{nodeRef:g,classNames:"p-dialog",timeout:I,in:_,options:t.transitionOptions,unmountOnExit:!0,onEnter:ut,onEntered:lt,onExiting:st,onExited:ct},l.createElement("div",N,p,h,E,S)))},St=function(){var o=xt();return l.createElement(It,{element:o,appendTo:t.appendTo,visible:!0})};return v&&St()});mr.displayName="Dialog";export{mr as D};