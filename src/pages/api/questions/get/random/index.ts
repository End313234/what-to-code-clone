import { NextApiRequest, NextApiResponse } from "next";

import { database } from "services/firebase";
import Question from "types/Question";

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

    const questionsRef = await database.ref("questions").get();
    const documents = questionsRef.toJSON();
    const keys = Object.keys(documents as Object);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // @ts-ignore
    const randomDocument: Question = documents[randomKey];
    randomDocument.id = randomKey;
    console.log("a");

    return response.status(200).json({
        code: "200",
        data: randomDocument,
    });
};

export default handler;
