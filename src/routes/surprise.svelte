<script lang="ts">
	import { user } from '$lib/stores/userStore';
</script>

{#if $user?.show_surprise}
	<div class="p-2 flex flex-col w-full h-[550px]">
		<h3 class="text-center text-lg mb-1 sm:mb-8">
			Congratulations! see you at Boterwaag at 19:00 pm The first rounds are on us 🍺🍺 and also
			food 🌮🌮
		</h3>
		<iframe
			class="mx-auto rounded-lg w-full max-w-[800px] h-full flex-grow"
			title="SupriseMap"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.2237851895384!2d4.306498015560731!3d52.07565597681624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b725e0ed2c2b%3A0xcf3847cf157ee421!2sde%20Boterwaag!5e0!3m2!1sen!2snl!4v1655363271186!5m2!1sen!2snl"
			style="border:0;"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>
{:else}
	<p>No cheating! answer the questions first</p>
{/if}
