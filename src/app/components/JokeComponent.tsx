import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { incrementCount } from '../store/slices/counterSlice';
import { JokeSearchResponse } from '../types';

const fetchJoke = async (query: string): Promise<JokeSearchResponse> => {
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
    return response.data;
};

const JokeComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const total = useSelector((state: RootState) => state.counter.total);
    const [query, setQuery] = useState<string | null>(null);

    const { data, error, isLoading } = useQuery<JokeSearchResponse, Error>(
        ['joke', query],
        () => fetchJoke(query as string),
        {
            enabled: !!query && query.length >= 4,
            onSuccess: () => {dispatch(incrementCount());
            },
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.length >= 4) {
            setQuery(inputValue);
        } else {
            alert('Введите не менее 4 символов.');
        }
    };

     return (
    <div className="p-4 bg-background text-foreground">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите значение"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Получить шутку
        </button>
      </form>
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error.message}</p>}
      {data && data.result && (
        <div>
          {data.result.map((joke) => (
            <p key={joke.id} className="mb-2">
              {joke.value}
            </p>
          ))}
        </div>
      )}
      <div>Общее количество запросов: {total}</div>
    </div>
  );
};

export default JokeComponent;