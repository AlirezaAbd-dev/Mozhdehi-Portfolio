'use server';
import { ScheduleType } from '@/components/admin/forms/ScheduleForm';

export async function addScheduleAction(token: string, schedule: ScheduleType) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/schedules`,
    {
      method: 'POST',
      headers: {
        token,
      },
      body: JSON.stringify(schedule),
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
export async function editScheduleAction(
  token: string,
  id: string,
  schedule: ScheduleType,
) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/schedules/${id}`,
    {
      method: 'PUT',
      headers: {
        token,
      },
      body: JSON.stringify(schedule),
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
export async function deleteScheduleAction(token: string, id: string) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/schedules/${id}`,
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
