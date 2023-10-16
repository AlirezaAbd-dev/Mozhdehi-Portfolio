'use server';
import { WorkType } from '@/components/admin/forms/WorkForm';

export async function addWorkAction(token: string, work: WorkType) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/works`,
    {
      method: 'POST',
      headers: {
        token,
      },
      body: JSON.stringify(work),
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
export async function editWorkAction(
  token: string,
  id: string,
  work: WorkType,
) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/works/${id}`,
    {
      method: 'PUT',
      headers: {
        token,
      },
      body: JSON.stringify(work),
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
export async function deleteWorkAction(token: string, id: string) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/works/${id}`,
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
