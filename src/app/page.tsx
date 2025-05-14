import Image from 'next/image';
import algo from './asset/algo.jpg';

export default function Home() {

  return (
    <section className="flex-1 p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Welcome to DSA Algo Visualization</h1>
      <p className="mb-8">This website will allow you to visualize different data structure concepts and algorithms in action.</p>
      
      <div className="flex justify-center items-center h-auto w-auto pointer-events-none">
        <Image className=' rounded-xl' height={350} src={algo} alt="Algorithm Visualization" />
      </div>
      <div className=' space-y-6 mt-4'>
        <section className="">
          <h2 className="text-xl font-semibold text-blue-600">What is DSA?</h2>
          <div className=' space-y-4 mt-2'>
            <p>Data Structures and Algorithms (DSA) are the building blocks of computer science and programming. They provide the foundation for solving problems efficiently and writing optimized code that can handle real-world data at scale.</p>
            <p>A <span className="font-semibold">Data Structure</span> is a way of organizing and storing data so that it can be accessed and modified effectively. Common examples include arrays, linked lists, stacks, queues, trees, and graphs. Each data structure offers different advantages depending on the problem at hand.</p>
            <p>An <span className="font-semibold">Algorithm</span> is a step-by-step procedure or formula for solving a problem. Algorithms process data stored in data structures and help perform tasks like searching, sorting, traversing, and manipulating that data.</p>
            <p>Think of DSA like the engine behind every software application you use. Whether it’s loading your social media feed, finding the shortest route on a map, or securing your online banking transaction, DSA is at work behind the scenes.</p>
            <p>Mastering DSA is crucial for every programmer, especially those aspiring to excel in technical interviews at top companies. Employers often test candidates’ understanding of algorithms and data structures to evaluate their problem-solving ability and coding efficiency.</p>
            <p>For example, let’s say you want to search for a friend’s name in your phone contacts. Using a simple list (an array), you might have to scroll through every name one by one (linear search). But if your contacts are stored using an optimized structure like a binary search tree, you can find the name much faster using a binary search algorithm.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">Why Learn Algorithms?</h2>
          <div className=' space-y-4 mt-2'>
            <p>Algorithms improve your problem-solving skills, help you crack coding interviews, and optimize the performance of your applications.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-purple-600">Key Data Structures</h2>
          <div className=' space-y-4 mt-2'>
            <p>Explore arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Each structure has unique advantages and use-cases you'll visualize here.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-red-600">Why Visualize?</h2>
          <div className=' space-y-4 mt-2'>
            <p>
              Visual learning makes abstract concepts easy to grasp by turning code and logic into interactive animations.
            </p>
            <p>
              Watching algorithms in action—like how data moves in sorting or how paths are explored in graphs—helps solidify your understanding and boosts long-term retention.
            </p>
            <p>
              Instead of memorizing code patterns, visualization lets you "see" the problem-solving process, making complex topics feel intuitive and fun.
            </p>
            <p>
              It bridges the gap between theory and practice, especially for visual thinkers who benefit from dynamic and colorful representations of data structures.
            </p>
            <p>
              That’s why this website focuses on interactive demos—so you can experiment, learn by doing, and build a deeper connection with DSA concepts.
            </p>
          </div>
        </section>
      </div>

    </section>

  );
}
