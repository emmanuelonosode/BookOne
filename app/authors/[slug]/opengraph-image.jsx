import { ImageResponse } from "next/og";
import { sanity } from "@/lib/sanity";
import { authorBySlugQuery } from "@/lib/queries";

export const revalidate = 3600;

export default async function GET(props) {
  const { slug } = props.params;
  const author = await sanity.fetch(authorBySlugQuery, { slug });

  if (!author) {
    return new Response("Not found", { status: 404 });
  }

  const bio = author.bio || `Read articles by ${author.name} on bookone.dev`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
          color: "#000",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
              background: "linear-gradient(to right, #8B5CF6, #3B82F6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {author.name}
          </h1>
          <p style={{ fontSize: 30, fontWeight: 500 }}>{bio.slice(0, 100)}...</p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/logo.svg`}
            alt="Bookone Studio Logo"
            width="40"
            height="40"
            style={{ marginRight: 10 }}
          />
          <span style={{ fontSize: 24, fontWeight: 600 }}>bookone.dev</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
