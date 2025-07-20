import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "BookOne Project";
    const category = searchParams.get("category") || "Portfolio";
    const image = searchParams.get("image") || "/hero.avif";

    // Get category color
    const getCategoryColor = (cat) => {
      switch (cat) {
        case "Web Design":
          return "#6B46C1"; // Purple
        case "SEO & Marketing":
          return "#059669"; // Green
        case "AI Automation":
          return "#2563EB"; // Blue
        default:
          return "#6B46C1"; // Default purple
      }
    };

    const categoryColor = getCategoryColor(category);

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
            backgroundColor: "#f8fafc",
            backgroundImage:
              "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            position: "relative",
            padding: "60px",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(107, 70, 193, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(107, 70, 193, 0.1) 0%, transparent 50%)",
              opacity: 0.3,
            }}
          />

          {/* Logo/Brand */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#6B46C1",
            }}
          >
            BookOne
          </div>

          {/* Category Badge */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              backgroundColor: categoryColor,
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {category}
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "800px",
              marginTop: "60px",
            }}
          >
            {/* Project Image */}
            <div
              style={{
                width: "200px",
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "40px",
                border: "3px solid white",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#1e293b",
                margin: "0 0 20px 0",
                lineHeight: "1.2",
                maxWidth: "700px",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "20px",
                color: "#64748b",
                margin: "0 0 40px 0",
                maxWidth: "600px",
                lineHeight: "1.5",
              }}
            >
              Professional {category.toLowerCase()} project by BookOne
            </p>

            {/* CTA */}
            <div
              style={{
                backgroundColor: categoryColor,
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              View Project
            </div>
          </div>

          {/* Bottom Decoration */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            <span>bookone.com</span>
            <span>•</span>
            <span>Portfolio</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
              )
            ).then((res) => res.arrayBuffer()),
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
