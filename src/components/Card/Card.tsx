import axios from "axios";

import { useEffect, useState } from "react";
import styles from "./Card.module.scss";

interface CardPropsType {
    title: string;
    description: string;
    likes: number;
    id: string;
}

const Card = ({
    title,
    description,
    likes,
    id,
}: CardPropsType) => {
    const [isLiked, setIsLiked] = useState(false);
    const [getLikes, setLikes] = useState(likes);

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem("likes") as string)[id])) {
            setIsLiked(false);
        }
        else {
            setIsLiked(true);
        }
    }, []);

    const toggleLiked = async () => {
        const userLikes = JSON.parse(localStorage.getItem("likes") as string);
        setIsLiked(!isLiked);
        if (isLiked) {
            delete userLikes[id];
            localStorage.setItem("likes", JSON.stringify(userLikes));
            setLikes(getLikes - 1);
            await axios({
                method: "DELETE",
                url: "/api/questions/remove/like",
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_TOKEN,
                },
                data: {
                    id,
                },
            });
        }
        else {
            userLikes[id] = !isLiked;
            localStorage.setItem("likes", JSON.stringify(userLikes));
            setLikes(getLikes + 1);
            await axios({
                url: "/api/questions/new/like",
                method: "PUT",
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_TOKEN,
                },
                data: {
                    id,
                },
            });
        }
    };

    return (
        <div className={styles.Card}>
            <div>
                <p className={styles.title}>
                    {title}
                </p>
                <p className={styles.description}>
                    {description}
                </p>
            </div>
            <button className={styles.likes} onClick={toggleLiked}>
                {getLikes}
                {isLiked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>)}
            </button>
        </div >
    );
};

export default Card;
