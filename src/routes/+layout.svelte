<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="flex items-center w-full flex-col pt-36">
<div class="text-5xl font-bold font-sans text-pink-400">PAWSVIA</div>



<div id="navbar" class="flex gap-3 items-center text-lg underline p-4">
	<a href="/" class="hover:text-gray-400">Home</a>
	<a href="/findyour" class="hover:text-gray-400">Find Your Pet</a>
</div>

</div>


{@render children()}


<div class="absolute bottom-0 italic text-gray-500 w-full text-center p-6">
	<p>This website is made with the <a href='https://svelte.dev' class='font-bold underline text-blue-500'>Svelte</a> framework and the <a href='https://kit.svelte.dev' class='font-bold underline text-blue-500'>SvelteKit</a> router!</p>
	<p>Made by: <a href='https://github.com/Yusuf0A' class='font-bold underline text-blue-500'>Yusuf Anteur</a></p>
</div>