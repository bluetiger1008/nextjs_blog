import Link from "next/link";

async function getPosts() {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_RAILS_API_URL}/api/v1/posts/index`
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

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <table className="border-collapse border border-slate-500 w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">Title</th>
            <th className="border border-slate-600">Slug</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td className="border border-slate-700 p-2">
                <Link href={`/post/${post.slug}`} className="text-blue-500">
                  {post.title}
                </Link>
              </td>
              <td className="border border-slate-700 p-2">{post.slug}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
