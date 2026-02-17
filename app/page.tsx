"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchBookmarks();
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) fetchBookmarks();
        else setBookmarks([]);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const addBookmark = async () => {
    if (!title || !url) return;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("URL must start with http:// or https://");
      return;
    }

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Smart Bookmark
        </h1>

        {!user ? (
          <button
            onClick={signInWithGoogle}
            className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                {user.email}
              </p>
              <button
                onClick={signOut}
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </div>

            <div className="space-y-3">
              <input
                placeholder="Bookmark title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addBookmark}
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                Add Bookmark
              </button>
            </div>

            <div className="space-y-3">
              {bookmarks.length === 0 && (
                <p className="text-sm text-gray-500 text-center font-medium">
                  No bookmarks yet
                </p>
              )}

              {bookmarks.map((b) => (
                <div
                  key={b.id}
                  className="flex justify-between items-center border border-gray-200 p-3 rounded-lg bg-gray-50"
                >
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold hover:text-blue-600 transition"
                  >
                    {b.title}
                  </a>
                  <button
                    onClick={() => deleteBookmark(b.id)}
                    className="text-red-600 text-sm font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
