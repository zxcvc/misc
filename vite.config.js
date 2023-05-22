import path from "path";
import { defineConfig } from "vite";
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				file_blob_url: path.resolve(__dirname, "./file_blob_url/index.html"),
				drag: path.resolve(__dirname, "./drag/index.html"),
				indexedDB: path.resolve(__dirname, "./indexedDB/index.html"),
			},
		},
	},
});
