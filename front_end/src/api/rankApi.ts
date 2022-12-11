import client from '../lib/client';
import { listComicsResQuery } from '../store/filter/types';

const listComics = async ({ page, genre }: { page: number; genre: string }) => {
  const clientRes = await client.get<listComicsResQuery>(`/api/comics/${genre}?page=${page}`);
  return clientRes.data;
};

const rankApi = {
  listComics,
};

export default rankApi;
