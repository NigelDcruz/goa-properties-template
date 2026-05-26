import { NextResponse } from "next/server";

export async function GET() {
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Goa Trust Realty API Reference</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Interactive API documentation for Goa Trust Realty property and listings services." />
        <link rel="icon" href="/favicon.ico" />
        <style>
          body {
            margin: 0;
            background-color: #09090b;
          }
        </style>
      </head>
      <body>
        <script
          id="api-reference"
          data-url="/openapi.json"
          data-configuration='{
            "theme": "purple",
            "layout": "modern",
            "searchHotKey": "k",
            "showSidebar": true
          }'
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=600"
    },
  });
}
