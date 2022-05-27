//import { persist, cookieStorage, localStorage } from '@macfja/svelte-persistent-store';
import { persist, cookieStorage } from '@macfja/svelte-persistent-store';
import { supabase } from '$lib/supabase';
import { writable } from 'svelte/store';

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

//export let user = writable<MyUser | undefined>(undefined)
export let user = persist(writable<MyUser | undefined>(undefined), cookieStorage(), 'user');

const mySubscription = supabase
	.from<MyUser>('users')
	.on('*', (payload) => {
		console.log('Change received!', payload);
	})
	.subscribe();

export const createUser = async (name: string) => {
	const chosenTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
	const { data, error } = await supabase
		.from<MyUser>('users')
		.insert([{ name: name, team: chosenTeam }]);
	if (data) {
		user.set(data[0]);
	}
};
