<script lang="ts">
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { questions } from '$lib/stores/questionStore';
	import { to_number } from 'svelte/internal';

	let id = $page.params.id;
	let answer = '';

	const question = $questions.filter((q) => q.id === to_number(id))[0];
</script>

<p>This is questions {id}</p>
<p>{question.text}</p>

<div>
	<label for="name" class="ml-px mt-4 pl-4 block text-sm font-medium text-gray-700"
		>Your answer</label
	>
	<div class="mt-1">
		<input
			bind:value={answer}
			type="text"
			name="name"
			id="name"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
			placeholder="answer here :)"
		/>
	</div>
</div>

<div class="flex justify-center mt-4">
	<PrimaryButton on:buttonClick={() => console.log('clicked:', { answer })}
		>Submit answer</PrimaryButton
	>
</div>
