import { writable } from 'svelte/store';
export type Question = { id: number; title: string; text: string; answer: string };

export let questions = writable<Question[] | []>([
	{ id: 1, title: 'Question 1', text: 'Lorem ipsum', answer: 'my answer 1' },
	{ id: 2, title: 'Question 2', text: 'Lorem ipsumesrgser', answer: 'my answer 1' },
	{ id: 3, title: 'Question 3', text: 'Lorem ipsusdfgdfsm', answer: 'my answer 1' },
	{ id: 4, title: 'Question 4', text: 'Lorem isdfgdsfpsum', answer: 'my answer 1' }
]);
