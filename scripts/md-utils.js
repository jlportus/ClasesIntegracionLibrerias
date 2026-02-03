function toForwardSlashes(input) {
  return input.replace(/\\/g, "/");
}

function isExternalUrl(url) {
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(url) || /^(?:mailto|tel|data):/i.test(url);
}

function splitUrlAndTitle(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return { url: "", title: "" };
  if (trimmed[0] === "<") {
    const end = trimmed.indexOf(">");
    if (end !== -1) {
      return { url: trimmed.slice(1, end), title: trimmed.slice(end + 1).trim() };
    }
  }
  const match = trimmed.match(/^(\S+)(\s+["'(].+)$/);
  if (match) {
    return { url: match[1], title: match[2].trim() };
  }
  return { url: trimmed, title: "" };
}

function normalizePath(path) {
  const parts = toForwardSlashes(path).split("/");
  const out = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      if (out.length) out.pop();
      continue;
    }
    out.push(part);
  }
  return out.join("/");
}

function resolveRelativePath(basePath, relPath) {
  const rel = toForwardSlashes(relPath);
  if (rel.startsWith("/")) return normalizePath(rel.slice(1));
  if (!basePath) return normalizePath(rel);
  return normalizePath(basePath + "/" + rel);
}

function resolveRelativeResource(basePath, resourceUrl) {
  if (!resourceUrl || isExternalUrl(resourceUrl) || resourceUrl.startsWith("#")) {
    return resourceUrl;
  }
  return resolveRelativePath(basePath, resourceUrl);
}

function toMdHashLink(targetPath, anchor) {
  const encoded = encodeURIComponent(targetPath);
  return "#/md/" + encoded + (anchor ? "#" + anchor : "");
}

function rewriteMarkdownLink(rawUrl, basePath) {
  const { url, title } = splitUrlAndTitle(rawUrl);
  if (!url || isExternalUrl(url) || url.startsWith("#")) return rawUrl;

  const hashIndex = url.indexOf("#");
  const pathPart = hashIndex === -1 ? url : url.slice(0, hashIndex);
  const anchor = hashIndex === -1 ? "" : url.slice(hashIndex + 1);

  const lower = pathPart.toLowerCase();
  if (lower.endsWith(".md")) {
    const resolved = resolveRelativePath(basePath, pathPart);
    const rewritten = toMdHashLink(resolved, anchor);
    return rewritten + (title ? " " + title : "");
  }
  if (lower.endsWith(".html")) {
    const resolved = resolveRelativePath(basePath, pathPart);
    const rewritten = resolved + (anchor ? "#" + anchor : "");
    return rewritten + (title ? " " + title : "");
  }

  const resolvedResource = resolveRelativeResource(basePath, url);
  return resolvedResource + (title ? " " + title : "");
}

function rewriteLinksInMemory(mdText, basePath) {
  if (!mdText) return mdText;

  // Images: ![alt](url "title")
  mdText = mdText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, rawUrl) => {
    const { url, title } = splitUrlAndTitle(rawUrl);
    const resolved = resolveRelativeResource(basePath, url);
    const titlePart = title ? " " + title : "";
    return `![${alt}](${resolved}${titlePart})`;
  });

  // Links: [text](url "title")
  mdText = mdText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, rawUrl) => {
    const rewritten = rewriteMarkdownLink(rawUrl, basePath);
    return `[${text}](${rewritten})`;
  });

  // HTML href/src attributes
  mdText = mdText.replace(/\b(href|src)\s*=\s*"([^"]*)"/gi, (match, attr, url) => {
    if (!url || isExternalUrl(url) || url.startsWith("#")) return match;
    const lower = url.toLowerCase();
    if (lower.endsWith(".md")) {
      const hashIndex = url.indexOf("#");
      const pathPart = hashIndex === -1 ? url : url.slice(0, hashIndex);
      const anchor = hashIndex === -1 ? "" : url.slice(hashIndex + 1);
      const resolved = resolveRelativePath(basePath, pathPart);
      const rewritten = toMdHashLink(resolved, anchor);
      return `${attr}="${rewritten}"`;
    }
    if (lower.endsWith(".html")) {
      const hashIndex = url.indexOf("#");
      const pathPart = hashIndex === -1 ? url : url.slice(0, hashIndex);
      const anchor = hashIndex === -1 ? "" : url.slice(hashIndex + 1);
      const resolved = resolveRelativePath(basePath, pathPart);
      const rewritten = resolved + (anchor ? "#" + anchor : "");
      return `${attr}="${rewritten}"`;
    }
    const resolvedResource = resolveRelativeResource(basePath, url);
    return `${attr}="${resolvedResource}"`;
  });

  return mdText;
}

window.MdUtils = {
  normalizePath,
  resolveRelativePath,
  resolveRelativeResource,
  rewriteLinksInMemory,
};
