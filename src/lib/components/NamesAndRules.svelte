<script lang="ts">
	import { user } from '$lib/stores/userStore';
</script>

<div class="flex justify-evenly font-semibold text-xl sm:mt-2">
	<p>
		Hi {$user?.name}
	</p>

	<p class="">
		Team:
		<span
			class:text-lime-400={$user?.team === 'Lime Lions'}
			class:text-red-400={$user?.team === 'Red Rhinos'}
			class:text-blue-400={$user?.team === 'Blue Bats'}
			class:text-pink-400={$user?.team === 'Pink Pandas'}
		>
			{$user?.team}
		</span>
	</p>
</div>
<h3 class="text-2xl font-normal leading-normal text-deernsblue">Rules</h3>
<ul class="list-disc px-4">
	<li>Have fun</li>
	<li>Find at least 2 of your team mates</li>
	<li>Answer trivia questions with them</li>
	<li>Discover the Surprise</li>
</ul>
