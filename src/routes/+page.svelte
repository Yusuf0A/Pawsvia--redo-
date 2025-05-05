<script lang="ts">
    import {onMount} from "svelte";
    import type {PageData} from "./$types";

    let {data}: {data: PageData} = $props();
    const {animals} = data;
    let carousel: HTMLDivElement;


    onMount(() => {
        const scrollInterval =setInterval(() => {
            if (carousel) {
                carousel.scrollBy({
                    top: 1,
                
                    behavior: "smooth"
                });
            }
        }, 10);
    })
</script>

<div class="w-4/5 m-auto p-6 indent-8">
    <p>
    Welcome to PawsVia, come find your new furry friend! 
    Whether you're looking for a playful puppy, a cuddly kitten, or a loyal companion, we've got you covered. Join us in making a difference in the lives of these animals and find your new best friend today!
    </p>
</div>

<div class="flex w-full items-center justify-center h-12 mb-8">
    <a href="/findyour" class="active:scale-90 transition-all duration-200 bg-blue-500 text-white text-4xl px-4 py-2 rounded hover:bg-blue-600">Find Your Pet</a>
</div>


<div bind:this ={carousel}
class="flex gap-8 flex-col items-center w-3/5 m-auto h-96 overflow-y-hidden border-4 border-gray-700 p-5">
{#if animals.length ==0 }
    <div class="text-2xl font-bold text-gray-700">No animals found</div>
{:else}
    {#each animals as animal}
        <div class="flex">
            <img src={animal.primary_photo_cropped?.small} alt={animal.name} class="w-48 h-48 object-cover rounded-full"/>
            <div class="flex flex-col items-center p-4">
                <h2 class="text-2xl font-bold">{animal.name}</h2>
                <p class="text-lg">{animal.description}</p>
                <a href={animal.url} class="text-blue-500 underline">View Details</a>
                <p class="text-lg">Age: {animal.age}</p> 
            </div>

        </div>
    {/each}
{/if}
  





</div>