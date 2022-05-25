<script lang="ts">
	import { questions } from '$lib/stores/questionStore';
</script>

<div class="flex flex-col">
	<h3 class="text-2xl font-normal leading-normal mt-0 mb-2 text-deernsblue">Rules</h3>
	<ul class="list-disc px-4">
		<li>Have fun</li>
		<li>Answer All the questions with your teams</li>
		<li>Discover the Surprise</li>
	</ul>
</div>
<!-- Content goes here -->
<div class="flex-col items-center pt-4">
	<!-- This example requires Tailwind CSS v2.0+ -->
	<ul class="space-y-3">
		{#each $questions as q}
			<li
				class="bg-blue-100 shadow overflow-hidden rounded-md px-6 py-4 border-1 hover:bg-blue-300 hover:shadow-xl transition-all"
			>
				<a href={`questions/${q.id}`} class="h-full w-full" sveltekit:prefetch>
					<p>{q.title}</p>
				</a>
			</li>
		{/each}
	</ul>

	<div class="flex w-full mt-8 text-3xl">
		<a
			href="/surprise"
			class="rounded-3xl mx-auto px-6 py-4 bg-gradient-to-r from-slate-400 via-yellow-400 to-pink-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-lg transition-all duration-200"
			sveltekit:prefetch>Discover the surprise</a
		>
	</div>
</div>
