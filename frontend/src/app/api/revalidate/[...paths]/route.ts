import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const GET = async (
  req: NextRequest,
  {
    params
  }: {
    params: {
      paths: string[];
    };
  }
) => {
  const path = '/' + params.paths.join('/');
  try {
    revalidatePath(path, 'page');
    return Response.json({ message: 'Revalidating...' });
  } catch (error) {
    console.log('Error', error);
    return Response.json({ message: 'Error' });
  }
};
