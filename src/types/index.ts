export type BookStatus = 'disponivel' | 'emprestado' | 'reservado';

export type LoanStatus = 'disponivel' | 'emprestado' | 'atrasado' | 'devolvido';

export type UserStatus = 'ativo' | 'inativo' | 'suspenso';

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  year: number;
  category: string;
  isbn: string;
  description: string;
  status: BookStatus;
  coverHue: number;
  coverAccent: string;
  pages: number;
  publisher: string;
  rating: number;
  favorite?: boolean;
}

export interface Author {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
  deathYear?: number;
  biography: string;
  bookCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  borrowedCount: number;
  registeredAt: string;
  status: UserStatus;
  avatarHue: number;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  userName: string;
  userId: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
}

export interface Stats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  registeredUsers: number;
}
