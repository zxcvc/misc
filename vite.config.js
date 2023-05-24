import path from "path";
import { defineConfig } from "vite";
import style_scss from "./style_scss/index";
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				file_blob_url: path.resolve(__dirname, "./file_blob_url/index.html"),
				drag: path.resolve(__dirname, "./drag/index.html"),
				indexedDB: path.resolve(__dirname, "./indexedDB/index.html"),
				scroll: path.resolve(__dirname, "./scroll/index.html"),
			},
		},
		target: ["chrome90"],
	},
	plugins: [style_scss()],
});
