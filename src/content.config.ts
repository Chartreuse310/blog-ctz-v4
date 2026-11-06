import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.trim().toLowerCase()))];
}

const titleSchema = z.string().trim().min(1, "Title must not be blank").max(60);
const descriptionSchema = z.string().trim().min(1, "Description must not be blank");
const tagSchema = z.string().trim().min(1, "Tag must not be blank");
const postDateSchema = z
	.string()
	.or(z.date())
	.transform((val) => new Date(val))
	.pipe(z.date());

const baseSchema = z.object({
	title: titleSchema,
});

const post = defineCollection({
	loader: glob({ base: "./content/posts", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: descriptionSchema,
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(tagSchema).default([]).transform(removeDupsAndLowerCase),
			publishDate: postDateSchema,
			updatedDate: postDateSchema.optional(),
			pinned: z.boolean().default(false),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./content/notes", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z.iso
			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			.transform((val) => new Date(val)),
	}),
});

const tag = defineCollection({
	loader: glob({ base: "./content/tags", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema.optional(),
		description: z.string().optional(),
	}),
});

export const collections = { post, note, tag };
