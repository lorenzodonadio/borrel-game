<script lang="ts">
	import type { TeamNames } from '$lib/stores/userStore';
	export let team: TeamNames;
</script>

<div
	on:click|stopPropagation
	class:bg-lime={team === 'Lime Lions'}
	class:bg-red={team === 'Red Rhinos'}
	class:bg-blue={team === 'Blue Bats'}
	class:bg-pink={team === 'Pink Pandas'}
	class="relative inline-block align-middle rounded-lg px-4 pt-5 pb-4 my-8 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
>
	<div class="mt-3 text-center sm:mt-0 sm:ml-4">
		<h3 class="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
			Congratulations you belong to team:
		</h3>
		<div class="mt-2 text-center">
			{#if team === 'Red Rhinos'}
				<p class="text-3xl text-red-700 font-semibold">{team}</p>
			{:else if team === 'Blue Bats'}
				<p class="text-3xl text-blue-700 font-semibold">{team}</p>
			{:else if team === 'Lime Lions'}
				<p class="text-3xl text-lime-700 font-semibold">{team}</p>
			{:else if team === 'Pink Pandas'}
				<p class="text-3xl text-pink-700 font-semibold">{team}</p>
			{:else}
				<p>you have a weird team, this is not right!</p>
				<p class="text-3xl text-gray-700 font-semibold">{team}</p>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.bg-lime {
		@apply bg-gradient-to-bl from-lime-300 to-slate-100;
	}
	.bg-red {
		@apply bg-gradient-to-bl from-red-300 to-slate-100;
	}
	.bg-blue {
		@apply bg-gradient-to-bl from-blue-300 to-slate-100;
	}
	.bg-pink {
		@apply bg-gradient-to-bl from-pink-300 to-slate-100;
	}
</style>
