import { ITEM } from "./index";

function open_db(name: string, version: number): Promise<IDBDatabase> {
	const req = window.indexedDB.open(name, version);
	return new Promise((res, rej) => {
		req.addEventListener("success", (e) => {
			res((e.target as IDBOpenDBRequest).result);
		});
		req.addEventListener("error", (e) => {
			rej(e);
		});

		req.addEventListener("upgradeneeded", (e) => {
			console.log(2);
			const db_base = (e.target as IDBOpenDBRequest).result;
			const store = db_base.createObjectStore(name, { keyPath: "id", autoIncrement: false });
			store.createIndex("name", "name", { unique: false });
			store.createIndex("age", "age", { unique: false });
		});
	});
}

function get_transaction(db: IDBDatabase, ...args: Parameters<IDBDatabase["transaction"]>): IDBTransaction {
	return db.transaction(...args);
}

function get_store(transaction: IDBTransaction, store_name: string): IDBObjectStore {
	return transaction.objectStore(store_name);
}

function add_item<T>(store: IDBObjectStore, items: Array<T>) {
	items.forEach((item) => {
		store.add(item);
	});
}
function delete_item<T extends {}>(store: IDBObjectStore, items: Array<Partial<T>>) {
	items.forEach((item) => {
		const key = Object.keys(item)[0] as keyof Partial<T>;
		const index = store.index(key as string);
		const req = index.openCursor(IDBKeyRange.only(item[key]));
		req.addEventListener("success", (e) => {
			const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
			if (cursor) {
				cursor.delete();
				cursor.continue();
			}
		});
	});
}

function update_item<T extends {}>(store: IDBObjectStore, item: Partial<T>) {
	const key = Object.keys(item)[0] as keyof T;
	const req = store.index(key as string).openCursor(IDBKeyRange.only(item[key]));
	req.addEventListener("success", (e) => {
		const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
		if (cursor) {
			const value = cursor.value;
			cursor.update({ ...value, ...item });
		}
	});
}

function get_items<T extends {}>(store: IDBObjectStore, filter: Partial<T>): Promise<Array<T>> {
	const key = Object.keys(filter)[0] as keyof T;
	const index = store.index(key as string);
	const req = index.getAll(IDBKeyRange.only(filter[key]));
	return new Promise((res, rej) => {
		req.addEventListener("success", (e) => {
			const result = (e.target as IDBRequest<Array<T>>).result;
			res(result);
		});
		req.addEventListener("error", (e) => {
			rej(e);
		});
	});
}

export { open_db, get_transaction, get_store, add_item, delete_item, update_item, get_items };
