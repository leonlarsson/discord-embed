export default {
    fetch(request: Request) {
        const url = new URL(request.url);

        if (url.pathname === "/create") {

            const html = `<!DOCTYPE html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create a Discord embed</title>
</head>

<body>
    <input type="text" id="colorText" placeholder="Color (HEX)">
    <br>
    <input type="text" id="authorText" placeholder="Author">
    <br>
    <input type="text" id="titleText" placeholder="Title">
    <br>
    <input type="text" id="descriptionText" placeholder="Description">
    <br>
    <input type="text" id="imageText" placeholder="Image (URL)">
    <input type="checkbox" id="largeCheck" placeholder="Large "> Large
    <br><br>
    <button type="button" id="button">Build and Copy</button>
    <br>
    <span id="url"></span>

    <script>
        document.getElementById("button").addEventListener("click", () => {
            const color = document.getElementById("colorText").value;
            const author = document.getElementById("authorText").value;
            const title = document.getElementById("titleText").value;
            const description = document.getElementById("descriptionText").value;
            const image = document.getElementById("imageText").value;
            const large = document.getElementById("largeCheck").checked;

            const url = new URL(window.location.origin);
            if (color) url.searchParams.set("color", color.includes("#") ? color.replaceAll("#", "") : color);
            if (author) url.searchParams.set("author", author);
            if (title) url.searchParams.set("title", title);
            if (description) url.searchParams.set("description", description);
            if (image) url.searchParams.set("image", image);
            if (large) url.searchParams.set("large", large);
            document.getElementById("url").textContent = url.href;
            navigator.clipboard.writeText(url.href);
        });
    </script>
</body>

</html>`;
            return new Response(html, {
                headers: { "Content-Type": "text/html" }
            });
        }

        const { author, title, description, color, image, large } = Object.fromEntries(url.searchParams.entries());

        const html = `<html><head>
${color ? `<meta name="theme-color" content="#${color}">` : ""}
${author ? `<meta property="og:site_name" content="${author}">` : ""}
${title ? `<meta property="og:title" content="${title}">` : ""}
${description ? `<meta property="og:description" content="${description}">` : ""}
${image ? `<meta property="og:image" content="${image}">` : ""}
${(large === "true" || large === "1") ? `<meta name="twitter:card" content="summary_large_image">` : ""}
</head>
<body>Available URL search params are: color, author, title, description, image, large<br><a href="/create">Interactive mode</a></body></html>`;

        return new Response(html, {
            headers: { "Content-Type": "text/html" }
        });
    }
}