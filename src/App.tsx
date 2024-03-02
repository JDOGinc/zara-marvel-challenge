import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Details from "./pages/Details/Details"
import Home from "./pages/Home/Home"


function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Details />} />
      </Route>
    </Routes>



  )
}

export default App
