export interface AuthorName {
  firstName?: string;
  lastName?: string;
}

export interface Author extends AuthorName {
  id: number;
}

export interface Book {
  id: number;
  isbn?: string;
  category?: string;
  title?: string;
  cost: number;
  year: number;
  description?: string;
  authors?: AuthorName[];
}
