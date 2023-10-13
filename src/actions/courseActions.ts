'use server';
import { CourseType } from '@/components/admin/forms/CourseForm';

export async function addCourseAction(token: string, course: CourseType) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/courses`,
      {
         method: 'POST',
         headers: {
            token,
         },
         body: JSON.stringify(course),
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
export async function editCourseAction(
   token: string,
   id: string,
   course: CourseType,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/courses/${id}`,
      {
         method: 'PUT',
         headers: {
            token,
         },
         body: JSON.stringify(course),
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
export async function deleteCourseAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/courses/${id}`,
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
