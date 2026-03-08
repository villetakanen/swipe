import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const examples = defineCollection({
	loader: glob({
		pattern: "**/*.md",
		base: "../../packages/kb/examples",
	}),
	schema: z.object({
		problem: z.string(),
		problemTitle: z.string(),
		title: z.string(),
		url: z.string().url(),
		screenshot: z.string(),
		tags: z.array(z.string()),
		design: z.object({
			summary: z.string(),
			layout: z.string(),
			color: z.string(),
			typography: z.string(),
			interaction: z.string(),
			strengths: z.array(z.string()),
			weaknesses: z.array(z.string()),
		}),
		technical: z.object({
			summary: z.string(),
			approach: z.string(),
			frameworks: z.array(z.string()),
			cssDetails: z.string(),
			a11y: z.string(),
			performance: z.string(),
		}),
		crawledAt: z.coerce.date(),
	}),
});

export const collections = { examples };
