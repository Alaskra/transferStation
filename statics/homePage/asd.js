"use strict";

function _typeof(o) {
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
  }, _typeof(o)
}

!function (o, t) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (o = o || self, o.cocoMessage = t())
}(void 0, function () {
  function o(o, t) {
    var e = document.createElement("div");
    for (var n in o) {
      var s = o[n];
      "className" == n ? (n = "class", e.setAttribute(n, s)) : "_" == n[0] && e.addEventListener(n.slice(1), s)
    }
    if ("string" == typeof t) e.innerHTML = t; else if ("object" == _typeof(t) && t.tagName) e.appendChild(t); else if (t) for (var i = 0; i < t.length; i++) {
      var c = t[i];
      e.appendChild(c)
    }
    return e
  }

  function t(o, t) {
    ["a", "webkitA"].forEach(function (e) {
      var n = e + "nimationEnd";
      o.addEventListener(n, function () {
        t()
      })
    })
  }

  function e(o, t) {
    for (var e in t) o.style[e] = t[e];
    "" === o.getAttribute("style") && o.removeAttribute("style")
  }

  function n(o, t) {
    var e = o.className || "";
    if (!s(e, t)) {
      var n = e.split(/\s+/);
      n.push(t), o.className = n.join(" ")
    }
  }

  function s(o, t) {
    return o.indexOf(t) > -1
  }

  function i(o, t) {
    var e = o.className || "";
    if (s(e, t)) {
      var n = e.split(/\s+/), i = n.indexOf(t);
      n.splice(i, 1), o.className = n.join(" ")
    }
    "" === o.className && o.removeAttribute("class")
  }

  function c(o, t) {
    var e = {};
    for (var n in h) e[n] = h[n];
    for (var s = 0; s < o.length; s++) {
      var i = o[s];
      void 0 !== i && ("string" == typeof i || "object" == _typeof(i) ? e.msg = i : "boolean" == typeof i ? e.showClose = i : "function" == typeof i ? e.onClose = i : "number" == typeof i && (e.duration = i))
    }
    return e.type = t, r(e)
  }

  function r(n) {
    var s = n.type, c = n.duration, r = n.msg, d = n.showClose, g = n.onClose, m = 0 === c, h = l();
    "loading" == s && (r = "" === r ? "正在加载，请稍后" : r, m = d, c = 0);
    var u = o({className: "coco-msg-wrapper"}, [o({className: "coco-msg coco-msg-fade-in ".concat(s)}, [o({className: "coco-msg-icon"}, h[s]), o({className: "coco-msg-content"}, r), o({
      className: "coco-msg-wait ".concat(m ? "coco-msg-pointer" : ""),
      _click: function () {
        m && f(u, g)
      }
    }, a(m))])]), v = u.querySelector(".coco-msg__circle");
    if (v && "loading" !== s && (e(v, {animation: "coco-msg__circle ".concat(c, "ms linear")}), "onanimationend" in window ? t(v, function () {
      f(u, g)
    }) : setTimeout(function () {
      f(u, g)
    }, c)), "loading" == s && 0 !== c && setTimeout(function () {
      f(u, g)
    }, c), p.children.length || document.body.appendChild(p), p.appendChild(u), e(u, {height: u.offsetHeight + "px"}), setTimeout(function () {
      i(u.children[0], "coco-msg-fade-in")
    }, 300), "loading" == s) return function () {
      f(u, g)
    }
  }

  function a(o) {
    return o ? '\n    <svg class="coco-msg-close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515"></path></svg>\n    ' : '<svg class="coco-msg-progress" viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">\n    <circle class="coco-msg__background" cx="16.9" cy="16.9" r="15.9"></circle>\n    <circle class="coco-msg__circle" stroke-dasharray="100,100" cx="16.9" cy="16.9" r="15.9"></circle>\n    </svg>\n    '
  }

  function f(o, t) {
    o && (e(o, {padding: 0, height: 0}), n(o.children[0], "coco-msg-fade-out"), t && t(), setTimeout(function () {
      if (o) {
        for (var t = !1, e = 0; e < p.children.length; e++) p.children[e] === o && (t = !0);
        t && d(o), o = null, p.children.length || t && d(p)
      }
    }, 300))
  }

  function l() {
    return {
      info: '\n    <svg t="1609810636603" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3250"><path d="M469.333333 341.333333h85.333334v469.333334H469.333333z" fill="#ffffff" p-id="3251"></path><path d="M469.333333 213.333333h85.333334v85.333334H469.333333z" fill="#ffffff" p-id="3252"></path><path d="M384 341.333333h170.666667v85.333334H384z" fill="#ffffff" p-id="3253"></path><path d="M384 725.333333h256v85.333334H384z" fill="#ffffff" p-id="3254"></path></svg>\n    ',
      success: '\n    <svg t="1609781242911" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1807"><path d="M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z" p-id="1808" fill="#ffffff"></path><path d="M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z" p-id="1809" fill="#ffffff"></path></svg>\n    ',
      warning: '\n    <svg t="1609776406944" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18912"><path d="M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z" p-id="18913" fill="#ffffff"></path></svg>\n    ',
      error: '\n    <svg t="1609810716933" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515" fill="#ffffff"></path></svg>\n    ',
      loading: '\n    <div class="coco-msg_loading">\n    <svg class="coco-msg-circular" viewBox="25 25 50 50">\n      <circle class="coco-msg-path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>\n    </div>\n    '
    }
  }

  function d(o) {
    o && o.parentNode.removeChild(o)
  }

  function g() {
    for (var o = 0; o < p.children.length; o++) {
      var t = p.children[o];
      f(t)
    }
  }

  function m() {
    var o = document;
    if (o && o.head) {
      var t = o.head, e = o.createElement("style"),
        n = "\n[class|=coco],[class|=coco]::after,[class|=coco]::before{box-sizing:border-box;outline:0}.coco-msg-progress{width:14px;height:14px}.coco-msg__circle{stroke-width:2;stroke-linecap:square;fill:none;transform:rotate(-90deg);transform-origin:center}.coco-msg-stage:hover .coco-msg__circle{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}.coco-msg__background{stroke-width:2;fill:none}.coco-msg-stage{position:fixed;top:20px;left:50%;width:auto;transform:translate(-50%,0);z-index:3000}.coco-msg-wrapper{position:relative;left:50%;transform:translate(-50%,0);transition:height .25s ease-out,padding .25s ease-out;transition:height .35s ease-out,padding .35s ease-out;padding:8px 0;will-change:transform,opacity}.coco-msg-content,.coco-msg-icon,.coco-msg-wait{display:inline-block}.coco-msg-icon{position:relative;width:13px;height:13px;border-radius:100%;display:flex;justify-content:center;align-items:center;opacity:.8}.coco-msg-icon svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:11px;height:11px;box-sizing:content-box}.coco-msg-wait{width:20px;height:20px;position:relative}.coco-msg-wait svg{position:absolute;top:50%;right:-4px;transform:translate(0,-50%);fill:#b3b9b9}.coco-msg-close{width:16px;height:16px}.coco-msg-content{margin:0 10px;min-width:220px;text-align:left;font-size:14px;font-weight:400}.coco-msg.error .coco-msg-icon,.coco-msg.info .coco-msg-icon,.coco-msg.success .coco-msg-icon,.coco-msg.warning .coco-msg-icon{background-color:currentColor}.coco-msg{padding:13px 25px;border-radius:2px;position:relative;left:50%;transform:translate(-50%,0);display:flex;align-items:center}.coco-msg.info,.coco-msg.loading{color:#635f6b;background-color:#f3f3f4;box-shadow:0 0 1px 0 rgba(239,238,240,.3)}.coco-msg.success{color:#68c43b;background-color:#f0faeb;box-shadow:0 0 1px 0 rgba(145,194,126,.3)}.coco-msg.warning{color:#be820a;background-color:#faf4e1;box-shadow:0 0 1px 0 rgba(212,198,149,.3)}.coco-msg.error{color:#f74e60;background-color:#fee2e5;box-shadow:0 0 1px 0 rgba(218,163,163,.3)}.coco-msg.loading .coco-msg-icon{background-color:transparent}@keyframes coco-msg__circle{0%{stroke:#b3b9b9;stroke:currentColor}to{stroke:#b3b9b9;stroke:currentColor;stroke-dasharray:0 100}}.coco-msg_loading{flex-shrink:0;width:20px;height:20px;position:relative}.coco-msg-circular{-webkit-animation:coco-msg-rotate 2s linear infinite both;animation:coco-msg-rotate 2s linear infinite both;transform-origin:center center;height:18px!important;width:18px!important}.coco-msg-path{stroke-dasharray:1,200;stroke-dashoffset:0;stroke:currentColor;-webkit-animation:coco-msg-dash 1.5s ease-in-out infinite;animation:coco-msg-dash 1.5s ease-in-out infinite;stroke-linecap:round}@-webkit-keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.coco-msg-pointer{cursor:pointer}.coco-msg-fade-in{-webkit-animation:coco-msg-fade .22s ease-out both;animation:coco-msg-fade .22s ease-out both}.coco-msg-fade-out{animation:coco-msg-fade .22s linear reverse both}@-webkit-keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,0)}to{opacity:1;transform:translate(-50%,0)}}@keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}\n      ";
      e.innerHTML = n, t.children.length ? t.insertBefore(e, t.children[0]) : t.appendChild(e)
    }
  }

  if ("undefined" != typeof window) {
    var p = o({className: "coco-msg-stage"}), h = {msg: "", duration: 2e3, showClose: !1}, u = {
      info: function () {
        c(arguments, "info")
      }, success: function () {
        c(arguments, "success")
      }, warning: function () {
        c(arguments, "warning")
      }, error: function () {
        c(arguments, "error")
      }, loading: function () {
        return c(arguments, "loading")
      }, destroyAll: function () {
        g()
      }, config: function (o) {
        for (var t in o) Object.hasOwnProperty.call(o, t) && void 0 !== o[t] && (h[t] = o[t])
      }
    };
    return window.addEventListener("DOMContentLoaded", function () {
      m()
    }), u
  }
});