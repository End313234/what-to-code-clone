import axios from "axios";

import Header from "components/Header/Header";

import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

const SubmitPage = () => {
    const [getTitle, setTitle] = useState("");
    const [getDescription, setDescription] = useState("");
    const [getTags, setTags] = useState("");

    const handleInputChange = (
        func: Function,
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
        func(event.target.value);
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (getTitle.trim() === "") {
            return toast.error("Title can't be empty!", {
                bodyClassName: styles.toastifiedBody,
            });
        }

        if (getDescription.trim() === "" && getDescription.length > 0) {
            return toast.error("If you want to provide a description, provide a valid value", {
                bodyClassName: styles.toastifiedBody,
            });
        }

        if (getTags.trim() === "" && getTags.length > 0) {
            return toast.error("If you want to provide some tag, provide a valid value", {
                bodyClassName: styles.toastifiedBody,
            });
        }

        if (getTags.split(" ").length > 6) {
            return toast.error("You can only provide 6 tags", {
                bodyClassName: styles.toastifiedBody,
            });
        }

        await axios({
            method: "POST",
            url: "/api/questions/new",
            data: {
                title: getTitle,
                description: getDescription,
                tags: getTags.split(" "),
                likes: 0,
            },
            headers: {
                Authorization: process.env.NEXT_PUBLIC_TOKEN,
            },
        });

        return toast.success("Question created successfully!");
    };

    return (
        <div id={styles.SubmitPage}>
            <Header />
            <main>
                <form onSubmit={handleFormSubmit}>
                    <h1>
                        Tell the world What to Code!
                    </h1>
                    <hr />
                    <label htmlFor="title">Title (max. 100)</label>
                    <input onChange={(event) => handleInputChange(setTitle, event)} maxLength={100} type="text" placeholder="A small step for a human but a big step for mankind" name="title"/>

                    <label htmlFor="description">Description (max. 1000, optional)</label>
                    <textarea onChange={(event) => handleInputChange(setDescription, event)} maxLength={1000} name="description" />

                    <label htmlFor="tags">Tags (max. 6, optional, must be between spaces)</label>
                    <input onChange={(event) => handleInputChange(setTags, event)} type="text" name="tags" />

                    <button type="submit">
                        Submit
                    </button>
                </form>
            </main>
            <ToastContainer />
        </div>
    );
};

export default SubmitPage;
