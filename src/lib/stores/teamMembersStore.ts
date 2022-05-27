import { supabase } from '$lib/supabase';
import { writable } from 'svelte/store';
import type { MyUser, TeamNames } from './userStore';

export let teamMembers = writable<string[]>([]);

const arrayContains = (arr: string[], lookup: string) =>
	arr.some((x) => x.toLowerCase() == lookup.toLowerCase());

export const addTeamMember = async (
	newTeamMember: string,
	teamName: TeamNames | undefined
): Promise<string | false> => {
	if (teamName === undefined) return false;
	let { data, error } = await supabase.from<MyUser>('users').select('name').eq('team', teamName);

	console.log(data);
	if (data === null) return false;

	if (
		arrayContains(
			data.map((x) => x.name),
			newTeamMember
		)
	) {
		teamMembers.update((t) => [...t, newTeamMember]);
		console.log('Added user', newTeamMember);
		return newTeamMember;
	}

	return false;
};
