<script lang="ts">
	export let treeRoot: TrieNode;
	const PADDING_Y = 25;
	const NODE_RADIUS = 15;

	import type { TrieNode } from '$lib';
	import { tree, hierarchy, type HierarchyNode, type HierarchyLink, linkVertical } from 'd3';
	import { onMount } from 'svelte';

	type Node = { val: string; isEndOfWord: boolean; children: Node[] };
	const adapter = (tn: TrieNode) => {
		const node: Node = { val: '', children: [], isEndOfWord: false };
		const scrapeChildren = (n: TrieNode, k: string): Node => {
			return {
				val: k,
				children: Object.entries(n.children).map(([k, v]) => scrapeChildren(v, k)),
				isEndOfWord: n.isEndOfWord
			};
		};
		Object.entries(tn.children).forEach(([k, v]) => {
			node.children.push({
				val: k,
				isEndOfWord: v.isEndOfWord,
				children: Object.entries(v.children).map(([k, v]) => scrapeChildren(v, k))
			});
		});
		return node;
	};

	let root: HierarchyNode<Node>;
	let links: HierarchyLink<Node>[];
	$: root = hierarchy(adapter(treeRoot));
	$: tree<Node>().nodeSize([40, 40])(root);

	$: links = root.links();

	$: nodes = root.descendants();

	$: height = (root.height + 3) * NODE_RADIUS * 2 + PADDING_Y;
	let container: SVGElement;
	$: width = 500;
	onMount(() => {
		width = container.clientWidth;
		window.addEventListener('resize', (e) => {
			width = container.clientWidth;
		});
	});

	$: console.log(root.height);
</script>

<div>
	<h2 class="text-2xl text-center">Tree Visual</h2>
	<svg class="w-full" bind:this={container} {height}>
		{#each links as l}
			<path
				d={linkVertical()({
					source: [l.source.x + width / 2, l.source.y + PADDING_Y],
					target: [l.target.x + width / 2, l.target.y + PADDING_Y]
				})}
			/>
		{/each}
		{#each nodes as n}
			<circle
				cx={n.x + width / 2}
				cy={n.y + PADDING_Y}
				r={NODE_RADIUS}
				fill={n.data.isEndOfWord ? 'aqua' : 'white'}
			/>
			<text text-anchor="middle" x={n.x + width / 2} y={n.y + PADDING_Y + 4}>{n.data.val}</text>
		{/each}
	</svg>
</div>

<style>
	.container {
		border: 1px solid chocolate;
		min-width: 400px;
		height: 400px;
	}

	.bar {
		fill: blueviolet;
	}

	path {
		fill: none;
		stroke: white;
	}

	text {
		font-size: 12px;
		fill: blue;
	}
</style>
