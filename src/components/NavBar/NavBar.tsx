import styles from "./NavBar.module.scss";

const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <p>
                Links
            </p>
            <nav>
                <ul>
                    <li>
                        <a href="https://what-to-code.com/">Original website</a>
                    </li>
                    <li>
                        <a href="https://github.com/End313234/what-to-code-clone">Github repository</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
