"use client";
import Link from "next/link";
import * as prismic from "@prismicio/client";

const client = prismic.createClient("kevin-rails");

const HeaderButtons = () => {
  const onFetchPrismicPosts = async () => {
    const posts = await client.getAllByType("post", { page: 2, pageSize: 5 });

    const postsData = posts.map((post) => ({
      title: post.data.title[0].text,
      body: post.data.body[0].text,
      slug: post.slugs[0],
    }));

    await Promise.all(
      postsData.map(async (data) => {
        await fetch(
          `http://${process.env.NEXT_PUBLIC_RAILS_API_URL}/api/v1/posts/create`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      })
    );
  };

  return (
    <div className="flex gap-2">
      <Link href="/">
        <button className="bg-sky-600 py-2 px-4 text-white">Homepage</button>
      </Link>
      <Link href="/create-post">
        <button className="bg-sky-600 py-2 px-4 text-white">Create Post</button>
      </Link>
      <button
        className="bg-sky-600 py-2 px-4 text-white"
        onClick={() => onFetchPrismicPosts()}
      >
        Fetch Prismic Posts
      </button>
    </div>
  );
};

export default HeaderButtons;
