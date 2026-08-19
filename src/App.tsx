import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LibraryPage } from '@/pages/LibraryPage';
import { BooksPage } from '@/pages/BooksPage';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { AuthorsPage } from '@/pages/AuthorsPage';
import { UsersPage } from '@/pages/UsersPage';
import { LoansPage } from '@/pages/LoansPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/biblioteca" element={<LibraryPage />} />
          <Route path="/livros" element={<BooksPage />} />
          <Route path="/livros/:id" element={<BookDetailPage />} />
          <Route path="/autores" element={<AuthorsPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/emprestimos" element={<LoansPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
