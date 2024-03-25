import { revalidatePath } from 'next/cache';

export const GET = async (req: Request) => {
  // param id on AppRouter
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log(id);

  try {
    revalidatePath('/admin/auth/clientes', 'page');
    revalidatePath(`/admin/auth/clientes/${id}`, 'page');
  } catch (error) {
    console.log('Error', error);
  }

  return Response.json({ message: 'Revalidating...' });
};
