import { supabase } from '$lib/supabase';
import { writable } from 'svelte/store';
import { persist, localStorage } from '@macfja/svelte-persistent-store';

const teamNames = ['Red Rhinos', 'Lime Lions', 'Pink Pandas', 'Blue Bats'] as const;
export type TeamNames = typeof teamNames[number];
export type MyUser = {
	id: number;
	name: string;
	team: TeamNames;
	show_surprise: boolean;
	show_questions: boolean;
	created_at: string;
};

/* export let user = writable<MyUser | undefined>(
	JSON.parse(localStorage.getItem('user') ?? '') || undefined
);

user.subscribe((val) => localStorage.setItem('user', JSON.stringify(val))); */
export let user = persist(writable<MyUser | undefined>(undefined), localStorage(), 'user');
//export let user = writable<MyUser | undefined>(undefined);

const mySubscription = supabase
	.from<MyUser>('users')
	.on('*', (payload) => {
		console.log('Change received!', payload);
	})
	.subscribe();

export const loadUser = async (userId: string): Promise<boolean> => {
	const { data, error } = await supabase.from<MyUser>('users').select().eq('id', userId);
	console.log('user loaded:', data);
	if (data) {
		user.set(data[0]);
		return true;
	}

	return false;
};

export const createUser = async (name: string) => {
	const chosenTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
	const { data, error } = await supabase
		.from<MyUser>('users')
		.insert([{ name: name, team: chosenTeam }]);
	if (data) {
		user.set(data[0]);
	}
};
