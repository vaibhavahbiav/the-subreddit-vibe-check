import React from "react";


function Card({ title, vibe, score }) {

    let vibeClass = "text-sky-500";
    let vibeBorder = "border-sky-500";

    if (vibe === "Positive") {
        vibeClass = "text-emerald-500";
        vibeBorder = "border-emerald-500";
    }

    if (vibe === "Negative") {
        vibeClass = "text-rose-500";
        vibeBorder = "border-rose-500";
    }


    return (

        <button className={`rounded-tl-2xl border-l-2 ${vibeBorder} bg-white p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_#f58b2f] transition-shadow text-left group`}>

            <h3 className="text-sm font-light leading-6 text-slate-900 sm:text-lg">

                {title}

            </h3>


            <div className="mt-3 flex flex-col items-start space-y-2">

                <span className={`text-sm font-medium ${vibeClass}`}>

                    {vibe}

                </span>


                <span className="text-xs text-slate-400">

                    Score: {score}

                </span>

                <span className="text-sm text-black self-end group-hover:text-orange-500">Read more....</span>
            </div>


        </button>

    );
}


export default Card;