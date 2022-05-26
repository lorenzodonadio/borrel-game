<script lang="ts">
	import { questions } from '$lib/stores/questionStore';
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

<div class="flex flex-col">
	<div class="flex justify-evenly font-semibold text-xl sm:mt-2">
		<p>
			Hi {$user?.name}
		</p>

		<p class="">
			Team:
			<span
				class:text-lime-400={$user?.team === 'Lime Lions'}
				class:text-red-400={$user?.team === 'Red Rhinos'}
				class:text-blue-400={$user?.team === 'Blue Bats'}
				class:text-pink-400={$user?.team === 'Pink Pandas'}
			>
				{$user?.team}
			</span>
		</p>
	</div>
	<h3 class="text-2xl font-normal leading-normal mt-0 mb-2 text-deernsblue">Rules</h3>
	<ul class="list-disc px-4">
		<li>Have fun</li>
		<li>Find at least 2 of your team mates</li>
		<li>Answer trivia questions with them</li>
		<li>Discover the Surprise</li>
	</ul>
</div>
<!-- Content goes here -->
<div class="flex-col items-center space-y-2">
	<!-- This example requires Tailwind CSS v2.0+ -->
	{#if $user?.show_questions}
		<ul class="space-y-3">
			{#each $questions as q}
				<li
					class="shadow overflow-hidden rounded-md px-6 py-4 border-1 bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-lg hover:-translate-x-2 transition-all duration-200"
				>
					<a href={`questions/${q.id}`} class="h-full w-full" sveltekit:prefetch>
						<p>{q.title}</p>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
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
	{/if}
	<!-- {#if $user?.show_surprise} -->
	{#if true}
		<div class="flex w-full mt-8 text-3xl">
			<a
				href="/surprise"
				class="shadow rounded-3xl mx-auto px-6 py-4 bg-gradient-to-r from-orange-200 via-yellow-200 to-deernsblue-200 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-xl transition-all duration-200"
				sveltekit:prefetch>Discover the surprise</a
			>
		</div>
	{/if}
</div>
