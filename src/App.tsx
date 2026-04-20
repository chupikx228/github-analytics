import {Routes, Route} from "react-router-dom";
import UserComparePage from "./pages/UserComparePage/UserComparePage";
import HomePage from "./pages/HomePage/HomePage";
import {AboutUserPage} from "./pages/AboutUserPage/AboutUserPage.tsx";
import {ThemeToggle} from "./components/ThemeToggle/ThemeToggle.tsx";
import styles from './App.module.scss';

function App() {


    return (
    <>
    <ThemeToggle className={styles.themeToggle}/>
    <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/user-compare/:paramUser1/:paramUser2" element={<UserComparePage/>} />
            <Route path="/user-about/:paramUser1" element={<AboutUserPage/>} />
            <Route path="/user-compare/" element={<UserComparePage/>} />
            <Route path="/user-about/" element={<AboutUserPage/>} />
        </Routes>

    </>

  )
}

export default App
