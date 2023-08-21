<script lang="ts">
	import { TrieTree } from '$lib/search-indexer';
	const tree = new TrieTree();

	let inserted: string[] = [];
	let suggestions: string[];

	$: inserted = [];
	$: newWord = '';
	$: node = tree.root.children;
	$: suggestions = [];
	$: insertHandler = () => {
		tree.insert(newWord);
		inserted = [...inserted, newWord];
		node = tree.root.children;
		newWord = '';
	};

	$: changeHandler = (str: string) => {
		if (str === '') {
			suggestions = [];
			return;
		}
		let searchResult = tree.search(str);
		console.log({ searchResult });
		suggestions = searchResult;
	};
</script>

<div class="flex flex-col justify-center items-center w-full min-h-screen">
	<div class="relative flex flex-col w-full lg:w-1/2 xl:w-1/3">
		<form
			class="flex gap-2"
			on:submit={(e) => {
				e.preventDefault();
				insertHandler();
			}}
		>
			<input
				type="text"
				class="bg-transparent text-cyan-300 w-full border-cyan-300 border rounded-lg p-3 outline-none"
				bind:value={newWord}
				on:input={(e) => {
					changeHandler(e.currentTarget.value);
				}}
			/>
			<button type="submit" class="bg-cyan-600 rounded-lg p-3 w-36 font-medium">Insert</button>
		</form>
	</div>
	<div>
		{#each suggestions as sug}
			<div>{sug}</div>
		{/each}
	</div>
</div>
<div class="fixed top-0 right-0 p-3">
	<h2>List of inserted words</h2>
	{#each inserted as word}
		<p>{word}</p>
	{/each}
</div>
