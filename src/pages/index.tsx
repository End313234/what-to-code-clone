import type { GetStaticProps, NextPage } from "next";

import axios from "axios";

import HomePage from "./home"; // eslint-disable-line

interface HomePageProps {
    response?: Object;
}

const Home: NextPage<HomePageProps> = ({ response }) => {
    return (
        <HomePage response={response} />
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/get/random`,
        headers: {
            Authorization: process.env.NEXT_PUBLIC_TOKEN,
        },
    });

    return {
        props: {
            response: response.data,
        },
    };
};

export default Home;
