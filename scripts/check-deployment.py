"""Check a static build's URLs. Usage: python scripts/check-deployment.py BASE ORIGIN."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from xml.etree import ElementTree as ET
import json
import sys

base, origin = sys.argv[1:]
root = Path('dist')
checked = 0


def check_url(value, page_url):
    global checked
    if not value or value.startswith(('#', 'data:', 'mailto:', 'tel:', 'javascript:')):
        return
    parsed = urlparse(urljoin(page_url, value))
    if parsed.netloc != urlparse(origin).netloc:
        return
    assert parsed.path.startswith(base), (page_url, value, 'escaped deployment base')
    rel = unquote(parsed.path[len(base):])
    path = root / rel
    assert path.is_file() or (path / 'index.html').is_file() or (rel == '404/' and (root / '404.html').is_file()), (page_url, value, 'missing target')
    checked += 1


class Page(HTMLParser):
    def __init__(self, url):
        super().__init__()
        self.url = url

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('href', 'src'):
            if key in attrs:
                check_url(attrs[key], self.url)
        for candidate in attrs.get('srcset', '').split(','):
            if candidate.strip():
                check_url(candidate.strip().split()[0], self.url)
        if attrs.get('property') in ('og:url', 'og:image', 'twitter:url', 'twitter:image'):
            check_url(attrs['content'], self.url)
        if tag == 'pagefind-config':
            assert attrs.get('base-url') == base
            assert attrs.get('bundle-path') == base + 'pagefind/'


for page in root.rglob('*.html'):
    relative = page.relative_to(root).as_posix()
    route = relative.removesuffix('index.html')
    Page(origin + base + route).feed(page.read_text())

manifest = json.loads((root / 'manifest.webmanifest').read_text())
assert manifest['start_url'] == base and manifest['scope'] == base
for icon in manifest['icons']:
    check_url(icon['src'], origin + base + 'manifest.webmanifest')
for name in ('rss.xml', 'notes/rss.xml'):
    tree = ET.parse(root / name)
    assert tree.findtext('channel/link') == origin + base
    for item in tree.findall('.//item'):
        check_url(item.findtext('link'), origin + base)
for name in ('sitemap-index.xml', 'sitemap-0.xml'):
    for loc in ET.parse(root / name).getroot().iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        check_url(loc.text, origin + base)
assert f'Sitemap: {origin}{base}sitemap-index.xml' in (root / 'robots.txt').read_text()
assert (root / 'pagefind/pagefind.js').is_file()
print(f'PASS: {base} — {checked} internal references, RSS, sitemap, robots, manifest and search configuration')
