<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { teamMembers, addTeamMember } from '$lib/stores/teamMembersStore';

	let newTeamMember = '';

	const handleAddTeamMember = async () => {
		if (newTeamMember === $user?.name) {
			alert('You cant add yourself :)');
			newTeamMember = '';
			return;
		}
		const newMember = await addTeamMember(newTeamMember, $user?.team);

		if (newMember) newTeamMember = '';

		console.log({ $teamMembers });

		if ($user === undefined) return;

		if ($teamMembers.length >= 2) {
			$user.show_questions = true;
		}
	};
</script>

<div class="p-2">
	<p class="font-semibold text-lg">
		Enter the name of at least 2 other members of your team: {$user?.team}
	</p>
	{#each $teamMembers as member}
		<p>{member}</p>
	{/each}
	<div class="flex justify-between space-x-2 p-2">
		<input
			bind:value={newTeamMember}
			type="text"
			name="name"
			id="name"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
			placeholder="team member name"
		/>

		<button
			on:click={handleAddTeamMember}
			type="button"
			class="h-7 w-7 my-auto inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<!-- Heroicon name: solid/plus-sm -->
			<svg
				class="h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</div>
