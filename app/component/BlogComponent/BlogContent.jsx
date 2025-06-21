import React from "react";

const renderBlock = (block) => {
  switch (block.type) {
    case "header":
      const Tag = `h${block.data.level}`;
      return <Tag key={block.id}>{block.data.text}</Tag>;
    case "paragraph":
      return <p key={block.id}>{block.data.text}</p>;
    case "image":
      return (
        <div key={block.id} style={{ textAlign: "center", margin: "1em 0" }}>
          <img src={block.data.file.url} alt={block.data.caption || ""} style={{ maxWidth: "100%" }} />
          {block.data.caption && <div style={{ fontSize: "0.9em", color: "#666" }}>{block.data.caption}</div>}
        </div>
      );
    case "list":
      if (block.data.style === "ordered") {
        return (
          <ol key={block.id}>
            {block.data.items.map((item, idx) => (
              <li key={idx}>
                {typeof item === "string"
                  ? item
                  : typeof item === "object" && item !== null
                    ? item.content || JSON.stringify(item)
                    : String(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={block.id}>
          {block.data.items.map((item, idx) => (
            <li key={idx}>
              {typeof item === "string"
                ? item
                : typeof item === "object" && item !== null
                  ? item.content || JSON.stringify(item)
                  : String(item)}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={block.id} style={{ borderLeft: "4px solid #ccc", paddingLeft: "1em", color: "#555" }}>
          <p>{block.data.text}</p>
          {block.data.caption && <cite>— {block.data.caption}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <pre key={block.id} style={{ background: "#222", color: "#fff", padding: "1em", borderRadius: "5px", overflowX: "auto" }}>
          <code>{block.data.code}</code>
        </pre>
      );
    case "embed":
      return (
        <div key={block.id} dangerouslySetInnerHTML={{ __html: block.data.embed }} />
      );
    case "marker":
      return (
        <mark key={block.id}>{block.data.text}</mark>
      );
    case "inlineCode":
      return (
        <code key={block.id} style={{ background: "#eee", padding: "2px 4px", borderRadius: "3px" }}>
          {block.data.text}
        </code>
      );
    default:
      return null;
  }
};

const BlogContent = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;
  return (
    <div className="blog-content">
      {blocks.map(renderBlock)}
    </div>
  );
};

export default BlogContent;