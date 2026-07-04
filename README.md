# Big O Complexity Visualizer

An interactive web application designed to help developers and students visualize the growth rate of common algorithms and data structures using Big O notation.

The tool shows how the number of operations scales dynamically as the input size ($N$) increases from 1 to 100.

## 🚀 Features

- **Interactive Slider**: Adjust the input size ($N$) from `1` to `100` in real-time.
- **Dynamic Metric Cards**: Instantly displays the operation counts for all major complexity classes.
- **Responsive Growth Chart**: Compares growth rates visually using a line chart built with [Chart.js](https://www.chartjs.org/).
- **Smooth Math Curves**: Uses accurate mathematical models to represent curves, ensuring the visual relationships are mathematically precise.
- **Polished Theme**: Sleek, glassmorphism dark-mode UI styled using Tailwind CSS.
- **Smart Tooltips**: Displays the exact uncapped mathematical counts of operations on hover, even when curves shoot off the chart.
- **Robust Rendering**: Safely caps extremely fast-growing curves ($O(2^n)$ and $O(n!)$) on the chart canvas to avoid browser rendering glitches, while still showing their true values in tooltips.

## 📊 Visualized Complexities

The visualizer supports the following Big O complexity classes:

| Complexity Class | Growth Rate | Description | Example Algorithm |
| :--- | :--- | :--- | :--- |
| **$O(1)$** | Constant | Operations remain constant regardless of input size. | Array index lookup, hash map insertion |
| **$O(\log n)$** | Logarithmic | Operations grow logarithmically (base 2). | Binary search |
| **$O(\sqrt{n})$** | Square Root | Operations grow proportionally to the square root of $N$. | Primality test (trial division) |
| **$O(n)$** | Linear | Operations grow linearly, directly proportional to $N$. | Linear search, traversing an array |
| **$O(n \log n)$** | Linearithmic | Operations grow as a product of $N$ and $\log_2(N)$. | Merge Sort, Quick Sort (average case) |
| **$O(n^2)$** | Quadratic | Operations grow proportionally to the square of $N$. | Bubble Sort, Selection Sort |
| **$O(n^3)$** | Cubic | Operations grow proportionally to the cube of $N$. | Simple matrix multiplication |
| **$O(2^n)$** | Exponential | Operations double with each additional element. | Recursive Fibonacci, Tower of Hanoi |
| **$O(n!)$** | Factorial | Operations grow factorially (extremely fast). | Traveling Salesperson Problem (brute force) |

## 🛠️ Technology Stack

- **HTML5**: Structured semantic layout.
- **Vanilla CSS**: Base custom styles and animation properties.
- **JavaScript (ES6)**: Real-time calculation logic and Chart.js integration.
- **Tailwind CSS v4 (CDN)**: Modern component styling.
- **Chart.js (CDN)**: Smooth rendering of complexity curves.

## 📦 How to Run

Since the application is purely client-side, you don't need any complex build steps. You can run it directly:

1. Clone this repository to your local machine.
2. Open `index.html` in any modern web browser.
3. Use the slider at the top to adjust the input size ($N$) and observe the growth!
