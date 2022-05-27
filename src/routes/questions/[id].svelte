<script lang="ts">
	import { page } from '$app/stores';
	import { questions } from '$lib/stores/questionStore';
	import { to_number } from 'svelte/internal';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	let id = $page.params.id;
	let answer = '';
	let wrongAnswer = false;

	const question = $questions.filter((q) => q.id === to_number(id))[0];

	const handleAnswer = () => {
		if (answer.toLocaleLowerCase() === question.answer.toLocaleLowerCase()) {
			console.log('Correct Answer');
			goto('/');
		} else {
			wrongAnswer = true;
			setTimeout(() => (wrongAnswer = false), 2500);
		}
	};
</script>

<p>This is questions {id}</p>
<p>{question.text}</p>

<div>
	<label for="name" class="ml-px mt-4 pl-4 block font-medium text-gray-700">Your answer</label>
	<div class="mt-1">
		<input
			bind:value={answer}
			type="text"
			name="name"
			id="name"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 px-4 rounded-full"
			class:border-red-500={wrongAnswer}
			class:text-red-500={wrongAnswer}
			placeholder="answer here :)"
		/>
	</div>

	{#if wrongAnswer}
		<p transition:fly={{ x: 100, duration: 250 }} class="text-red-500">
			Wrong answer, please try again
		</p>
	{/if}
</div>

<div class="flex justify-center mt-4">
	<PrimaryButton disabled={!answer} on:buttonClick={handleAnswer}>Submit answer</PrimaryButton>
</div>
