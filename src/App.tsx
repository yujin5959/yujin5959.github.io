import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { RootLayout } from "./layout/RootLayout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
