import React, { useEffect, useState } from "react";

function Popup({ children }) {

    const [show, setShow] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShow(true);
        }, 2000);

        return () => clearTimeout(timer);

    }, []);


    if (!show) {
        return null;
    }


    return (

        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-self-center lg:justify-self-end px-4 pb-4">

            <div
                className="
                    w-full max-w-xl
                    rounded-tl-2xl
                    border border-orange-500
                    bg-white
                    p-4
                    shadow-[6px_6px_0px_0px_#000]
                    animate-[slideUp_0.4s_ease-out]
                "
            >

                <div className="relative">

                    <div className="text-sm text-slate-700">
                        {children}
                    </div>


                    <button
                        onClick={() => setShow(false)}
                        className="absolute top-0 right-0 text-3xl leading-none text-black hover:text-orange-500"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Popup;