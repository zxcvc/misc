const file_el: HTMLInputElement = document.querySelector("#file")!;
const view_el: HTMLImageElement = document.querySelector("#view")!;
const img_el: HTMLImageElement = document.querySelector("#img")!;
const file_to_blob_el: HTMLButtonElement = document.querySelector("#file_to_blob")!;
const buffer_to_file_el: HTMLButtonElement = document.querySelector("#buffer_to_file")!;
const blob_to_file_el: HTMLButtonElement = document.querySelector("#blob_to_file")!;
const url_to_file_el: HTMLButtonElement = document.querySelector("#url_to_file")!;

let file: File;
let blob: Blob;
let buffer: ArrayBuffer;
let url: string;

file_el.addEventListener("change", async (e) => {
	const f = (e.target as HTMLInputElement).files![0];
	file = f;
	buffer = await f.arrayBuffer();
	blob = new Blob([f]);
	const file_reader = new FileReader();
	file_reader.addEventListener("load", (e) => {
		view_el.src = url = e.target!.result as string;
	});
	file_reader.readAsDataURL(f);
});

file_to_blob_el.addEventListener("click", async (e) => {
	const _file = file;
	const _buffer = await _file.arrayBuffer();
	const _blob = new Blob([_buffer]);
	console.log(_blob);
});
buffer_to_file_el.addEventListener("click", async (e) => {
	const file = buffer_to_file(buffer);
	set_url_for_img(await file_to_url(file));
});
blob_to_file_el.addEventListener("click", (e) => {
	const file = blob_to_file(blob);
	console.log(file);
});
url_to_file_el.addEventListener("click", async (e) => {
	const file = url_to_file(url);
	set_url_for_img(await file_to_url(file));
});

function buffer_to_file(buffer: ArrayBuffer): File {
	const file = new File([buffer], "file_01", { type: "image/jpeg" });
	return file;
}

function blob_to_file(blob: Blob): File {
	const file = new File([blob], "file_02", { type: "image/jpeg" });
	return file;
}
function url_to_file(url: string): File {
	const res = url.match(/data:(?<main_type>.+)?(;base64),/)!;
	const type = res.groups!.main_type;
	let data = url.substring(res[0].length);
	data = atob(data);
	const buffer = new Uint8ClampedArray(data.length);
	for (let i = 0; i < data.length; ++i) {
		buffer[i] = data.charCodeAt(i);
	}
	const file = new File([buffer], "file_03", { type });
	return file;
}
function file_to_url(file: File): Promise<string> {
	return new Promise((res, rej) => {
		const file_reader = new FileReader();
		file_reader.addEventListener("load", (e) => {
			res(file_reader.result as string);
		});
		file_reader.readAsDataURL(file);
	});
}

function set_url_for_img(url: string) {
	img_el.src = url;
}
