import type { Author, Book, Loan, Stats, User } from '@/types';
import {
  mockAuthors,
  mockBooks,
  mockLoans,
  mockStats,
  mockUsers,
} from '@/data/mockData';

/**
 * API client layer.
 *
 * Today this is backed by in-memory mock data so the interface is fully
 * demonstrable. When the Python/FastAPI + PostgreSQL backend is ready,
 * replace the body of each function with a `fetch` call to the matching
 * REST endpoint — the function signatures and return types stay the same,
 * so no component needs to change.
 *
 * Expected endpoints (suggested):
 *   GET    /api/books           -> Book[]
 *   GET    /api/books/:id       -> Book
 *   GET    /api/authors         -> Author[]
 *   GET    /api/users           -> User[]
 *   GET    /api/loans           -> Loan[]
 *   GET    /api/stats           -> Stats
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

// Simulated network latency for a realistic feel during the mock phase.
const delay = <T>(data: T, ms = 280): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const api = {
  baseURL: BASE_URL,

  async getStats(): Promise<Stats> {
    return delay(mockStats);
  },

  async getBooks(): Promise<Book[]> {
    return delay(mockBooks);
  },

  async getBook(id: string): Promise<Book | undefined> {
    return delay(mockBooks.find((b) => b.id === id));
  },

  async getAuthors(): Promise<Author[]> {
    return delay(mockAuthors);
  },

  async getAuthor(id: string): Promise<Author | undefined> {
    return delay(mockAuthors.find((a) => a.id === id));
  },

  async getUsers(): Promise<User[]> {
    return delay(mockUsers);
  },

  async getLoans(): Promise<Loan[]> {
    return delay(mockLoans);
  },

  async getFavoriteBooks(): Promise<Book[]> {
    return delay(mockBooks.filter((b) => b.favorite));
  },
};

export type ApiClient = typeof api;
