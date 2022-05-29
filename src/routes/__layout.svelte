<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { user, createUser } from '$lib/stores/userStore';
	import { questions } from '$lib/stores/questionStore';
	import { writable } from 'svelte/store';
	import { persist, localStorage } from '@macfja/svelte-persistent-store';

	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import ModalTeam from '$lib/components/ModalTeam.svelte';
	import ModalCongrats from '$lib/components/ModalCongrats.svelte';

	let newUserName = '';
	let showTeamModal = false;
	let showCongratsModal = false;
	//console.log($user);

	const congratsModalShown = persist(writable<boolean>(false), localStorage(), 'congratsmodal');

	const handleContinue = async () => {
		await createUser(newUserName);
		//$persistentUserId = `${$user?.id}`;
		showTeamModal = true;
	};

	$: if ($questions.map((x) => x.is_correct).every(Boolean)) {
		showCongratsModal = true;
		//$user.show_surprise = true;
	}
</script>

<div
	class:grad-lime={$user?.team === 'Lime Lions'}
	class:grad-red={$user?.team === 'Red Rhinos'}
	class:grad-blue={$user?.team === 'Blue Bats'}
	class:grad-pink={$user?.team === 'Pink Pandas'}
	class:grad-white={$user?.team === undefined}
	class="relative bg-gradient-to-br h-full min-h-screen font-k2d"
>
	<!-- class="relative bg-gradient-to-tr from-indigo-200 to-pink-200 h-full min-h-screen font-k2d" -->
	{#if $page.url.pathname !== '/'}
		<a href="/" class="absolute top-4 sm:left-4 md:left-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="ml-2 h-6 w-6 my-auto text-deernsblue"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	{/if}
	<header class="flex flex-col items-center">
		<h1 class="text-4xl font-semibold leading-normal text-deernsblue">Deerns Borrel Game</h1>
	</header>

	<main>
		<!-- This example requires Tailwind CSS v2.0+ -->
		<div class="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
			{#if $user}
				<!-- Content goes here -->
				<slot />
			{:else}
				<div class="p-8">
					<label>
						<span class="text-lg text-center font-semibold pb-4"
							>Please enter your name, so we can play a game!</span
						>
						<input
							bind:value={newUserName}
							type="text"
							name="name"
							id="name"
							class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
							placeholder="persistent user id here"
						/>
					</label>

					<div class="flex justify-center mt-4">
						<PrimaryButton on:buttonClick={handleContinue}>Continue</PrimaryButton>
					</div>
				</div>
			{/if}
		</div>
	</main>

	<footer
		class="fixed bottom-0 opacity-70 flex align-middle border-t w-full border-gray-600 border-dotted p-2 justify-between"
	>
		<p class="text-xs font-extralight">
			Made with &#128151 by Innovation team and Personeelsvereniging
		</p>

		<a href="https://github.com/lorenzodonadio/borrel-game" target="_blank">
			<img src="github_logo.png" alt="githublogo" class="h-4 w-4" />
		</a>
	</footer>
</div>

{#if showTeamModal}
	<ModalTeam on:closeModal={() => (showTeamModal = false)} />
{/if}

{#if showCongratsModal && !$congratsModalShown}
	<ModalCongrats
		on:closeModal={() => {
			showCongratsModal = false;
			$congratsModalShown = true;
		}}
	/>
{/if}

<style lang="postcss">
	.grad-lime {
		@apply from-lime-50 via-lime-100 to-lime-300;
	}
	.grad-red {
		@apply from-red-50 via-red-100 to-red-200;
	}
	.grad-blue {
		@apply from-blue-50 via-blue-100 to-blue-300;
	}
	.grad-pink {
		@apply from-pink-50 via-pink-100 to-pink-300;
	}
	.grad-white {
		@apply from-slate-50 via-slate-100 to-indigo-100;
	}
</style>
