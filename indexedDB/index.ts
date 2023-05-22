import { get_store, open_db, get_transaction, add_item, delete_item, update_item, get_items } from "./utils";
const DBNAME = "user";
let VERSION = 1;
type ITEM = { id: number; name: string; age: number };
const { 0: add_el, 1: delete_el, 2: update_el, 3: query_el } = document.querySelectorAll("button:not(#submit)");
const name_input_el: HTMLInputElement = document.querySelector("#name")!;
const age_input_el: HTMLInputElement = document.querySelector("#age")!;

function get_data(): Partial<ITEM> {
	const name = name_input_el.value;
	const age = age_input_el.value;
	const item: Partial<ITEM> = {};
	if (name !== "") item.name = name;
	if (age !== "") item.age = Number(age);
	return item;
}

const db = await open_db(DBNAME, VERSION);

add_el.addEventListener("click", (e) => {
	const transaction = get_transaction(db, ["user"], "readwrite");
	transaction.addEventListener("complete", (e) => {
		console.log("事务完成", e);
	});
	transaction.addEventListener("error", (e) => {
		console.log("事务失败", e);
	});
	const store = get_store(transaction, "user");
	const item = get_data();
	item.id = Math.random();
	add_item<ITEM>(store, [item as ITEM]);
});

delete_el.addEventListener("click", (e) => {
	const transaction = get_transaction(db, ["user"], "readwrite");
	transaction.addEventListener("complete", (e) => {
		console.log("事务完成", e);
	});
	transaction.addEventListener("error", (e) => {
		console.log("事务失败", e);
	});
	const store = get_store(transaction, "user");
	const item = get_data();
	delete_item<ITEM>(store, [item]);
});

update_el.addEventListener("click", (e) => {
	const transaction = get_transaction(db, ["user"], "readwrite");
	transaction.addEventListener("complete", (e) => {
		console.log("事务完成", e);
	});
	transaction.addEventListener("error", (e) => {
		console.log("事务失败", e);
	});
	const store = get_store(transaction, "user");
	const item = get_data();
	update_item<ITEM>(store, item);
});

query_el.addEventListener("click", async (e) => {
	const transaction = get_transaction(db, ["user"], "readwrite");
	transaction.addEventListener("complete", (e) => {
		console.log("事务完成", e);
	});
	transaction.addEventListener("error", (e) => {
		console.log("事务失败", e);
	});
	const store = get_store(transaction, "user");
	const item = get_data();
	const items = await get_items(store, item);
	console.log(items);
});

export { ITEM };
