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

export let user = persist(writable<MyUser | undefined>(undefined), localStorage(), 'user');
//export let user = writable<MyUser | undefined>(undefined);

/* const insertSubscription = supabase
	.from<MyUser>('users')
	.on('INSERT', (payload) => {
		//console.log('Insert received!', payload);
	})
	.subscribe(); */

const personalUpdateSubscription = supabase
	.from<MyUser>('users')
	.on('UPDATE', (payload) => {
		//console.log('Update received!', payload);
		let isUpdateMine = false;
		const unsub = user.subscribe((x) => {
			if (x?.id === payload.new.id) isUpdateMine = true;
		});
		unsub();
		//console.log({ isUpdateMine });
		if (isUpdateMine) user.set(payload.new);
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

export const showSurpriseForAll = async (teamName: TeamNames | undefined) => {
	if (teamName === undefined) return;

	const { data, error } = await supabase
		.from<MyUser>('users')
		.update({ show_surprise: true })
		.eq('team', teamName);
};

export const showQuestions = async (id: number | undefined) => {
	if (id === undefined) return;

	const { data, error } = await supabase
		.from<MyUser>('users')
		.update({ show_questions: true })
		.eq('id', id);
};
//not needed since we have a persistent user store
/* export const loadUser = async (userId: string): Promise<boolean> => {
		const { data, error } = await supabase.from<MyUser>('users').select().eq('id', userId);
		console.log('user loaded:', data);
		if (data) {
			user.set(data[0]);
			return true;
		}
	
		return false;
	}; */
