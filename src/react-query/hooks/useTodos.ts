import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CACHE_KEY_TODOS } from '../constants';

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}
const useTodos = () => {
	const fetchTodos = () => {
		return axios
			.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.data);
	};

	return useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS,
		queryFn: fetchTodos,
		// () =>
		// 	axios
		// 		.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
		// 		.then((response) => response.data),
		staleTime: 10 * 1000,
	});
};

export default useTodos;
