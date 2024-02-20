import { Router } from "react-router-dom";
import { history } from "./Utils/history";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Path from "./Path";
import Navmenu from "./components/Navmenu";

import initializeApp from "./redux/utils/init";
import { useSelector } from "react-redux";

initializeApp();

function App() {
  const isOpen = useSelector((state) => state.navbarToggle.isOpen);
  console.log("isOpen", isOpen);
  return (
    <Router history={history}>
      <div className="relative w-full h-auto">
        <Header />
        <Path />
        <Footer />
        {isOpen && (
          <div className="block relative md:hidden w-full h-full">
            <Navmenu />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
