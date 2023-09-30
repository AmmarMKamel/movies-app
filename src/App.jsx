import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header/Header";
import Router from './Routes';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    const currentTheme = useSelector((state) => state.themeSlice.currentTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    return (
        <BrowserRouter>
            <Header />
            <Router />
        </BrowserRouter>
    );
}

export default App;