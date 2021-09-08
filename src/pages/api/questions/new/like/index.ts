import { NextApiRequest, NextApiResponse } from "next";

import { database } from "services/firebase";

import validadeApiRequest from "utils/validateApiRequest";

import Question from "types/Question";

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

    if (request.method !== "PUT") {
        return response.status(405).json({
            error: "405",
            message: "Method Not Allowed",
            info: "Use 'PUT' instead",
        });
    }

    const { id } = request.body;

    const questionRef = database.ref(`questions/${id}`);
    const document = await questionRef.get();
    // @ts-ignore
    const { likes }: Question = document.toJSON();
    await questionRef.update({
        likes: likes + 1,
    });
    return response.status(200).json({});
};

export default handler;
