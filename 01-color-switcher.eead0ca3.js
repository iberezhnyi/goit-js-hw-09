!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]"),n=null;function a(){t.disabled?d.disabled=!0:d.disabled=!1,d.disabled?t.disabled=!1:t.disabled=!0}t.addEventListener("click",(function(){a(),n=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),100)})),d.addEventListener("click",(function(){a(),clearInterval(n)})),d.disabled=!0}();
//# sourceMappingURL=01-color-switcher.eead0ca3.js.map