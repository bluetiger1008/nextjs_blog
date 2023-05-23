async function getPost(slug: string) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_RAILS_API_URL}/api/v1/posts/${slug}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPost(slug);

  return (
    <div>
      <h2 className="text-2xl mb-2">Title: {post.title}</h2>
      <div>{post.body}</div>
    </div>
  );
}
