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
			<li class="bg-white shadow overflow-hidden rounded-md px-6 py-4 border-2">
				<a href={`questions/${q.id}`} class="h-full w-full" sveltekit:prefetch>
					<p>{q.title}</p>
				</a>
			</li>
		{/each}
	</ul>
</div>
