<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div
	class="relative bg-gradient-to-tr from-indigo-300 via-deernsblue-200 to-pink-300 h-full min-h-screen font-k2d"
>
	{#if $page.url.pathname !== '/'}
		<a href="/" class="absolute top-4 sm:left-4 md:left-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="ml-1 h-5 w-5 my-auto text-deernsblue"
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
		<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<!-- Content goes here -->
			<slot />
		</div>
	</main>

	<footer
		class="flex align-middle fixed bottom-0 border-t w-full border-gray-600 border-dotted p-2 justify-between"
	>
		<p class="text-xs font-extralight">
			Made with &#128151 by Innovation team and Personeelsvereniging
		</p>

		<a href="https://github.com/lorenzodonadio/borrel-game" target="_blank">
			<img src="github_logo.png" alt="githublogo" class="h-4 w-4" />
		</a>
	</footer>
</div>
