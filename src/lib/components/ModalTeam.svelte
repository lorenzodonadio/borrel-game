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
			<ModalTeamContent team={$user.team} />
		{/if}
	</div>
</div>
