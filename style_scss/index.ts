// import { JSDOM } from "jsdom";
import cheerio from "cheerio";
import { compileString } from "./scss_to_css";
import { Plugin } from "vite";

export default function (): Plugin {
	return {
		name: "style_scss",
		transformIndexHtml(html, ctx) {
			const $ = cheerio.load(html);
			const styles = $("style[lang='scss']");
			for (let i = 0; i < styles.length; ++i) {
				const style = styles[i];
				const child = style.children[0] as unknown as Text;
				const css = compileString(child.nodeValue || "");
				child.nodeValue = css.css;
				$(style).removeAttr("lang");
			}
			return $.html();
		},
	};
}
