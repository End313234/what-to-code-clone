import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";

import styles from "./index.module.scss";

interface HomePageProps {
    response?: Object;
}

const HomePage: NextPage<HomePageProps> = ({ response }) => {
    const [selectedButton, setSelectedButton] = useState("popular");
    const [popularButtonClassName, setPopularButtonClassName] = useState(styles.selected);
    const [risingButtonClassName, setRisingButtonClassName] = useState(styles.disabled);

    const handleButtonClick = (key: string) => {
        const keyForRisingButton = selectedButton === "popular" && key === "popular" ? styles.disabled : styles.selected;
        const keyForPopularButton = selectedButton === "popular" && key === "popular" ? styles.selected : styles.disabled;
        setRisingButtonClassName(keyForRisingButton);
        setPopularButtonClassName(keyForPopularButton);
        setSelectedButton(key === "popular" ? "rising" : "popular");
    };

    return (
        <div id={styles.HomePage}>
            <Header />
            <main>
                <NavBar />
                <div id={styles.content}>
                    <div id={styles.buttons}>
                        <button
                            onClick={() => handleButtonClick("popular")}
                            id={styles.popular}
                            className={popularButtonClassName}>
                            Popular
                        </button>
                        <button
                            onClick={() => handleButtonClick("rising")}
                            id={styles.rising}
                            className={risingButtonClassName}>
                            Rising
                        </button>
                    </div>

                    <div id={styles.cards}></div>
                </div>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/get/orderby/cres`,
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

export default HomePage;
