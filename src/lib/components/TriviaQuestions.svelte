<script lang="ts">
	import { fly } from 'svelte/transition';
	import { questions } from '$lib/stores/questionStore';
	import CheckSvg from './SVG/CheckSVG.svelte';
	import ChevronDownSvg from './SVG/ChevronDownSVG.svelte';
	import ChevronRightSvg from './SVG/ChevronRightSVG.svelte';

	let showQuestions = true;
</script>

<button on:click={() => (showQuestions = !showQuestions)}>
	<h3 class="inline-flex text-2xl font-normal leading-normal text-deernsblue">
		Questions
		<span class="hover:text-deernsblue-800 my-auto pt-1 ml-2">
			{#if showQuestions}
				<ChevronDownSvg />
			{:else}
				<ChevronRightSvg />
			{/if}
		</span>
	</h3>
</button>

{#if showQuestions}
	<ul in:fly={{ x: 0, y: 100, duration: 250 }} class="space-y-3 mt-4">
		{#each $questions as q}
			<li
				class=" shadow overflow-hidden rounded-md px-6 py-3 border-1 bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-lg hover:-translate-x-2 transition-all duration-200"
			>
				<a
					href={`questions/${q.id}`}
					class="inline-flex h-full w-full justify-between"
					sveltekit:prefetch
				>
					<p>{q.title}</p>

					{#if q.is_correct}
						<div class="text-deernsblue-400 my-auto">
							<CheckSvg />
						</div>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/if}
