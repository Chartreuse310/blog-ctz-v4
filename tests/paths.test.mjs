import assert from "node:assert/strict";
import test from "node:test";
import { normalizeBase, withBase } from "../src/utils/paths.ts";

test("deployment base normalization and invalid input", () => {
	for (const value of ["", "/", "  "]) assert.equal(normalizeBase(value), "/");
	for (const value of ["blog", "/blog", "/blog/", " /blog// "])
		assert.equal(normalizeBase(value), "/blog/");
	for (const value of ["https://example.com", "/../blog", "/blog?x", "/blog#x"])
		assert.throws(() => normalizeBase(value));
});
test("root and project deployment paths", () => {
	for (const value of ["/", "/posts/hello/", "/social-card.png", "/notes/rss.xml"]) {
		assert.equal(withBase(value, "/"), value);
		assert.equal(withBase(value, "/blog/"), `/blog${value}`);
	}
});
test("pagination and already-prefixed paths are not doubled", () => {
	for (const value of ["/blog", "/blog/", "/blog/posts/2/", "/blog?x=1", "/blog#main"])
		assert.equal(withBase(value, "/blog/"), value);
	assert.equal(withBase("/blogger/", "/blog/"), "/blog/blogger/");
});
test("external URLs, fragments and relative images retain their meaning", () => {
	for (const value of [
		"https://example.com/image.png",
		"//cdn.example.com/a.png",
		"mailto:a@example.com",
		"#main",
		"?page=2",
		"./photo.png",
		"../notes/",
	])
		assert.equal(withBase(value, "/blog/"), value);
});
