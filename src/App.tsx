import { Routes, Route } from 'react-router-dom';
import MainSearchPage from '@/pages/MainSearchPage';
import DetailsPage from '@/pages/DetailsPage';

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground dark">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<MainSearchPage />} />
          <Route path="/anime/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;