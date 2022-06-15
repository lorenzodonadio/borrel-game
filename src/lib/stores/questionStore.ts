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
		text: 'Which is the flatest country on earth?',
		answer: 'the maldives',
		is_correct: false
	},
	{
		id: 2,
		title: 'Question 2',
		text: 'Solve the following Rebus puzzle',
		answer: 'bring a concept to life',
		is_correct: false
	},
	{
		id: 3,
		title: 'Question 3',
		text: 'Solve the following acrostic',
		answer: 'science',
		is_correct: false
	},
	{
		id: 4,
		title: 'Question 4',
		text: 'Solve the following puzzle and enter the name of that place',
		answer: 'plein',
		is_correct: false
	},
	{
		id: 5,
		title: 'Question 5',
		text: 'Go to the location from the previous question and enter the first two words behind the statue',
		answer: 'gulielmo primo',
		is_correct: false
	}
];

export let questions = persist(writable<Question[]>(defaultQuestions), localStorage(), 'questions');
