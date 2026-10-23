"""Dependency-free checks for the static site's routes, metadata and safety rules."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://aqtech.shop'


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.json_scripts = []
        self.script = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            assert attrs.get('src') or attrs.get('type') == 'application/ld+json', 'Inline executable script'
            if attrs.get('type') == 'application/ld+json':
                self.script = ''
        assert not any(key.startswith('on') for key in attrs), 'Inline event handler'

    def handle_data(self, data):
        if self.script is not None:
            self.script += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.json_scripts.append(json.loads(self.script))
            self.script = None


routes = set()
titles = set()
for file in sorted(ROOT.rglob('index.html')):
    route = '/' + file.parent.relative_to(ROOT).as_posix().strip('.')
    route = route.rstrip('/') + '/'
    routes.add(ORIGIN + route)
    source = file.read_text(encoding='utf-8')
    page = Page()
    page.feed(source)
    tags = page.tags
    assert sum(tag == 'h1' for tag, _ in tags) == 1, file
    ids = [a['id'] for _, a in tags if 'id' in a]
    assert len(ids) == len(set(ids)), f'Duplicate IDs: {file}'
    assert any(t == 'html' and a.get('lang') == 'en' for t, a in tags), file
    canonical = [a['href'] for t, a in tags if t == 'link' and a.get('rel') == 'canonical']
    assert canonical == [ORIGIN + route], f'Canonical: {file}'
    for name in ('description', 'viewport'):
        assert any(t == 'meta' and a.get('name') == name and a.get('content') for t, a in tags), (file, name)
    assert any(t == 'meta' and a.get('http-equiv') == 'Content-Security-Policy' for t, a in tags), file
    assert any(t == 'a' and a.get('href') == '#main' for t, a in tags), f'Skip link: {file}'
    scripts = [a['src'] for t, a in tags if t == 'script' and 'src' in a]
    assert len(scripts) == len(set(scripts)), f'Duplicate script: {file}'
    title = source.split('<title>')[1].split('</title>')[0]
    assert title and title not in titles, f'Duplicate title: {file}'
    titles.add(title)
    for tag, attrs in tags:
        if attrs.get('target') == '_blank':
            assert 'noopener' in attrs.get('rel', '').split(), file
        if tag == 'img':
            assert 'alt' in attrs, file
        for key in ('href', 'src'):
            if key not in attrs:
                continue
            url = urlsplit(urljoin(ORIGIN + route, attrs[key]))
            assert url.scheme not in ('http', 'javascript'), (file, attrs[key])
            if url.netloc != 'aqtech.shop':
                continue
            target = ROOT / unquote(url.path).lstrip('/')
            if target.is_dir():
                target /= 'index.html'
            assert target.is_file(), f'Broken resource: {file}: {attrs[key]}'
            if url.fragment and target.suffix == '.html':
                linked = Page()
                linked.feed(target.read_text(encoding='utf-8'))
                assert any(a.get('id') == url.fragment for _, a in linked.tags), (file, attrs[key])

sitemap = ET.parse(ROOT / 'sitemap.xml')
locations = {e.text for e in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert locations == routes, 'Sitemap must include every index page exactly once'
assert (ROOT / 'CNAME').read_text().strip() == 'aqtech.shop'
assert 'Sitemap: https://aqtech.shop/sitemap.xml' in (ROOT / 'robots.txt').read_text()
print(f'PASS: {len(routes)} pages; links, assets, fragments, SEO, JSON-LD and security checks')
