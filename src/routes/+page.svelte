<script lang="ts">
	import Tree from '$components/tree.svelte';
	import { TrieTree } from '$lib/search-indexer';
	const tree = new TrieTree();

	let inserted: string[] = [];
	let suggestions: string[];

	$: treeRoot = tree.root;
	$: inserted = [];
	$: newWord = '';
	$: suggestions = [];
	$: insertHandler = () => {
		tree.insert(newWord);
		inserted = [...inserted, newWord];
		newWord = '';
		treeRoot = tree.root;
	};

	$: changeHandler = (str: string) => {
		if (str === '') {
			suggestions = [];
			return;
		}
		let searchResult = tree.search(str);
		suggestions = searchResult;
	};

	$: removeHandler = (word: string) => {
		tree.remove(word);
		inserted = inserted.filter((w) => w !== word);
		treeRoot = tree.root;
	};
</script>

<div class="flex flex-col items-center w-full min-h-screen">
	<div
		class="relative flex flex-col items-center justify-center lg:items-start gap-8 lg:flex-row w-full"
	>
		<div class="flex flex-col lg:w-1/2 xl:w-1/3">
			<h3 class="text-2xl font-semibold mt-28">Trie tree with a UI</h3>
			<p class="mb-4">
				Insert a few words using the form And then when you try to type a new word, it'll give you
				suggestions based on the string you've entered so far. It uses the string as a prefix and a
				Trie tree(aka prefix tree or digital tree) to find all the words inserted with the same
				common prefix.
			</p>
			<form
				class="flex gap-2"
				on:submit={(e) => {
					e.preventDefault();
					insertHandler();
				}}
			>
				<input
					type="text"
					class="bg-transparent text-cyan-300 w-full focus:border-cyan-300 focus:shadow focus:shadow-cyan-700 border rounded-lg p-3 outline-none"
					bind:value={newWord}
					on:input={(e) => {
						changeHandler(e.currentTarget.value);
					}}
				/>
				<button
					type="submit"
					class="bg-cyan-600 hover:bg-cyan-700 transition-all rounded-lg p-3 w-36 font-medium"
					>Insert</button
				>
			</form>

			<div class="grid grid-cols-2 gap-4">
				<div class="p-3">
					<h3 class="text-xl font-medium">Suggestions</h3>
					{#each suggestions as sug}
						<div>{sug}</div>
					{/each}
				</div>
				<div class="p-3">
					<h3 class="text-xl font-medium">inserted</h3>
					<div class="grid gap-y-1">
						{#each inserted as word}
							<div class="flex gap-2">
								<button
									on:click={() => removeHandler(word)}
									class="border hover:border-red-500 px-3 py-1 flex gap-2 items-center rounded-lg"
								>
									<span>
										{word}
									</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-x"
										viewBox="0 0 16 16"
									>
										<path
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
										/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if tree.root}
			<div class="mt-10 lg:w-1/2">
				<Tree bind:treeRoot />
			</div>
		{/if}
	</div>
</div>
