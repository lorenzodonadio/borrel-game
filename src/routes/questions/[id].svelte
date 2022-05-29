<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	//store imports
	import { questions } from '$lib/stores/questionStore';
	// component imports
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';

	let id = parseInt($page.params.id);
	let answer = '';
	let wrongAnswer = false;

	$: question = $questions.filter((q) => q.id === id)[0];

	const handleAnswer = () => {
		if (answer.toLocaleLowerCase() === question.answer.toLocaleLowerCase()) {
			$questions = $questions.map((x) => (x.id === id ? { ...x, is_correct: true } : x));
			console.log('Correct Answer');
			goto('/');
		} else {
			wrongAnswer = true;
			setTimeout(() => (wrongAnswer = false), 2500);
		}
	};
</script>

<div class="ml-px mt-4 pl-4 text-lg">
	<p class="font-medium text-lg">Question {id}:</p>
	<p>{question.text}</p>

	{#if question.id === 1}
		<div class="flex text-center">
			<a
				title="puzzle"
				href="https://puzzel.org/en/jigsaw/play?p=-N34NafC91zYTWkjJO9A"
				target="_blank"
			>
				<span class="text-blue-500 underline"> Solve this puzzle and enter the city name </span></a
			>
		</div>
	{/if}

	{#if question.is_correct}
		<h3 for="name" class="mt-4 block font-medium text-gray-700">Correct answer:</h3>
		<p>{question.answer}</p>
	{:else}
		<label for="name" class="mt-4 block font-medium text-gray-700">Your answer</label>
		<div class="mt-1 px-4">
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
			{#if wrongAnswer}
				<p transition:fly={{ x: 250, duration: 500, easing: cubicInOut }} class="text-red-500">
					Wrong answer, please try again
				</p>
			{/if}
		</div>

		<div class="flex justify-center mt-4">
			<PrimaryButton disabled={!answer} on:buttonClick={handleAnswer}>Submit answer</PrimaryButton>
		</div>
	{/if}
</div>
