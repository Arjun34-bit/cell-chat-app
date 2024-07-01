(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[100],{6971:function(e,t,n){var r;window,e.exports=(r=n(2791),function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/otp-input-react/",n(n.s=1)}([function(e,t){e.exports=r},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){r(e,t,n[t])}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.r(t);var i=n(0),o=n.n(i);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,u=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(s){a=!0,u=s}finally{try{r||null==o.return||o.return()}finally{if(a)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=function(e){var t=e.maxTime,n=e.onTimerComplete,r=e.timeInterval,a=e.onResendClick,u=Object(i.useRef)(),o=s(Object(i.useState)(t),2),c=o[0],l=o[1];return Object(i.useEffect)((function(){return u.current&&0===c?(clearTimeout(u.current),n&&n()):u.current=setTimeout((function(){l((function(e){return e-1}))}),r),function(){clearTimeout(u.current)}}),[n,c,r]),{handelResendClick:function(){a&&a(0===c),l(t)},remainingTime:c}};function l(e){var t=e.renderTime,n=e.renderButton,r=e.style,i=e.className,s=u(e,["renderTime","renderButton","style","className"]),l=c(s),d=l.remainingTime,f=l.handelResendClick;return o.a.createElement("div",{className:i||"","data-testid":"otp-resend-root",style:a({display:"flex",justifyContent:"space-between"},r)},t?t(d):o.a.createElement("span",null,d," sec"),n?n({disabled:0!==d,onClick:f,remainingTime:d}):o.a.createElement("button",{disabled:0!==d,onClick:f,type:"button"},"Resend OTP"))}l.defaultProps={maxTime:60,timeInterval:1e3,style:{}};var d=l,f={width:32,height:32,textAlign:"center",marginRight:20},p=o.a.memo((function(e){var t=e.focus,n=e.autoFocus,r=e.disabled,s=e.value,c=e.onInputFocus,l=e.index,d=e.secure,p=e.inputStyles,m=e.otpType,v=u(e,["focus","autoFocus","disabled","value","onInputFocus","index","secure","inputStyles","otpType"]),h=Object(i.useRef)(null),b=Object(i.useRef)(!1);Object(i.useEffect)((function(){n&&t&&h.current.focus()}),[]),Object(i.useEffect)((function(){b.current&&t&&h.current.focus(),b.current=!0}),[t]);var y="text";return d?y="password":"number"===m&&(y="tel"),o.a.createElement("input",Object.assign({style:a({},f,p),type:y,maxLength:"1",ref:h,disabled:r,onFocus:function(e){return c(l,e)},value:s||""},v))})),m=function(e){var t=e.autoFocus,n=e.value,r=e.otpType,a=e.onChange,u=e.OTPLength,o=s(Object(i.useState)(t?0:-1),2),c=o[0],l=o[1],d=function(){return n?n.toString().split(""):[]},f=function(e){var t=e.join("");a(t)},p=function(){!function(e){var t=Math.max(Math.min(u-1,e),0);l(t)}("next"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"next")?c+1:c-1)},m=function(e){var t=s(e,1)[0],n=d();n[c]=t,f(n)},v=function(e){switch(r){case"number":return!(e.charCodeAt(0)>57||e.charCodeAt(0)<48);case"alpha":return!(e.charCodeAt(0)>122||e.charCodeAt(0)<65);case"alphanumeric":return!(e.charCodeAt(0)>122||e.charCodeAt(0)<48);default:return!0}};return{activeInput:c,getOtpValue:d,handleOnChange:function(e){v(e.target.value)&&(m(e.target.value),p("next"))},handleOnKeyDown:function(e){switch(e.key){case"Backspace":e.preventDefault(),m(""),p("prev");break;case"Delete":e.preventDefault(),m("");break;case"ArrowLeft":e.preventDefault(),p("prev");break;case"ArrowRight":e.preventDefault(),p("next")}},handelOnInput:function(e){e.target.value.length>1&&(e.preventDefault(),p("next"))},handleOnPaste:function(e,t){e.preventDefault();for(var n=d(),r=e.clipboardData.getData("text/plain").slice(0,u-c).split(""),a=0;a<u;++a)a>=c&&r.length>0&&(n[a]=r.shift());for(var i=[n.length],o=0,s=0;s<n.length;++s)v(n[s])&&(i[o]=n[s],o++);f(i)},onInputFocus:function(e,t){l(e),t.target.select()}}},v=function(e){var t=e.OTPLength,n=e.disabled,r=e.autoFocus,u=e.value,s=void 0===u?"":u,c=e.onChange,l=e.otpType,d=e.secure,f=e.className,v=e.inputClassName,h=e.inputStyles,b=e.style,y=e.placeholder,x=m({autoFocus:r,value:s,otpType:l,onChange:c,OTPLength:t}),g=x.activeInput,Z=x.getOtpValue,I=x.handleOnChange,j=x.handleOnKeyDown,O=x.handelOnInput,N=x.handleOnPaste,C=x.onInputFocus,S=Object(i.useMemo)((function(){for(var e=Z(),a=[],u=0;u<t;u++)a.push(o.a.createElement(p,{className:v,inputStyles:h,key:u,focus:g===u,value:e[u],onChange:I,onKeyDown:j,onInput:O,onPaste:N,onInputFocus:C,index:u,disabled:n,autoFocus:r,secure:d,"data-testid":"input",otpType:l,placeholder:y&&y[u]}));return a}),[Z,t,v,h,g,I,j,O,N,C,n,r,d,l,y]);return o.a.createElement("div",{style:a({display:"flex"},b),className:"".concat(f),"data-testid":"otp-input-root"},S)};v.defaultProps={className:"",inputClassName:"",OTPLength:4,onChange:function(){},disabled:!1,secure:!1,autoFocus:!1,value:"",otpType:"any",inputStyles:{},style:{},placeholder:void 0};var h=v;n.d(t,"ResendOTP",(function(){return d})),n.d(t,"default",(function(){return h}))}]))},311:function(e,t,n){"use strict";n.d(t,{B:function(){return Z},m:function(){return g}});var r=n(1413),a=n(5987),u=n(9439),i=n(9886),o=n(7200),s=n(7872),c=n(9084),l=n(2996),d=n(2503),f=n(6992),p=n(2796),m=n(2791),v=n(184),h=["children","className"],b=(0,i.k)({name:"InputGroupStylesContext",errorMessage:"useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<InputGroup />\" "}),y=(0,u.Z)(b,2),x=y[0],g=y[1],Z=(0,s.G)((function(e,t){var n=(0,c.jC)("Input",e),u=(0,l.Lr)(e),i=u.children,s=u.className,b=(0,a.Z)(u,h),y=(0,f.cx)("chakra-input__group",s),g={},Z=(0,o.W)(i),I=n.field;Z.forEach((function(e){var t,r;n&&(I&&"InputLeftElement"===e.type.id&&(g.paddingStart=null!=(t=I.height)?t:I.h),I&&"InputRightElement"===e.type.id&&(g.paddingEnd=null!=(r=I.height)?r:I.h),"InputRightAddon"===e.type.id&&(g.borderEndRadius=0),"InputLeftAddon"===e.type.id&&(g.borderStartRadius=0))}));var j=Z.map((function(t){var n,r,a=(0,p.o)({size:(null==(n=t.props)?void 0:n.size)||e.size,variant:(null==(r=t.props)?void 0:r.variant)||e.variant});return"Input"!==t.type.id?(0,m.cloneElement)(t,a):(0,m.cloneElement)(t,Object.assign(a,g,t.props))}));return(0,v.jsx)(d.m.div,(0,r.Z)((0,r.Z)({className:y,ref:t,__css:{width:"100%",display:"flex",position:"relative",isolation:"isolate"},"data-group":!0},b),{},{children:(0,v.jsx)(x,{value:n,children:j})}))}));Z.displayName="InputGroup"},2322:function(e,t,n){"use strict";n.d(t,{Ui:function(){return m}});var r=n(1413),a=n(5987),u=n(311),i=n(2503),o=n(7872),s=n(6992),c=n(184),l=["placement"],d={left:{marginEnd:"-1px",borderEndRadius:0,borderEndColor:"transparent"},right:{marginStart:"-1px",borderStartRadius:0,borderStartColor:"transparent"}},f=(0,i.m)("div",{baseStyle:{flex:"0 0 auto",width:"auto",display:"flex",alignItems:"center",whiteSpace:"nowrap"}}),p=(0,o.G)((function(e,t){var n,i=e.placement,o=void 0===i?"left":i,s=(0,a.Z)(e,l),p=null!=(n=d[o])?n:{},m=(0,u.m)();return(0,c.jsx)(f,(0,r.Z)((0,r.Z)({ref:t},s),{},{__css:(0,r.Z)((0,r.Z)({},m.addon),p)}))}));p.displayName="InputAddon";var m=(0,o.G)((function(e,t){return(0,c.jsx)(p,(0,r.Z)((0,r.Z)({ref:t,placement:"left"},e),{},{className:(0,s.cx)("chakra-input__left-addon",e.className)}))}));m.displayName="InputLeftAddon",m.id="InputLeftAddon";var v=(0,o.G)((function(e,t){return(0,c.jsx)(p,(0,r.Z)((0,r.Z)({ref:t,placement:"right"},e),{},{className:(0,s.cx)("chakra-input__right-addon",e.className)}))}));v.displayName="InputRightAddon",v.id="InputRightAddon"},7806:function(e,t,n){"use strict";n.d(t,{x:function(){return b}});var r=n(4942),a=n(1413),u=n(5987),i=n(311),o=n(2503),s=n(7872),c=n(6992),l=n(184),d=["placement"],f=["className"],p=["className"],m=(0,o.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),v=(0,s.G)((function(e,t){var n,o,s,c=e.placement,f=void 0===c?"left":c,p=(0,u.Z)(e,d),v=(0,i.m)(),h=v.field,b="left"===f?"insetStart":"insetEnd",y=(0,a.Z)((n={},(0,r.Z)(n,b,"0"),(0,r.Z)(n,"width",null!=(o=null==h?void 0:h.height)?o:null==h?void 0:h.h),(0,r.Z)(n,"height",null!=(s=null==h?void 0:h.height)?s:null==h?void 0:h.h),(0,r.Z)(n,"fontSize",null==h?void 0:h.fontSize),n),v.element);return(0,l.jsx)(m,(0,a.Z)({ref:t,__css:y},p))}));v.id="InputElement",v.displayName="InputElement";var h=(0,s.G)((function(e,t){var n=e.className,r=(0,u.Z)(e,f),i=(0,c.cx)("chakra-input__left-element",n);return(0,l.jsx)(v,(0,a.Z)({ref:t,placement:"left",className:i},r))}));h.id="InputLeftElement",h.displayName="InputLeftElement";var b=(0,s.G)((function(e,t){var n=e.className,r=(0,u.Z)(e,p),i=(0,c.cx)("chakra-input__right-element",n);return(0,l.jsx)(v,(0,a.Z)({ref:t,placement:"right",className:i},r))}));b.id="InputRightElement",b.displayName="InputRightElement"},1470:function(e,t,n){"use strict";n.d(t,{g:function(){return o}});var r=n(1413),a=n(5193),u=n(7872),i=n(184),o=(0,u.G)((function(e,t){return(0,i.jsx)(a.K,(0,r.Z)((0,r.Z)({align:"center"},e),{},{direction:"column",ref:t}))}));o.displayName="VStack"},8206:function(e,t,n){"use strict";n.d(t,{W:function(){return f}});var r=n(1413),a=n(5987),u=n(7872),i=n(2996),o=n(9084),s=n(2503),c=n(6992),l=n(184),d=["className","centerContent"],f=(0,u.G)((function(e,t){var n=(0,i.Lr)(e),u=n.className,f=n.centerContent,p=(0,a.Z)(n,d),m=(0,o.mq)("Container",e);return(0,l.jsx)(s.m.div,(0,r.Z)((0,r.Z)({ref:t,className:(0,c.cx)("chakra-container",u)},p),{},{__css:(0,r.Z)((0,r.Z)({},m),f&&{display:"flex",flexDirection:"column",alignItems:"center"})}))}));f.displayName="Container"},7718:function(e,t,n){"use strict";n.d(t,{n:function(){return l}});var r=n(1413),a=n(3580),u=n(9741),i=n(6992),o=n(7872),s=n(2503),c=n(184),l=(0,o.G)((function(e,t){var n=(0,u.bt)(e),o=(0,a.s)();return(0,c.jsx)(s.m.div,(0,r.Z)((0,r.Z)({},n),{},{width:"100%",ref:t,className:(0,i.cx)("chakra-tabs__tab-panels",e.className),__css:o.tabpanels}))}));l.displayName="TabPanels"},6589:function(e,t,n){"use strict";n.d(t,{x:function(){return l}});var r=n(1413),a=n(3580),u=n(9741),i=n(6992),o=n(7872),s=n(2503),c=n(184),l=(0,o.G)((function(e,t){var n=(0,u.WE)((0,r.Z)((0,r.Z)({},e),{},{ref:t})),o=(0,a.s)();return(0,c.jsx)(s.m.div,(0,r.Z)((0,r.Z)({outline:"0"},n),{},{className:(0,i.cx)("chakra-tabs__tab-panel",e.className),__css:o.tabpanel}))}));l.displayName="TabPanel"},9741:function(e,t,n){"use strict";n.d(t,{mE:function(){return Z},X:function(){return w},xD:function(){return k},hp:function(){return _},WE:function(){return F},bt:function(){return R},YE:function(){return N}});var r=n(1413),a=n(4942),u=n(5987),i=n(9439),o=n(7799),s=n(546),c=n(9886),l=n(2791),d=n(6367);var f=n(7200),p=n(4591),m=n(637),v=n(6992),h=["defaultIndex","onChange","index","isManual","isLazy","lazyBehavior","orientation","direction"],b=["isDisabled","isFocusable"],y=["children"],x=(0,s.n)(),g=(0,i.Z)(x,4),Z=g[0],I=g[1],j=g[2],O=g[3];function N(e){var t,n=e.defaultIndex,r=e.onChange,a=e.index,o=e.isManual,s=e.isLazy,c=e.lazyBehavior,f=void 0===c?"unmount":c,p=e.orientation,m=void 0===p?"horizontal":p,v=e.direction,b=void 0===v?"ltr":v,y=(0,u.Z)(e,h),x=(0,l.useState)(null!=n?n:0),g=(0,i.Z)(x,2),Z=g[0],I=g[1],O=function(e){var t=e.value,n=e.defaultValue,r=e.onChange,a=e.shouldUpdate,u=void 0===a?function(e,t){return e!==t}:a,o=(0,d.W)(r),s=(0,d.W)(u),c=(0,l.useState)(n),f=(0,i.Z)(c,2),p=f[0],m=f[1],v=void 0!==t,h=v?t:p,b=(0,d.W)((function(e){var t="function"===typeof e?e(h):e;s(h,t)&&(v||m(t),o(t))}),[v,o,h,s]);return[h,b]}({defaultValue:null!=n?n:0,value:a,onChange:r}),N=(0,i.Z)(O,2),C=N[0],S=N[1];(0,l.useEffect)((function(){null!=a&&I(a)}),[a]);var w=j(),E=(0,l.useId)(),_=null!=(t=e.id)?t:E;return{id:"tabs-".concat(_),selectedIndex:C,focusedIndex:Z,setSelectedIndex:S,setFocusedIndex:I,isManual:o,isLazy:s,lazyBehavior:f,orientation:m,descendants:w,direction:b,htmlProps:y}}var C=(0,c.k)({name:"TabsContext",errorMessage:"useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"}),S=(0,i.Z)(C,2),w=S[0],E=S[1];function _(e){var t=E(),n=t.focusedIndex,u=t.orientation,i=t.direction,o=I(),s=(0,l.useCallback)((function(e){var t,r=function(){var e,t=o.nextEnabled(n);t&&(null==(e=t.node)||e.focus())},s=function(){var e,t=o.prevEnabled(n);t&&(null==(e=t.node)||e.focus())},c="horizontal"===u,l="vertical"===u,d=e.key,f="ltr"===i?"ArrowLeft":"ArrowRight",p="ltr"===i?"ArrowRight":"ArrowLeft",m=(t={},(0,a.Z)(t,f,(function(){return c&&s()})),(0,a.Z)(t,p,(function(){return c&&r()})),(0,a.Z)(t,"ArrowDown",(function(){return l&&r()})),(0,a.Z)(t,"ArrowUp",(function(){return l&&s()})),(0,a.Z)(t,"Home",(function(){var e,t=o.firstEnabled();t&&(null==(e=t.node)||e.focus())})),(0,a.Z)(t,"End",(function(){var e,t=o.lastEnabled();t&&(null==(e=t.node)||e.focus())})),t)[d];m&&(e.preventDefault(),m(e))}),[o,n,u,i]);return(0,r.Z)((0,r.Z)({},e),{},{role:"tablist","aria-orientation":u,onKeyDown:(0,v.v0)(e.onKeyDown,s)})}function k(e){var t=e.isDisabled,n=e.isFocusable,a=(0,u.Z)(e,b),i=E(),s=i.setSelectedIndex,c=i.isManual,l=i.id,d=i.setFocusedIndex,f=i.selectedIndex,m=O({disabled:t&&!n}),h=m.index,y=m.register,x=h===f,g=(0,o.h)((0,r.Z)((0,r.Z)({},a),{},{ref:(0,p.lq)(y,e.ref),isDisabled:t,isFocusable:n,onClick:(0,v.v0)(e.onClick,(function(){s(h)}))}));return(0,r.Z)((0,r.Z)({},g),{},{id:L(l,h),role:"tab",tabIndex:x?0:-1,type:"button","aria-selected":x,"aria-controls":G(l,h),onFocus:t?void 0:(0,v.v0)(e.onFocus,(function(){d(h),!c&&!(t&&n)&&s(h)}))})}var T=(0,c.k)({}),P=(0,i.Z)(T,2),A=P[0],D=P[1];function R(e){var t=E(),n=t.id,a=t.selectedIndex,u=(0,f.W)(e.children).map((function(e,t){return(0,l.createElement)(A,{key:t,value:{isSelected:t===a,id:G(n,t),tabId:L(n,t),selectedIndex:a}},e)}));return(0,r.Z)((0,r.Z)({},e),{},{children:u})}function F(e){var t=e.children,n=(0,u.Z)(e,y),a=E(),i=a.isLazy,o=a.lazyBehavior,s=D(),c=s.isSelected,d=s.id,f=s.tabId,p=(0,l.useRef)(!1);c&&(p.current=!0);var v=(0,m.k)({wasSelected:p.current,isSelected:c,enabled:i,mode:o});return(0,r.Z)((0,r.Z)({tabIndex:0},n),{},{children:v?t:null,role:"tabpanel","aria-labelledby":f,hidden:!c,id:d})}function L(e,t){return"".concat(e,"--tab-").concat(t)}function G(e,t){return"".concat(e,"--tabpanel-").concat(t)}},9137:function(e,t,n){"use strict";n.d(t,{O:function(){return l}});var r=n(1413),a=n(3580),u=n(9741),i=n(6992),o=n(7872),s=n(2503),c=n(184),l=(0,o.G)((function(e,t){var n=(0,a.s)(),o=(0,u.xD)((0,r.Z)((0,r.Z)({},e),{},{ref:t})),l=(0,r.Z)({outline:"0",display:"flex",alignItems:"center",justifyContent:"center"},n.tab);return(0,c.jsx)(s.m.button,(0,r.Z)((0,r.Z)({},o),{},{className:(0,i.cx)("chakra-tabs__tab",e.className),__css:l}))}));l.displayName="Tab"},7342:function(e,t,n){"use strict";n.d(t,{t:function(){return l}});var r=n(1413),a=n(3580),u=n(9741),i=n(6992),o=n(7872),s=n(2503),c=n(184),l=(0,o.G)((function(e,t){var n=(0,u.hp)((0,r.Z)((0,r.Z)({},e),{},{ref:t})),o=(0,a.s)(),l=(0,r.Z)({display:"flex"},o.tablist);return(0,c.jsx)(s.m.div,(0,r.Z)((0,r.Z)({},n),{},{className:(0,i.cx)("chakra-tabs__tablist",e.className),__css:l}))}));l.displayName="TabList"},3580:function(e,t,n){"use strict";n.d(t,{m:function(){return I},s:function(){return Z}});var r=n(1413),a=n(5987),u=n(9439),i=n(9741),o=n(9886),s=n(7872),c=n(9084),l=n(2996),d=n(2503),f=n(6992),p=n(2791),m=n(184),v=["children","className"],h=["htmlProps","descendants"],b=["isFitted"],y=(0,o.k)({name:"TabsStylesContext",errorMessage:"useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Tabs />\" "}),x=(0,u.Z)(y,2),g=x[0],Z=x[1],I=(0,s.G)((function(e,t){var n=(0,c.jC)("Tabs",e),u=(0,l.Lr)(e),o=u.children,s=u.className,y=(0,a.Z)(u,v),x=(0,i.YE)(y),Z=x.htmlProps,I=x.descendants,j=(0,a.Z)(x,h),O=(0,p.useMemo)((function(){return j}),[j]),N=(Z.isFitted,(0,a.Z)(Z,b));return(0,m.jsx)(i.mE,{value:I,children:(0,m.jsx)(i.X,{value:O,children:(0,m.jsx)(g,{value:n,children:(0,m.jsx)(d.m.div,(0,r.Z)((0,r.Z)({className:(0,f.cx)("chakra-tabs",s),ref:t},N),{},{__css:n.root,children:o}))})})})}));I.displayName="Tabs"}}]);
//# sourceMappingURL=100.2fda35d2.chunk.js.map