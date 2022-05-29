<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { fly } from 'svelte/transition';
	import ChevronDownSvg from './SVG/ChevronDownSVG.svelte';
	import ChevronRightSvg from './SVG/ChevronRightSVG.svelte';

	let showRules = false;
</script>

<div class:border-b={showRules} class="pb-4">
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

	<button on:click={() => (showRules = !showRules)}>
		<h3 class="inline-flex text-2xl font-normal leading-normal text-deernsblue">
			Rules
			<span class="hover:text-deernsblue-800 my-auto pt-1 ml-2">
				{#if showRules}
					<ChevronDownSvg />
				{:else}
					<ChevronRightSvg />
				{/if}
			</span>
		</h3>
	</button>
	{#if showRules}
		<ul
			in:fly={{ x: -300, y: 0, duration: 250 }}
			out:fly={{ x: 300, y: 0, duration: 250 }}
			class="list-disc px-4"
		>
			<li>Have fun</li>
			<li>Find at least 2 of your team mates</li>
			<li>Answer trivia questions with them</li>
			<li>Discover the Surprise</li>
		</ul>
	{/if}
</div>
