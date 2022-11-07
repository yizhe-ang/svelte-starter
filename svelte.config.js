import adapterAuto from "@sveltejs/adapter-auto";
import autoprefixer from "autoprefixer";
// import adapterStatic from "@sveltejs/adapter-static";
import { readFileSync } from "fs";
import sveltePreprocess from "svelte-preprocess";

const { subdirectory } = JSON.parse(readFileSync("package.json", "utf8"));
const dev = process.env.NODE_ENV !== "production";
const dir = subdirectory || "";
const prefix = dir.startsWith("/") ? "" : "/";
const base = dev || !dir ? "" : `${prefix}${dir}`;

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	preprocess,
	kit: {
		// FIXME: Decide which adapter to use; static or no?
		adapter: adapterAuto(),
		// Prerender everything except pages that are explicitly marked as not prerenderable
		prerender: { default: true },
		trailingSlash: "always",
		paths: {
			base
		}
	},
	vitePlugin: {
		experimental: {
			inspector: { holdMode: true }
		}
	}
};

export default config;
