<script lang="ts">
	import { user, showSurpriseForAll } from '$lib/stores/userStore';
	import { questions } from '$lib/stores/questionStore';
	import { teamMembers } from '$lib/stores/teamMembersStore';

	import FindTeamMembers from '$lib/components/FindTeamMembers.svelte';
	import TriviaQuestions from '$lib/components/TriviaQuestions.svelte';
	import NamesAndRules from '$lib/components/NamesAndRules.svelte';
</script>

<!-- Content goes here -->
<div class="flex-col items-center space-y-2">
	<NamesAndRules />
	<!-- This example requires Tailwind CSS v2.0+ -->

	<FindTeamMembers />

	{#if $user?.show_questions}
		<TriviaQuestions />
		<!-- {#if true} -->
		{#if $user?.show_surprise}
			<div class="flex w-full pt-[10%] text-3xl">
				<a
					href="/surprise"
					class="shadow rounded-3xl mx-auto px-6 py-4 bg-gradient-to-r from-orange-200 via-yellow-200 to-deernsblue-200 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-xl transition-all duration-200"
					sveltekit:prefetch>Discover the surprise</a
				>
			</div>
		{/if}
	{/if}
</div>
