import React, { useState } from "react";

function SearchBox({ onSearch, loading }) {
  const [subreddit, setSubreddit] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const name = subreddit.trim();

    if (!name) {
      return;
    }

    onSearch(name);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row w-[80%] lg:w-[60%] justify-self-center"
    >
      <input
        type="text"
        value={subreddit}
        onChange={(event) => {
          setSubreddit(event.target.value);
        }}
        placeholder="Enter subreddit to check its vibes..."
        className="min-w-0 flex-1 border rounded-tl-2xl text-black bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_5px_0px_0px_#f58b2f] transition-all hover:ring-1 hover:ring-orange-400 focus:ring-1 focus:ring-orange-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-white px-5 py-3 w-fit self-center rounded-tl-2xl text-sm font-medium text-primaryText transition hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_#f58b2f]"
      >
        {loading ? "Checking..." : "Check Vibes"}
      </button>
    </form>
  );
}

export default SearchBox;
