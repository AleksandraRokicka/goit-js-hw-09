!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.querySelector("body");document.querySelector("[data-stop]").disabled=!0;var o=null;t.addEventListener("click",(function(){o=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16));document.querySelector("[data-start]").disabled=!0,document.querySelector("[data-stop]").disabled=!1}),1e3)})),e.addEventListener("click",(function(){clearInterval(o);document.querySelector("[data-start]").disabled=!1,document.querySelector("[data-stop]").disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.c1976efc.js.map
