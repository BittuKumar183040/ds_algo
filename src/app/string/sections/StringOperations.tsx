'use client'

import { useState } from 'react';

interface StringOperationsProps {
  inputString: string;
  setInputString: (str: string) => void;
  setActiveIndices: (indices: number[] | null) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
}

export default function StringOperations({
  inputString,
  setInputString,
  setActiveIndices,
  pattern,
  setPattern
}: StringOperationsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchResult, setSearchResult] = useState<number[]>([]);
  const [replaceText, setReplaceText] = useState<string>("hi");

  // String Search Algorithm (Boyer-Moore-like simple implementation)
  const searchPattern = async () => {
    if (!pattern || isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndices(null);
    setSearchResult([]);
    
    const results: number[] = [];
    
    for (let i = 0; i <= inputString.length - pattern.length; i++) {
      // Highlight current position being checked
      setActiveIndices([i]);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let match = true;
      const matchIndices: number[] = [];
      
      // Check each character in the pattern
      for (let j = 0; j < pattern.length; j++) {
        matchIndices.push(i + j);
        setActiveIndices(matchIndices);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (inputString[i + j].toLowerCase() !== pattern[j].toLowerCase()) {
          match = false;
          break;
        }
      }
      
      if (match) {
        results.push(i);
        // Keep the match highlighted for a moment
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setSearchResult(results);
    setActiveIndices(results.length > 0 ? results.flatMap(pos => 
      Array.from({ length: pattern.length }, (_, i) => pos + i)
    ) : null);
    setIsAnimating(false);
  };

  // String Replace Operation
  const replacePattern = async () => {
    if (!pattern || !replaceText || isAnimating) return;
    
    setIsAnimating(true);
    let newString = inputString;
    
    // Perform case-insensitive replacement
    const regex = new RegExp(pattern, 'gi');
    newString = newString.replace(regex, replaceText);
    
    setInputString(newString);
    setActiveIndices(null);
    setSearchResult([]);
    setIsAnimating(false);
  };

  // Reverse String Animation
  const reverseString = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const chars = inputString.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
      // Highlight the characters being swapped
      setActiveIndices([left, right]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Swap characters
      [chars[left], chars[right]] = [chars[right], chars[left]];
      setInputString(chars.join(''));
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      left++;
      right--;
    }
    
    setActiveIndices(null);
    setIsAnimating(false);
  };

  // Palindrome Check Animation
  const checkPalindrome = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const cleanString = inputString.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanString.length - 1;
    let isPalindrome = true;
    
    while (left < right) {
      // Find actual indices in original string
      const leftIndex = findCharIndex(inputString, cleanString[left], left, true);
      const rightIndex = findCharIndex(inputString, cleanString[right], right, false);
      
      setActiveIndices([leftIndex, rightIndex]);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      if (cleanString[left] !== cleanString[right]) {
        isPalindrome = false;
        break;
      }
      
      left++;
      right--;
    }
    
    alert(isPalindrome ? "It's a palindrome! 🎉" : "Not a palindrome 😔");
    setActiveIndices(null);
    setIsAnimating(false);
  };

  // Helper function to find character index in original string
  const findCharIndex = (str: string, char: string, position: number, fromLeft: boolean): number => {
    let count = 0;
    
    if (fromLeft) {
      for (let i = 0; i < str.length; i++) {
        const c = str[i].toLowerCase();
        if (/[a-z0-9]/.test(c)) {
          if (count === position) return i;
          count++;
        }
      }
    } else {
      for (let i = str.length - 1; i >= 0; i--) {
        const c = str[i].toLowerCase();
        if (/[a-z0-9]/.test(c)) {
          if (count === position) return i;
          count++;
        }
      }
    }
    return 0;
  };

  // Character Frequency Analysis
  const analyzeFrequency = () => {
    const frequency: { [key: string]: number } = {};
    for (const char of inputString.toLowerCase()) {
      if (char !== ' ') {
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }
    
    const sortedFreq = Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    const message = sortedFreq
      .map(([char, count]) => `'${char}': ${count}`)
      .join(', ');
    
    alert(`Top character frequencies:\n${message}`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">String Operations</h2>
      
      {/* Input Controls */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input String:</label>
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Search Pattern:</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              disabled={isAnimating}
            />
          </div>
        </div>
      </div>

      {/* Operation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button
          onClick={searchPattern}
          disabled={isAnimating || !pattern}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {isAnimating ? "Searching..." : "Search Pattern"}
        </button>
        
        <button
          onClick={reverseString}
          disabled={isAnimating}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {isAnimating ? "Reversing..." : "Reverse String"}
        </button>
        
        <button
          onClick={checkPalindrome}
          disabled={isAnimating}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {isAnimating ? "Checking..." : "Check Palindrome"}
        </button>
        
        <button
          onClick={analyzeFrequency}
          disabled={isAnimating}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          Char Frequency
        </button>
      </div>

      {/* Replace Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-3">Replace Pattern</h3>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Replace with:</label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              disabled={isAnimating}
            />
          </div>
          <button
            onClick={replacePattern}
            disabled={isAnimating || !pattern || !replaceText}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
          >
            Replace All
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResult.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Search Results</h3>
          <p>Pattern "{pattern}" found at positions: {searchResult.join(', ')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total matches: {searchResult.length}
          </p>
        </div>
      )}
      
      {/* Algorithm Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">String Search</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Demonstrates pattern matching by checking each position in the string. 
            The algorithm highlights the current checking position and shows when matches are found.
            Time complexity: O(n×m) where n is string length and m is pattern length.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">String Reversal</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Uses two pointers technique to swap characters from both ends moving towards the center.
            This is an in-place algorithm with O(n/2) swaps and O(n) time complexity.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Palindrome Check</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Compares characters from both ends while ignoring non-alphanumeric characters.
            A palindrome reads the same forwards and backwards. Time complexity: O(n).
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Character Frequency</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Counts occurrences of each character using a hash map approach.
            Useful for text analysis and cryptography. Time complexity: O(n).
          </p>
        </div>
      </div>
    </div>
  );
}