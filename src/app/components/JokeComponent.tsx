'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { incrementCount } from '../store/slices/counterSlice';
import { JokeSearchResponse, Joke } from '../types'; // Убедитесь, что типы импортированы

const fetchJoke = async (query: string): Promise<JokeSearchResponse> => {
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
    return response.data;
};

const JokeComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    
    const [query, setQuery] = useState<string | null>(null);
    const totalRequests = useSelector((state: RootState) => state.counter.count);

    const { data, error, isLoading } = useQuery<JokeSearchResponse, Error>(
        ['joke', query],
        () => fetchJoke(query as string),
        {
            enabled: !!query && query.length >= 3,
            onSuccess: () => {
                dispatch(incrementCount());
            },
            // Опционально: настройте время кэширования и другие параметры
            staleTime: 5 * 60 * 1000, // 5 минут
        }
    );

    // Debounce механизм
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.length >= 3) {
                setQuery(inputValue);
            } else {
                setQuery(null); // Очистить запрос, если меньше 4 символов
            }
        }, 500); // Задержка 500 мс

        return () => {
            clearTimeout(handler); // Очистить таймер при изменении inputValue
        };
    }, [inputValue]);

    return (
        <div className="p-4 bg-background text-foreground">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите значение"
                className="border p-2 mb-4 w-full text-black"
            />
            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error.message}</p>}
            {data && (
                <div>
                    <p>Общее количество шуток: {data.total}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.result.map((joke: Joke) => (
                            <div key={joke.id} className="border border-gray-300 p-4 rounded">
                                {joke.value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>Общее количество запросов: {totalRequests}</div>
        </div>
    );
};

export default JokeComponent;