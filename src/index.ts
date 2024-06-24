import path from "node:path"
import { fileURLToPath } from "node:url"
import type { AstroIntegration, AstroRenderer } from "astro"

// Get the current file path
const __filename = fileURLToPath(import.meta.url)

// Get the directory name of the current file
const __dirname = path.dirname(__filename)

const pathToClientJs = path.resolve(__dirname, "../client.js")
const pathToServerJs = path.resolve(__dirname, "../server.js")

function getRenderer(): AstroRenderer {
	return {
		name: "@betabong/astro-init",
		clientEntrypoint: pathToClientJs,
		serverEntrypoint: pathToServerJs,
	}
}

export default function (options?: any): AstroIntegration {
	return {
		name: "@betabong/astro-init",
		hooks: {
			"astro:config:setup": async ({ addRenderer }) => {
				addRenderer(getRenderer())
				if (options?.jsx) {
					addRenderer(getRenderer())
				}
			},
		},
	}
}
