import { NextApiRequest, NextApiResponse } from "next";

import { database } from "services/firebase";

import validadeApiRequest from "utils/validateApiRequest";

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse,
) => {
    if (!validadeApiRequest(request)) {
        return response.status(401).json({
            error: "401",
            message: "Invalid token",
        });
    }

    if (request.method !== "GET") {
        return response.status(405).json({
            error: "405",
            message: "Method Not Allowed",
            info: "Use 'GET' instead",
        });
    }

    const questionsRef = await database.ref("questions").orderByValue("likes");
    console.log(questionsRef);

    return response.status(200).json({});
};

export default handler;
