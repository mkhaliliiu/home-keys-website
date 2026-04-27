require('dotenv').config();

module.exports = function(eleventyConfig) {

  // Copy all your existing files as-is to the output folder
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("secondary-properties.css");
  eleventyConfig.addPassthroughCopy("secondary-properties.js");
  eleventyConfig.addPassthroughCopy("property-detail.css");
  eleventyConfig.addPassthroughCopy("property-detail.js");
  eleventyConfig.addPassthroughCopy("about.css");
  eleventyConfig.addPassthroughCopy("about.js");
  eleventyConfig.addPassthroughCopy("contact.css");
  eleventyConfig.addPassthroughCopy("contact.js");
  eleventyConfig.addPassthroughCopy("blog.css");
  eleventyConfig.addPassthroughCopy("blog.js");
  eleventyConfig.addPassthroughCopy("developers.css");
  eleventyConfig.addPassthroughCopy("developers.js");
  eleventyConfig.addPassthroughCopy("cms-inject.js");
  eleventyConfig.addPassthroughCopy("index.html");
eleventyConfig.addPassthroughCopy("sproperties.html");
eleventyConfig.addPassthroughCopy("about.html");
eleventyConfig.addPassthroughCopy("contact.html");
eleventyConfig.addPassthroughCopy("blog.html");
eleventyConfig.addPassthroughCopy("developers.html");
eleventyConfig.addPassthroughCopy("property-detail.html");
eleventyConfig.addPassthroughCopy("sproperties.html");
eleventyConfig.addPassthroughCopy("cms-inject.js");
eleventyConfig.addPassthroughCopy("cms-sproperties-inject.js");
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};