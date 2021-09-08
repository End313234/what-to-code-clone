import Modal from "react-responsive-modal";

import Link from "next/link";
import Head from "next/head";

import { useState } from "react";

import styles from "./Header.module.scss";
import "react-responsive-modal/styles.css";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <header id={styles.Header}>
            <Head>
                <title>What to Code</title>
            </Head>
            <h3>
                <Link href="/">What to Code?</Link>
            </h3>
            <nav id="buttons">
                <ul>
                    <li>
                        <a id={styles.random} href="/random">
                            Random Idea
                        </a>
                    </li>
                    <li>
                        <a id={styles.submit} href="/submit">
                            Submit What to Code
                        </a>
                    </li>
                </ul>
                <button onClick={toggleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#4a4a4a"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                </button>
            </nav>
            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                closeIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#4a4a4a"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>}
                classNames={{
                    modal: styles.Modal,
                    modalAnimationIn: styles.modalAnimationIn,
                    modalAnimationOut: styles.modalAnimationOut,
                }}
                styles={{
                    modal: {
                        margin: 0,
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                }}
                center
            >
                <div id={styles.container}>
                    <Link href="/random">Random Idea</Link>
                    <hr />
                    <Link href="/submit">Submit What to Code</Link>
                </div>
            </Modal>
        </header>
    );
};

export default Header;
