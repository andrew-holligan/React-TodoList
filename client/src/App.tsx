import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home.tsx';
import Create from './pages/Create.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
