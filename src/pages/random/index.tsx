import { GetStaticProps, NextPage } from "next";

import axios from "axios";

import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";
import Card from "components/Card/Card";

import { useEffect, useState } from "react";

import Question from "types/Question";

import styles from "./index.module.scss";

interface RandomPageProps {
    response: {
        code: string,
        data: Question;
    };
}

const RandomPage: NextPage<RandomPageProps> = ({ response }) => {
    const [getData, setData] = useState(response.data);
    return (
        <div id={styles.RandomPage}>
            <Header />
            <main>
                <NavBar />
                <div id={styles.content}>
                    <Card
                        title={getData.title}
                        description={getData.description}
                        likes={getData.likes}
                        id={getData.id}
                    />
                </div>
            </main>
        </div>
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

export default RandomPage;
