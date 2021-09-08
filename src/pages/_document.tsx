import Document, {
    Html,
    Head,
    NextScript,
    Main,
    DocumentContext,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="A clone for https://what-to-code.com/."
                    />
                    <meta
                        name="keywords"
                        content="ui clone, website clones, ideas, code, programming ideas, coding projects, ideas for projects"
                    />
                    <meta
                        name="theme-color"
                        content="#fad400"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
