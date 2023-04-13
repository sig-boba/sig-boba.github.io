const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  const input = "src"
  const output = "dist"
  eleventyConfig.addPassthroughCopy(`${input}/img`);

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addPlugin(syntaxHighlight);
  
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addShortcode("youtube", (id, title, start, end) => {
    let url = new URL(`/embed/${id}`, "https://www.youtube-nocookie.com")
    if (start) {
      url.searchParams.set("start", start)
    }
    if (end) {
      url.searchParams.set("end", end)
    }
    url.searchParams.set("modestbranding", 1)
    title = `YouTube video player${title ? ` for ${title}` : ""}`
    return `<iframe
  class="yt-shortcode"
  width="560" height="315"
  src="${url.toString()}"
  title="${title}"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>
`
  });

  eleventyConfig.setBrowserSyncConfig({
    // listen: "127.0.0.1"
  });

  return {
    dir: {
      input,
      output
    },
    passthroughFileCopy: true
  }
};
