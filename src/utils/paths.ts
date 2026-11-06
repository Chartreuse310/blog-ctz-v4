/** Normalize a deployment path; keep the domain in Astro's `site` setting. */
export function normalizeBase(base: string): string {
	const trimmed = base.trim();
	if (!trimmed || trimmed === "/") return "/";
	if (/[:?#\\]/.test(trimmed) || trimmed.includes("..")) {
		throw new Error("SITE_BASE must be a path such as /blog-ctz-v4/");
	}
	return `/${trimmed.split("/").filter(Boolean).join("/")}/`;
}

/** Prefix root-relative URLs once; leave external, relative and fragment URLs intact. */
export function withBase(path: string, base = import.meta.env.BASE_URL): string {
	if (!path.startsWith("/") || path.startsWith("//")) return path;
	const prefix = normalizeBase(base);
	if (prefix === "/") return path;
	const stem = prefix.slice(0, -1);
	if (
		path === stem ||
		path.startsWith(`${stem}/`) ||
		path.startsWith(`${stem}?`) ||
		path.startsWith(`${stem}#`)
	)
		return path;
	return `${stem}${path}`;
}
