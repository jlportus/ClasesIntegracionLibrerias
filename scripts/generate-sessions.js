#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// glob removed - using recursive fs walk instead

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'sessions.json');

function slugify(str) {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function extractSessionInfo(filePath, index) {
  const raw = readFile(filePath);
  const filename = path.basename(filePath, '.md');
  // store path relative to project root (web friendly)
  const relPath = path.relative(ROOT, filePath).split(path.sep).join('/');

  // Determine title: first H1
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : filename;

  // Split horizontal slides
  const horizontals = raw.split(/\r?\n---\r?\n/);
  const slides = [];
  const anchors = {}; // anchor -> {h,v}

  horizontals.forEach((hblock, h) => {
    const verticals = hblock.split(/\r?\n--\r?\n/);
    verticals.forEach((vblock, v) => {
      // find headings inside this vblock
      const headingRegex = /^#{1,6}\s+(.+)$/gm;
      let m;
      const localAnchors = [];
      while ((m = headingRegex.exec(vblock)) !== null) {
        const headingText = m[1].trim();
        const anchorId = slugify(headingText);
        localAnchors.push({ id: anchorId, text: headingText });
        // map to h,v (first occurrence wins)
        if (!anchors[anchorId]) anchors[anchorId] = { h, v };
      }

      slides.push({ h, v, anchors: localAnchors.map(a => a.id) });
    });
  });

  // session id from filename
  const id = slugify(filename);

  return {
    id,
    title,
    path: relPath,
    index,
    slides,
    anchorMap: anchors
  };
}

function findMdFiles() {
  // include README.md at root and all markdown files under ApuntesYEjemplos
  const files = [];
  const addIfMd = (file) => {
    if (file && file.toLowerCase().endsWith('.md')) files.push(path.relative(ROOT, file));
  };

  const rootReadme = path.join(ROOT, 'README.md');
  if (fs.existsSync(rootReadme)) addIfMd(rootReadme);

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(ent => {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && ent.name.toLowerCase().endsWith('.md')) addIfMd(full);
    });
  };

  walk(path.join(ROOT, 'ApuntesYEjemplos'));

  // remove duplicates
  return files.filter((v, i, a) => a.indexOf(v) === i);
}

function main() {
  const mdFiles = findMdFiles();
  const sessions = [];
  mdFiles.forEach((file, idx) => {
    try {
      const info = extractSessionInfo(path.join(ROOT, file), idx);
      sessions.push(info);
    } catch (err) {
      console.error('Error parsing', file, err);
    }
  });

  const out = { generatedAt: new Date().toISOString(), sessions };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log('sessions.json generated with', sessions.length, 'entries at', OUT);
}

main();
