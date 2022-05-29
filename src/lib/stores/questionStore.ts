import { writable } from 'svelte/store';
import { persist, localStorage } from '@macfja/svelte-persistent-store';

export type Question = {
	id: number;
	title: string;
	text: string;
	answer: string;
	is_correct: boolean;
};

const defaultQuestions: Question[] = [
	{
		id: 1,
		title: 'Question 1',
		text: 'Solve this puzzle',
		answer: 'florence',
		is_correct: false
	},
	{
		id: 2,
		title: 'Question 2',
		text: 'Lorem ipsumesrgser',
		answer: 'my answer 1',
		is_correct: false
	},
	{
		id: 3,
		title: 'Question 3',
		text: 'Lorem ipsusdfgdfsm',
		answer: 'my answer 1',
		is_correct: false
	},
	{
		id: 4,
		title: 'Question 4',
		text: 'Lorem isdfgdsfpsum',
		answer: 'my answer 1',
		is_correct: false
	}
];

export let questions = persist(writable<Question[]>(defaultQuestions), localStorage(), 'questions');
