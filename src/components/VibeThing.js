import React from "react";


function VibeThing({ counts }) {

    return (

        <section className="mt-6 rounded-tl-2xl border-2 border-white bg-white md:bg-white/30 backdrop-blur-md p-5 lg:w-[90%] justify-self-center">

            <h2 className="mb-4 text-lg font-normal text-slate-900">

                Overall Vibes With This One....

            </h2>


            <div className="grid grid-cols-3 gap-2 sm:gap-3">


                <div className="rounded-tl-2xl border bg-emerald-500 p-3 text-center sm:p-4">

                    <strong className="block text-xl font-bold text-white sm:text-2xl">

                        {counts.positive}

                    </strong>

                    <span className="mt-1 block text-xs text-slate-100 sm:text-sm">

                        Positive

                    </span>

                </div>


                <div className="rounded-tl-2xl border bg-sky-500 p-3 text-center sm:p-4">

                    <strong className="block text-xl font-bold text-white sm:text-2xl">

                        {counts.neutral}

                    </strong>

                    <span className="mt-1 block text-xs text-slate-100 sm:text-sm">

                        Neutral

                    </span>

                </div>


                <div className="rounded-tl-2xl border bg-rose-500 p-3 text-center sm:p-4">

                    <strong className="block text-xl font-bold text-white sm:text-2xl">

                        {counts.negative}

                    </strong>

                    <span className="mt-1 block text-xs text-slate-100 sm:text-sm">

                        Negative

                    </span>

                </div>


            </div>

        </section>

    );
}


export default VibeThing;