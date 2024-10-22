# Analog SVG Clock

This project demonstrates how to create an analog clock using SVG (Scalable Vector Graphics) and JavaScript. It serves as a template to understand the basics of SVG and how to manipulate SVG elements dynamically.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [SVG Basics](#svg-basics)
- [Additional Resources](#additional-resources)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The goal of this app is to create a simple analog clock using SVG and JavaScript. This project aims to provide a basic understanding of how SVG works and how to use it in web development.

! [SVG Clock Example](images/AnalogSVGClockScreen01.png)

## Features

- Dynamic SVG creation and manipulation using JavaScript
- Responsive and scalable clock design
- Easy to integrate into any web project

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/analog-svg-clock.git
    cd analog-svg-clock
    ```

2. Open the project in your preferred code editor.

3. Open `index.html` in a web browser to see the clock in action.

## Usage

To use this clock in your own project:

1. Include the `svg-clock.js` script in your HTML file.
    ```html
    <script type="module" src="js/svg-clock.js"></script>
    ```

2. Add the SVG container and initialize the clock.
    ```html
    <div class="text-center">
        <svg id="clockContainer" viewBox="0 0 100 100"></svg>
    </div>
    
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const clock = ClockModule.createClock('clockContainer');
        });
    </script>
    ```

## SVG Basics

SVG (Scalable Vector Graphics) is an XML-based format for vector graphics. It allows for creating and manipulating images with high quality and scalability. 

Key points about SVG:
- SVG is resolution-independent, meaning it scales perfectly at any size.
- SVG elements can be styled using CSS and manipulated using JavaScript.
- SVG files are text-based and can be compressed effectively.

### Example SVG Element

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```

In this example:
- `width` and `height` define the size of the SVG container.
- `circle` is an SVG element with `cx`, `cy` for center coordinates and `r` for radius.

## Additional Resources

To learn more about SVG and how to use it in web development, check out the following resources:

- [MDN Web Docs: SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [SVG Tutorial by W3Schools](https://www.w3schools.com/graphics/svg_intro.asp)
- [CSS-Tricks: A Guide to SVG](https://css-tricks.com/mega-list-svg-information/)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
