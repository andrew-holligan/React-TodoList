import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage.tsx';
import CreatePage from './pages/CreatePage.tsx';
import TodoListPage from './pages/TodoListPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/todolist/:id" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
