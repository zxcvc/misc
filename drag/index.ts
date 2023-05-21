const dragable_el: HTMLDivElement = document.querySelector("#dragable")!;
const dropable_el: HTMLDivElement = document.querySelector("#dropable")!;

dragable_el.addEventListener("dragstart", (e: DragEvent) => {
	console.log("2323");
});

dropable_el.addEventListener("dragover", (e: DragEvent) => {
	e.preventDefault();
	console.log(1);
});

dropable_el.addEventListener("drop", (e: DragEvent) => {
	e.preventDefault();
	console.log(e);
	// dragable_el.remove();
	dropable_el.appendChild(dragable_el);
});
