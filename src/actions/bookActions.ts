'use server';
import { BookType } from '@/components/admin/forms/BookForm';

export async function addBookAction(token: string, book: BookType) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/books`,
      {
         method: 'POST',
         headers: {
            token,
         },
         body: JSON.stringify(book),
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
export async function editBookAction(
   token: string,
   id: string,
   book: BookType,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/books/${id}`,
      {
         method: 'PUT',
         headers: {
            token,
         },
         body: JSON.stringify(book),
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
export async function deleteBookAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/books/${id}`,
      {
         method: 'DELETE',
         headers: {
            token,
         },
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
