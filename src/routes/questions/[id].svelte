<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	//store imports
	import { questions } from '$lib/stores/questionStore';
	import { user, showSurpriseForAll } from '$lib/stores/userStore';

	// component imports
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { onMount } from 'svelte';

	let id = parseInt($page.params.id);
	let answer = '';
	let wrongAnswer = false;
	$: isQ4Correct = $questions.filter((q) => q.id === 4).map((x) => x.is_correct)[0];
	$: question = $questions.filter((q) => q.id === id)[0];

	//console.log({ isQ4Correct });

	const handleAnswer = async () => {
		if (answer.toLocaleLowerCase().trim() === question.answer.toLocaleLowerCase()) {
			$questions = $questions.map((x) => (x.id === id ? { ...x, is_correct: true } : x));
			//console.log('Correct Answer');
			//check if all questions are correct, if so set it for every teammate!
			if ($questions.map((x) => x.is_correct).every(Boolean)) {
				await showSurpriseForAll($user?.team);
			}
			goto('/');
		} else {
			wrongAnswer = true;
			setTimeout(() => (wrongAnswer = false), 2500);
		}
	};

	onMount(() => {
		if (!$user?.show_questions) {
			goto('/');
		}
	});
</script>

<div class="ml-px mt-4 pl-4 text-lg">
	<p class="font-medium text-lg">Question {id}:</p>
	<p>{question.text}</p>

	{#if question.id === 1}
		<span class="text-sm text-gray-600">Hint: 2 words (include the space)</span>
	{/if}
	{#if question.id === 2}
		<span class="text-sm text-gray-600">Hint: 5 words (include the spaces)</span>

		<img class="flex-1" src="/rebus.png" alt="redus puzzle" />
	{/if}
	{#if question.id === 3}
		<div class="flex text-center">
			<a
				title="puzzle"
				href="https://puzzel.org/en/acrostic/play?p=-N34RM6kk05nRiFdYQ9L"
				target="_blank"
			>
				<span class="text-blue-500 underline"> Solve this acrostic and enter the answer</span></a
			>
		</div>
	{/if}

	{#if question.id === 4}
		<a
			title="puzzle"
			href="https://puzzel.org/en/jigsaw/play?p=-N4S8_AhkoxWRdik6nbD"
			target="_blank"
		>
			<span class="text-blue-500 underline">
				Solve this puzzle and enter the name of this place</span
			></a
		>
		<br />
		<span class="text-sm text-gray-600">Hint: 1 word</span>
	{/if}
	{#if question.id === 5}
		{#if isQ4Correct}
			<div class="grid grid-cols-1 sm:grid-cols-2 justify-evenly">
				<img class="h-[300px] w-[400px] flex-1" src="/plein.png" alt="findtheplace" />

				<iframe
					class="h-[300px] w-[381px] sm:h-[300px] sm:w-[400px]"
					title="plein"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.9966344210407!2d4.31510201481392!3d52.079852399999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7aa3efae4c7%3A0x744199ac4add028f!2sHet%20Plein!5e0!3m2!1sen!2snl!4v1655128506390!5m2!1sen!2snl"
					style="border:0;"
					loading="lazy"
				/>
			</div>

			<span class="text-sm text-gray-600">Hint: 2 words (include the space)</span>
		{/if}
	{/if}

	{#if question.is_correct}
		<h3 for="name" class="mt-4 block font-medium text-gray-700">Correct answer:</h3>
		<p>{question.answer}</p>
	{:else}
		<form on:submit|preventDefault={handleAnswer}>
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
				<PrimaryButton on:click={handleAnswer} disabled={!answer}>Submit answer</PrimaryButton>
			</div>
		</form>
	{/if}
</div>
