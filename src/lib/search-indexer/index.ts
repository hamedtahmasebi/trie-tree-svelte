import { isEmpty } from 'lodash-es';
export class TrieNode {
	constructor(
		public children: Record<string, TrieNode> = {},
		public isEndOfWord: boolean = false
	) {}
}

export class TrieTree {
	root = new TrieNode();

	insert(word: string) {
		let currNode = this.root;
		for (const char of word) {
			if (currNode.children[char]) {
				currNode = currNode.children[char];
				continue;
			}
			currNode.children[char] = new TrieNode();
			currNode = currNode.children[char];
		}
		currNode.isEndOfWord = true;
	}

	search(word: string): string[] {
		let currNode = this.root;
		for (let i = 0; i < word.length; i++) {
			// If we don't have anything related to the search term at all, return before we get child nodes
			if (!currNode.children[word[i]]) return [];
			currNode = currNode.children[word[i]];
		}

		const compliments = this.getAllChildWords(currNode);
		if (compliments.length === 0) return [];
		return compliments.map((res) => word + res);
	}

	remove(word: string) {
		let currNode = this.root;
		const path: TrieNode[] = [];
		for (const char of word) {
			currNode = currNode.children[char];
			path.push(currNode);
		}

		if (!isEmpty(currNode.children)) {
			currNode.isEndOfWord = false;
			return;
		}

		for (let i = path.length - 1; i >= 0; i--) {
			const currNode = path[i];
			if (isEmpty(currNode.children) && i > 0) {
				const parentNode = path[i - 1];
				delete parentNode.children[word[i]];
				if (parentNode.isEndOfWord) break;
			}
		}
	}

	getAllChildWords(node: TrieNode): string[] {
		const words: string[] = [];
		function walk(nodeRecord: TrieNode, words: string[], wordPathStr: string) {
			if (nodeRecord.isEndOfWord) {
				words.push(wordPathStr);
			}
			for (const char in nodeRecord.children) {
				walk(nodeRecord.children[char], words, wordPathStr.concat(char));
			}
		}

		walk(node, words, '');

		return words;
	}
}
