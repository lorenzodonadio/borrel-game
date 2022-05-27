<script>
	import { createEventDispatcher } from 'svelte/internal';
	export let disabled = false;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('buttonClick')}
	{disabled}
	type="button"
	class:bg-gray-300={disabled}
	class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	><slot /></button
>
