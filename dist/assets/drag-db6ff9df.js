import "./modulepreload-polyfill-3cfb730f.js";
const r = document.querySelector("#dragable"),
	o = document.querySelector("#dropable");
r.addEventListener("dragstart", (e) => {
	console.log("2323");
});
o.addEventListener("dragover", (e) => {
	e.preventDefault(), console.log(1);
});
o.addEventListener("drop", (e) => {
	e.preventDefault(), console.log(e), o.appendChild(r);
});
