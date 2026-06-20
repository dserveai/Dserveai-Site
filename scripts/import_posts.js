const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', '..', 'posts.json');
const rawData = fs.readFileSync(postsFile, 'utf8');
const posts = JSON.parse(rawData);

const cleanContent = (html) => {
  // basic stripping for excerpt
  return html.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';
};

const processedPosts = posts.map(post => {
  return {
    id: post.id,
    date: post.date,
    slug: post.slug,
    title: post.title.rendered,
    // Just mapping a generic category for now if it doesn't exist
    category: "AI Data Insights", 
    readTime: Math.ceil((post.content?.rendered?.split(' ')?.length || 500) / 200) + " min",
    content: post.content?.rendered || "",
    excerpt: post.excerpt?.rendered ? cleanContent(post.excerpt.rendered) : cleanContent(post.content?.rendered || ""),
  };
});

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'posts_data.json'), JSON.stringify(processedPosts, null, 2));
console.log(`Processed ${processedPosts.length} posts.`);
