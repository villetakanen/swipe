import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { type Browser, chromium } from "playwright";

const NAVIGATION_TIMEOUT = 30_000;

const url = process.argv[2];
const outputPath = process.argv[3];

if (!url || !outputPath) {
	process.stderr.write("Usage: npx tsx tools/screenshot.ts <url> <output-path>\n");
	process.exit(1);
}

let browser: Browser | undefined;
try {
	browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1280, height: 800 },
	});
	const page = await context.newPage();

	await page.goto(url, {
		waitUntil: "networkidle",
		timeout: NAVIGATION_TIMEOUT,
	});

	await mkdir(dirname(outputPath), { recursive: true });

	await page.screenshot({ path: outputPath, fullPage: false });
} catch (error: unknown) {
	const message = error instanceof Error ? error.message : String(error);
	process.stderr.write(`Error: ${message}\n`);
	process.exit(1);
} finally {
	await browser?.close();
}
