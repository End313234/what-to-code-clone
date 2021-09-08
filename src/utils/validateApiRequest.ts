import { NextApiRequest } from "next";

const validadeApiRequest = (
    request: NextApiRequest,
) => {
    const { authorization } = request.headers;
    return authorization === process.env.NEXT_PUBLIC_TOKEN;
};

export default validadeApiRequest;
