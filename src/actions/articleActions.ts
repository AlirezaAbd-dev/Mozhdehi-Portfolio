'use server';
import { ArticleType } from '@/components/admin/forms/ArticleForm';

export async function addArticleAction(token: string, article: ArticleType) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/articles`,
      {
         method: 'POST',
         headers: {
            token,
         },
         body: JSON.stringify(article),
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
export async function editArticleAction(
   token: string,
   id: string,
   article: ArticleType,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/articles/${id}`,
      {
         method: 'PUT',
         headers: {
            token,
         },
         body: JSON.stringify(article),
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
export async function deleteArticleAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/articles/${id}`,
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
