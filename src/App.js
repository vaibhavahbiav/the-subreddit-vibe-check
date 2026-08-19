import React, { useState } from "react";
import Sentiment from "sentiment";

import SearchBox from "./components/SearchBox";
import VibeThing from "./components/VibeThing";
import Popup from "./components/Popup";
import Card from "./components/Card";

const sentiment = new Sentiment();

const mockPosts = [
  {
    id: "1",
    title: "This new update is absolutely amazing!",
  },

  {
    id: "2",
    title: "I love how fast everything feels now",
  },

  {
    id: "3",
    title: "This is probably the best feature they have added",
  },

  {
    id: "4",
    title: "The community here is awesome",
  },

  {
    id: "5",
    title: "Really happy with this change",
  },

  {
    id: "6",
    title: "This made my day",
  },

  {
    id: "7",
    title: "Everything is working perfectly",
  },

  {
    id: "8",
    title: "Great update, really enjoying it",
  },

  {
    id: "9",
    title: "This is so useful and helpful",
  },

  {
    id: "10",
    title: "Absolutely fantastic experience",
  },

  {
    id: "11",
    title: "I hate this new update",
  },

  {
    id: "12",
    title: "This is terrible and frustrating",
  },

  {
    id: "13",
    title: "Nothing works anymore",
  },

  {
    id: "14",
    title: "This feature is completely useless",
  },

  {
    id: "15",
    title: "Really disappointed with this",
  },

  {
    id: "16",
    title: "What a horrible update",
  },

  {
    id: "17",
    title: "This is getting worse every day",
  },

  {
    id: "18",
    title: "The new design is awful",
  },

  {
    id: "19",
    title: "Very annoying problem",
  },

  {
    id: "20",
    title: "I am tired of these constant issues",
  },

  {
    id: "21",
    title: "What do you guys think about this?",
  },

  {
    id: "22",
    title: "Has anyone tried this yet?",
  },

  {
    id: "23",
    title: "What is happening here?",
  },

  {
    id: "24",
    title: "Is this normal?",
  },

  {
    id: "25",
    title: "Looking for some advice",
  },

  {
    id: "26",
    title: "Can someone explain this?",
  },

  {
    id: "27",
    title: "What are your thoughts?",
  },

  {
    id: "28",
    title: "Just wondering what everyone thinks",
  },

  {
    id: "29",
    title: "How does this actually work?",
  },

  {
    id: "30",
    title: "Anyone else experiencing this?",
  },

  {
    id: "31",
    title: "I really like this idea",
  },

  {
    id: "32",
    title: "This looks great",
  },

  {
    id: "33",
    title: "Such a nice improvement",
  },

  {
    id: "34",
    title: "Very useful feature",
  },

  {
    id: "35",
    title: "This works surprisingly well",
  },

  {
    id: "36",
    title: "Pretty happy with the results",
  },

  {
    id: "37",
    title: "Not sure how I feel about this",
  },

  {
    id: "38",
    title: "I have mixed feelings about the update",
  },

  {
    id: "39",
    title: "This could be better",
  },

  {
    id: "40",
    title: "It works but I expected more",
  },

  {
    id: "41",
    title: "Interesting discussion",
  },

  {
    id: "42",
    title: "Here is something I noticed today",
  },

  {
    id: "43",
    title: "A quick question about this",
  },

  {
    id: "44",
    title: "Sharing something I found",
  },

  {
    id: "45",
    title: "Does anyone know the answer?",
  },

  {
    id: "46",
    title: "My experience with this so far",
  },

  {
    id: "47",
    title: "Thoughts on the latest changes?",
  },

  {
    id: "48",
    title: "I noticed something interesting",
  },

  {
    id: "49",
    title: "Here is my opinion on the matter",
  },

  {
    id: "50",
    title: "What should we do about this?",
  },
];

function getVibe(score) {
  if (score > 0) {
    return "Positive";
  }

  if (score < 0) {
    return "Negative";
  }

  return "Neutral";
}

function analyzePosts(posts) {
  return posts.map((post) => {
    const result = sentiment.analyze(post.title);

    return {
      ...post,

      score: result.score,

      vibe: getVibe(result.score),
    };
  });
}

function App() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function getPosts(subreddit) {
    setLoading(true);

    setError("");

    setPosts([]);

    setTimeout(() => {
      const analyzedPosts = analyzePosts(mockPosts);

      setPosts(analyzedPosts);

      setLoading(false);
    }, 500);
  }

  const counts = {
    positive: posts.filter((post) => post.vibe === "Positive").length,

    neutral: posts.filter((post) => post.vibe === "Neutral").length,

    negative: posts.filter((post) => post.vibe === "Negative").length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-200 to-orange-400  px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center sticky">
          <h1 className="text-2xl font-normal uppercase text-primaryText bg-white py-3 rounded-tl-3xl sm:text-5xl">
            The Subreddit Vibe Check
          </h1>

          <p className="mt-4 text-sm font-extralight text-black sm:text-base">
            made by{" "}
            <span className="text-orange-500 font-semibold">vaibhav</span> and{" "}
            <span className="text-orange-500 font-semibold">internet</span>.
          </p>
        </header>

        <SearchBox onSearch={getPosts} loading={loading} />

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {posts.length > 0 && <VibeThing counts={counts} />}

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Data from these{" "}
            <span className="text-orange-500 font-bold">
              HOT {posts.length}
            </span>{" "}
            reddit posts
          </h2>

          <div className="mt-2 space-y-4 lg:space-y-8 grid grid-cols-1 ">
            {posts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                vibe={post.vibe}
                score={post.score}
              />
            ))}
          </div>

          {!loading && posts.length === 0 && !error && (
            <div className="rounded-xl border-4 border-dashed border-white bg-white/20 p-8 text-center backdrop-blur-sm">
              <p className="text-sm ">
                Enter a subreddit and click &nbsp;
                <span className="py-2 px-2 rounded-tl-2xl bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  Check Vibes
                </span>
                &nbsp; to check the vibes of the subreddit.
              </p>
            </div>
          )}

          {loading && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-sm ">Analyzing posts...</p>
            </div>
          )}
        </section>
      </section>
      <Popup>
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-2xl font-bold text-rose-500">Uh-Oh!</span>
          <p>
            *Unfortuantely Reddit is being annoying and I can't create an app to
            get API and make other things. So currently this uses sample post
            locally and then calculates Sentiment.*
          </p>
          <p className="text-lg text-black">Apology is warranted.</p>
        </div>
      </Popup>
    </main>
  );
}

export default App;

/*
    REDDIT API VERSION
    mock getPosts() function above will be replaced with this when Reddit API access is working.
*/

// async function getPosts(subreddit) {

//     setLoading(true);

//     setError("");

//     setPosts([]);

//     try {

//         const response = await fetch(
//             `http://localhost:3001/api/reddit/${encodeURIComponent(subreddit)}`
//         );

//         const data =
//             await response.json();

//         if (!response.ok) {

//             throw new Error(
//                 data.error ||
//                 "Could not fetch Reddit posts."
//             );

//         }

//         // mappping of reddit posts here
//         const redditPosts =
//             data.data.children.map(
//                 (item) => item.data
//             );

//         const analyzedPosts =
//             analyzePosts(redditPosts);

//         setPosts(analyzedPosts);

//     }

//     catch (error) {

//         console.error(error);

//         setError(
//             error.message ||
//             "Something went wrong."
//         );

//     }

//     finally {

//         setLoading(false);

//     }

// }
