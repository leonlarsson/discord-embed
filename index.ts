export default {
    fetch(request: Request) {
        const { author, title, description, color, image, large } = Object.fromEntries(new URL(request.url).searchParams.entries());

        const html = `<html><head>
${color ? `<meta name="theme-color" content="#${color}">` : ""}
${author ? `<meta property="og:site_name" content="${author}">` : ""}
${title ? `<meta property="og:title" content="${title}">` : ""}
${description ? `<meta property="og:description" content="${description}">` : ""}
${image ? `<meta property="og:image" content="${image}">` : ""}
${(large === "true" || large === "1") ? `<meta name="twitter:card" content="summary_large_image">` : ""}
</head>
<body>Available URL search params are: color, author, title, description, image, large</body></html>`;

        return new Response(html, {
            headers: { "Content-Type": "text/html" }
        });
    }
}