import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
	plugins: [
		pluginReact({
			swcReactOptions: {
				importSource: "@emotion/react",
			},
		}),
		pluginSass(),
	],
	tools: {
		swc: {
			jsc: {
				experimental: {
					plugins: [["@swc/plugin-emotion", {}]],
				},
			},
		},
	},
	html: {
		tags: [
			{
				tag: "script",
				attrs: { src: "https://cdn.lordicon.com/lordicon.js" },
			},
		],
	},
});
