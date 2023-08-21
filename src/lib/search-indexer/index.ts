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
			currNode = currNode.children[char]
		}
		currNode.isEndOfWord = true;
	}

	search(word: string): string[] {
		let currNode = this.root
		for (let i=0; i < word.length; i++) {
			// If we don't have anything related to the search term at all, return before we get child nodes
			if (!currNode.children[word[i]]) return []
			currNode = currNode.children[word[i]]
		}

        const compliments = this.getAllChildWords(currNode)
		if (compliments.length === 0) return  [] 
		return compliments.map(res => word+res)

	}

	getAllChildWords(node: TrieNode) : string[] {
		const words: string[] = []
		function walk(nodeRecord: TrieNode, words: string[], wordPathStr: string) {
			if (nodeRecord.isEndOfWord) {
				console.log(`Found: ${wordPathStr}`)
				words.push(wordPathStr)
			}
			for (const char in nodeRecord.children) {
				walk(nodeRecord.children[char], words, wordPathStr.concat(char))
			}
		}

		walk(node , words, "")		

		console.log(words)

		return words
	}
}
