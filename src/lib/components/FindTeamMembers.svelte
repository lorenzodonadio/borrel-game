<script lang="ts">
	import { fly } from 'svelte/transition';
	import { user, showQuestions } from '$lib/stores/userStore';
	import { teamMembers, addTeamMember } from '$lib/stores/teamMembersStore';
	import { cubicInOut } from 'svelte/easing';

	import ChevronDownSvg from './SVG/ChevronDownSVG.svelte';
	import ChevronRightSvg from './SVG/ChevronRightSVG.svelte';

	let newTeamMember = '';
	let showTeam = $teamMembers.length >= 2 ? false : true;

	let wrongAnswer = false;
	let wrongMessage = 'Teammate not found try again :)';

	const helperForWrongAnswer = () => {
		wrongAnswer = true;
		setTimeout(() => (wrongAnswer = false), 2500);
	};
	const handleAddTeamMember = async () => {
		if (newTeamMember === $user?.name) {
			wrongMessage = 'You cant add yourself :)';
			helperForWrongAnswer();
			return;
		}

		if ($teamMembers.includes(newTeamMember)) {
			wrongMessage = 'Teammate already added :)';
			helperForWrongAnswer();
			return;
		}

		if (await addTeamMember(newTeamMember, $user?.team)) {
			newTeamMember = '';

			//console.log({ $teamMembers });
			if ($teamMembers.length >= 2) {
				//$user.show_questions = true;
				showQuestions($user?.id);
			}
		} else {
			wrongMessage = 'Teammate not found try again :)';
			helperForWrongAnswer();
		}
	};
</script>

<div class:border-b={showTeam} class="pb-4">
	<button on:click={() => (showTeam = !showTeam)}>
		<h3 class="inline-flex text-2xl font-normal leading-normal text-deernsblue">
			My Team
			<span class="hover:text-deernsblue-800 my-auto pt-1 ml-2">
				{#if showTeam}
					<ChevronDownSvg />
				{:else}
					<ChevronRightSvg />
				{/if}
			</span>
		</h3>
	</button>
	{#if showTeam}
		<div in:fly={{ x: -300, y: 0, duration: 250 }} out:fly={{ x: 300, y: 0, duration: 250 }}>
			<ul>
				{#each $teamMembers as member}
					<li>{member}</li>
				{/each}
			</ul>
			<p class="font-medium text-lg">Find and enter the name of your team mates:</p>
			<div class="flex justify-between space-x-2 p-2">
				<input
					bind:value={newTeamMember}
					type="text"
					name="name"
					id="name"
					class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
					placeholder="team member name"
					class:border-red-500={wrongAnswer}
					class:text-red-500={wrongAnswer}
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
			{#if wrongAnswer}
				<p transition:fly={{ x: 250, duration: 500, easing: cubicInOut }} class="text-red-500">
					{wrongMessage}
				</p>
			{/if}
		</div>
	{/if}
</div>
