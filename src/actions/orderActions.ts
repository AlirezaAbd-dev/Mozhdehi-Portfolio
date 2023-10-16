'use server';

export async function deleteOrderAction(token: string, id: string) {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/orders/${id}`,
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
