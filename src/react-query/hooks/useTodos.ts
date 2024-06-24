import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Todo {
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

	return useQuery<Todo[], Error, boolean>({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});
};

export default useTodos;