require.config({
	paths: {
		a: "./a",
		b: "./b",
	},
});
require(["b"], (b) => {
	console.log(b);
});
