let r_stream = new Response("12").body;
r_stream = r_stream?.pipeThrough(new TransformStream({
    start() { },
    transform(chuck, controller) {
        const s = String.fromCharCode(...chuck);
        const n = Number(s) + 10;
        controller.enqueue(Uint8Array.from([n + 50]));
    },
}));
const res = new Response(r_stream);
let body = res.body;
const a = await res.text();
console.log(a);
export {};
