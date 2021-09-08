import { NextApiRequest, NextApiResponse } from "next";

import { database } from "services/firebase";

import Question from "types/Question";
import validadeApiRequest from "utils/validateApiRequest";

const handler = (
    request: NextApiRequest,
    response: NextApiResponse,
) => {
    if (!validadeApiRequest(request)) {
        return response.status(401).json({
            error: "401",
            message: "Invalid token",
        });
    }

    if (request.method !== "POST") {
        // throwing error in case the method is wrong
        return response.status(405).json({
            error: "405",
            message: "Method Not Allowed",
            info: "Use 'POST' instead",
        });
    }

    // getting request body
    const {
        title,
        description,
        likes,
        tags,
    } = request.body;

    // pushing information
    const questionsRef = database.ref("questions");
    const newQuestion = questionsRef.push({
        title,
        description,
        likes,
        tags,
    } as Question);

    // returning response
    return response.status(201).json({
        code: "201",
        message: "Item created successfully.",
        data: newQuestion,
    });
};

export default handler;
