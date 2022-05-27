<script lang="ts">
	import { questions } from '$lib/stores/questionStore';
</script>

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
