<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	import ModalTeamContent from './ModalTeamContent.svelte';

	const dispatch = createEventDispatcher();
	const handleCancel = () => {
		dispatch('closeModal');
	};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
	transition:fade={{ duration: 150 }}
	class="fixed z-10 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<!--
        Background overlay, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
		<div
			on:click={handleCancel}
			class="fixed inset-0 bg-gray-500 bg-opacity-75"
			aria-hidden="true"
		/>

		<!-- This element is to trick the browser into centering the modal contents. -->
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>
		{#if $user}
			<div
				on:click|stopPropagation
				class:bg-lime={$user.team === 'Lime Lions'}
				class:bg-red={$user.team === 'Red Rhinos'}
				class:bg-blue={$user.team === 'Blue Bats'}
				class:bg-pink={$user.team === 'Pink Pandas'}
				class="relative inline-block align-middle rounded-lg px-4 pt-5 pb-4 my-8 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
			>
				<div class="mt-3 text-center sm:mt-0 sm:ml-4">
					<h3 class="text-2xl leading-6 font-semibold text-gray-900 mb-4" id="modal-title">
						Congratulations!!!
					</h3>
					<h2 class="text-lg leading-6 font-semibold text-gray-800" id="modal-title">
						You or one of your teammates has answered all the questions and unlocked the surprise
						🎉🎉🎉
					</h2>
				</div>
			</div>
		{/if}
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
