import { supabase } from '$lib/supabase';
import { writable } from 'svelte/store';
import { persist, localStorage } from '@macfja/svelte-persistent-store';
import type { MyUser, TeamNames } from './userStore';

export let teamMembers = persist(writable<string[]>([]), localStorage(), 'teamMembers');

export const addTeamMember = async (
	newTeamMember: string,
	teamName: TeamNames | undefined
): Promise<string | false> => {
	if (teamName === undefined) return false;
	let { data, error } = await supabase.from<MyUser>('users').select('name').eq('team', teamName);

	//console.log(data);
	if (data === null) return false;

	for (let m of data) {
		if (m.name.toLowerCase() === newTeamMember.toLowerCase()) {
			teamMembers.update((t) => [...t, m.name]);
			//console.log('Added user', m.name);
			return m.name;
		}
	}

	return false;
};
