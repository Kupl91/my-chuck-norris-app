import { useQuery } from 'react-query';
import axios from 'axios';

interface JokeResponse {
  value: string;
}

const fetchJoke = async (query: string): Promise<JokeResponse> => {
  const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  if (response.status !== 200) {
    throw new Error('Ошибка при получении данных');
  }
  return response.data;
};

export const useJoke = (query: string) => {
  return useQuery(['joke', query], () => fetchJoke(query), {
    enabled: query.length >= 4,
    staleTime: 5 * 60 * 1000, // Кэшировать на 5 минут
    cacheTime: 30 * 60 * 1000, // Хранить кэш 30 минут
    retry: 1, // Повторить запрос один раз в случае ошибки
  });
};