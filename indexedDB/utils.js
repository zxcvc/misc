function open_db(name, version) {
    const req = window.indexedDB.open(name, version);
    return new Promise((res, rej) => {
        req.addEventListener("success", (e) => {
            res(e.target.result);
        });
        req.addEventListener("error", (e) => {
            rej(e);
        });
        req.addEventListener("upgradeneeded", (e) => {
            console.log(2);
            const db_base = e.target.result;
            const store = db_base.createObjectStore(name, { keyPath: "id", autoIncrement: false });
            store.createIndex("name", "name", { unique: false });
            store.createIndex("age", "age", { unique: false });
        });
    });
}
function get_transaction(db, ...args) {
    return db.transaction(...args);
}
function get_store(transaction, store_name) {
    return transaction.objectStore(store_name);
}
function add_item(store, items) {
    items.forEach((item) => {
        store.add(item);
    });
}
function delete_item(store, items) {
    items.forEach((item) => {
        const key = Object.keys(item)[0];
        const index = store.index(key);
        const req = index.openCursor(IDBKeyRange.only(item[key]));
        req.addEventListener("success", (e) => {
            const cursor = e.target.result;
            if (cursor) {
                cursor.delete();
                cursor.continue();
            }
        });
    });
}
function update_item(store, item) {
    const key = Object.keys(item)[0];
    const req = store.index(key).openCursor(IDBKeyRange.only(item[key]));
    req.addEventListener("success", (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const value = cursor.value;
            cursor.update({ ...value, ...item });
        }
    });
}
function get_items(store, filter) {
    const key = Object.keys(filter)[0];
    const index = store.index(key);
    const req = index.getAll(IDBKeyRange.only(filter[key]));
    return new Promise((res, rej) => {
        req.addEventListener("success", (e) => {
            const result = e.target.result;
            res(result);
        });
        req.addEventListener("error", (e) => {
            rej(e);
        });
    });
}
export { open_db, get_transaction, get_store, add_item, delete_item, update_item, get_items };
