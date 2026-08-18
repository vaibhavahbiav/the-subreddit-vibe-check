require("dotenv").config();

const http = require("http");
const https = require("https");


const PORT = 3001;

let tokenData = null;


// reddit auth access token
function getRedditToken() {

    return new Promise((resolve, reject) => {

        const clientId =
            process.env.REDDIT_CLIENT_ID;

        const clientSecret =
            process.env.REDDIT_CLIENT_SECRET;

        const username =
            process.env.REDDIT_USERNAME;

        const password =
            process.env.REDDIT_PASSWORD;


        if (
            !clientId ||
            !clientSecret ||
            !username ||
            !password
        ) {

            reject(
                new Error(
                    "Reddit credentials are missing."
                )
            );

            return;
        }


        const auth =
            Buffer
                .from(`${clientId}:${clientSecret}`)
                .toString("base64");


        const postData =
            new URLSearchParams({
                grant_type: "password",
                username: username,
                password: password
            }).toString();


        const options = {

            hostname: "www.reddit.com",

            path: "/api/v1/access_token",

            method: "POST",

            headers: {

                "Authorization":
                    `Basic ${auth}`,

                "User-Agent":
                    "TheSubredditVibeCheck/1.0",

                "Content-Type":
                    "application/x-www-form-urlencoded",

                "Content-Length":
                    Buffer.byteLength(postData)

            }

        };


        const request =
            https.request(
                options,
                (response) => {

                    let data = "";


                    response.on(
                        "data",
                        (chunk) => {

                            data += chunk;

                        }
                    );


                    response.on(
                        "end",
                        () => {

                            if (
                                response.statusCode < 200 ||
                                response.statusCode >= 300
                            ) {

                                console.log(
                                    "Reddit token error:",
                                    response.statusCode
                                );

                                reject(
                                    new Error(
                                        "Reddit authentication failed."
                                    )
                                );

                                return;
                            }


                            try {

                                const result =
                                    JSON.parse(data);


                                tokenData = {

                                    token:
                                        result.access_token,

                                    expiresAt:
                                        Date.now() +
                                        result.expires_in * 1000

                                };


                                resolve(
                                    result.access_token
                                );

                            }

                            catch (error) {

                                reject(
                                    new Error(
                                        "Could not read Reddit token."
                                    )
                                );

                            }

                        }
                    );

                }
            );


        request.on(
            "error",
            (error) => {

                reject(error);

            }
        );


        request.write(postData);

        request.end();

    });

}


// reuse token, if still valid
async function getToken() {

    if (
        tokenData &&
        Date.now() < tokenData.expiresAt - 60000
    ) {

        return tokenData.token;

    }


    return await getRedditToken();

}


// GET posts from reddit
function getPosts(subreddit) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const token =
                    await getToken();


                const redditPath =
                    `/r/${encodeURIComponent(subreddit)}/hot.json?limit=50`;


                const options = {

                    hostname:
                        "oauth.reddit.com",

                    path:
                        redditPath,

                    method:
                        "GET",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`,

                        "User-Agent":
                            "TheSubredditVibeCheck/1.0",

                        "Accept":
                            "application/json"

                    }

                };


                const request =
                    https.request(
                        options,
                        (response) => {

                            let data = "";


                            response.on(
                                "data",
                                (chunk) => {

                                    data += chunk;

                                }
                            );


                            response.on(
                                "end",
                                () => {

                                    if (
                                        response.statusCode < 200 ||
                                        response.statusCode >= 300
                                    ) {

                                        reject(
                                            new Error(
                                                `Reddit returned ${response.statusCode}`
                                            )
                                        );

                                        return;
                                    }


                                    try {

                                        resolve(
                                            JSON.parse(data)
                                        );

                                    }

                                    catch (error) {

                                        reject(
                                            new Error(
                                                "Invalid Reddit response."
                                            )
                                        );

                                    }

                                }
                            );

                        }
                    );


                request.on(
                    "error",
                    (error) => {

                        reject(error);

                    }
                );


                request.end();

            }

            catch (error) {

                reject(error);

            }

        }
    );

}


// creating local API
const server =
    http.createServer(
        async (req, res) => {


            // Allow React to communicate with this server
            res.setHeader(
                "Access-Control-Allow-Origin",
                "http://localhost:3000"
            );


            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, OPTIONS"
            );


            // Handle browser preflight
            if (req.method === "OPTIONS") {

                res.writeHead(204);

                res.end();

                return;
            }


            // Reddit posts endpoint
            if (
                req.method === "GET" &&
                req.url.startsWith("/api/reddit/")
            ) {


                const subreddit =
                    decodeURIComponent(
                        req.url
                            .replace(
                                "/api/reddit/",
                                ""
                            )
                            .split("?")[0]
                    );


                if (!subreddit) {

                    res.writeHead(
                        400,
                        {
                            "Content-Type":
                                "application/json"
                        }
                    );


                    res.end(
                        JSON.stringify({
                            error:
                                "Subreddit is required."
                        })
                    );


                    return;
                }


                try {

                    const data =
                        await getPosts(
                            subreddit
                        );


                    res.writeHead(
                        200,
                        {
                            "Content-Type":
                                "application/json"
                        }
                    );


                    res.end(
                        JSON.stringify(data)
                    );

                }

                catch (error) {

                    console.error(
                        error.message
                    );


                    res.writeHead(
                        500,
                        {
                            "Content-Type":
                                "application/json"
                        }
                    );


                    res.end(
                        JSON.stringify({
                            error:
                                error.message
                        })
                    );

                }


                return;
            }


            res.writeHead(
                404,
                {
                    "Content-Type":
                        "application/json"
                }
            );


            res.end(
                JSON.stringify({
                    error: "Not found."
                })
            );

        }
    );


server.listen(
    PORT,
    () => {

        console.log(
            `Reddit server running at http://localhost:${PORT}`
        );

    }
);