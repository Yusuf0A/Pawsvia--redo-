<script lang="ts">
    import { onMount } from "svelte";
    const ZIP_API_KEY = "db26696842b34c42bba9f7e6eaad1602";

    let { form } = $props();

    let animals = $state(form?.animals ?? []);

    let zipcode = $state(0);

    onMount(() => {
        const location = navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                fetch(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${ZIP_API_KEY}`,
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        zipcode = data.features[0].properties.postcode;
                    });
            },
        );
    });
</script>

<div class="flex flex-col items-center">
    <form method="POST" action="?/findyour" class="flex flex-col items-center">
        <div class="flex flex-col items-center" style="padding: 20px;">
            <label for="type" class="text-lg font-bold"
                >Select Animal Type:</label
            >
            <select
                name="type"
                id="type"
                class="border-2 border-gray-300 rounded p-2"
            >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select>

            <label for="age" class="text-lg font-bold mt-4">Select Age:</label>
            <select
                name="age"
                id="age"
                class="border-2 border-gray-300 rounded p-2"
            >
                <option value="baby">Baby</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
            </select>

            <label for="size" class="text-lg font-bold mt-4">Select Size:</label
            >
            <select
                name="size"
                id="size"
                class="border-2 border-gray-300 rounded p-2"
            >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
            </select>
            <label for="location" class="text-lg font-bold mt-4"
                >Enter Your Zipcode:</label
            >
            <input
                type="text"
                name="location"
                id="location"
                bind:value={zipcode}
                class="border-2 border-gray-300 rounded p-2"
                placeholder="Enter your zipcode"
            />
        </div>
        <button
            type="submit"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Find My Pet
        </button>
    </form>
</div>

<div class="w-4/5 m-auto p-6 flex flex-col gap-6">
    {#each animals as animal}
        <div class="flex flex-col items-center rounded-lg shadow p-6 hover:shadow-2xl transition-shadow duration-300 bg-gray-50">
            <img
                src={animal.primary_photo_cropped?.small}
                alt=''
                class="w-48 h-48 object-cover rounded-full"
                style="background-image: url(cam-icon.png); background-size: cover;"
            />
            <div class="flex flex-col items-center p-4">
                <h2 class="text-2xl font-bold">{animal.name}</h2>
                <p class="text-lg">{animal.description}</p>
                <a href={animal.url} class="tmt-4 bg-blue-500 text-white px-4 text-2xl py-2 m-4 rounded hover:bg-blue-600"
                    >Adopt me NOW!!</a
                >
                <p class="text-lg">Age: {animal.age}</p>
            </div>
        </div>
    {/each}
</div>
