"use strict";
const dragable_el = document.querySelector("#dragable");
const dropable_el = document.querySelector("#dropable");
dragable_el.addEventListener("dragstart", (e) => {
    console.log("2323");
});
dropable_el.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log(1);
});
dropable_el.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log(e);
    // dragable_el.remove();
    dropable_el.appendChild(dragable_el);
});
