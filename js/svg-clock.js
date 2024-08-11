(function (global) {
    const ClockModule = (function () {

        // Helper function to calculate coordinates based on angle and radius
        function calculateCoordinates(angle, radius, hasCorrection = false) {
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle) + (hasCorrection ? 1 : 0);
            return { x, y };
        }

        function createClock(containerId) {
            const _clockSvgId = containerId + 'SVGClock';

            // Ensure the clock div container exists
            const svgContainer = document.getElementById(containerId);
            if (!svgContainer) {
                console.warn(`Clock container with id "${containerId}" not found.`);
                return;
            }   

            function createClockSvg() {
                // Create the main SVG element
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("id", _clockSvgId);
                svg.setAttribute("viewBox", "0 0 100 100");
            
                // Create the clock background SVG element
                const clockBackground = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                clockBackground.setAttribute("id", "clockBackground");
                clockBackground.setAttribute("viewBox", "0 0 100 100");
            
                // Create the outer and inner circles
                const circles = [
                    { r: "45.5", class: "clock-border-outer" },
                    { r: "45", class: "clock-border-inner" }
                ];

                circles.forEach(({ r, class: cls }) => {
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("cx", "50");
                    circle.setAttribute("cy", "50");
                    circle.setAttribute("r", r);
                    circle.setAttribute("class", cls);
                    clockBackground.appendChild(circle);
                });
            
                // Append the clockBackground to the main SVG
                svg.appendChild(clockBackground);
                svgContainer.appendChild(svg);
                return svg;
            }

            function renderClockHandsAndCenterCircle(svg) {
                const marksAndHandsGroup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                marksAndHandsGroup.setAttribute("id", "analogClockId");
                marksAndHandsGroup.setAttribute("viewBox", "0 0 100 100");

                const elements = [
                    { tag: "circle", attrs: { cx: "50", cy: "50", r: "2", class: "clock-bg" } },
                    { tag: "line", attrs: { id: "hour", x1: "50", y1: "50", x2: "50", y2: "26", class: "clock-hand-hour" } },
                    { tag: "line", attrs: { id: "minute", x1: "50", y1: "50", x2: "50", y2: "20", class: "clock-hand-minute" } },
                    { tag: "line", attrs: { id: "second", x1: "50", y1: "50", x2: "50", y2: "19", class: "clock-hand-second" } },
                    { tag: "circle", attrs: { cx: "50", cy: "50", r: "2", fill: "#474646" } }
                ];

                elements.forEach(({ tag, attrs }) => {
                    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
                    for (const [attr, value] of Object.entries(attrs)) {
                        element.setAttribute(attr, value);
                    }
                    marksAndHandsGroup.appendChild(element);
                });

                svg.appendChild(marksAndHandsGroup);
            }

            function renderClockDigits(svg) {
                const markRadius = 34.5;
                const fragment = document.createDocumentFragment();

                for (let i = 1; i <= 12; i++) {
                    const angle = ((i * 30) - 90) * (Math.PI / 180);
                    const point = calculateCoordinates(angle, markRadius, true);
                    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

                    text.setAttribute("x", point.x);
                    text.setAttribute("y", point.y);
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("alignment-baseline", "middle");
                    text.setAttribute("class", "clock-hour-number");
                    text.textContent = i;

                    fragment.appendChild(text);
                }

                svg.appendChild(fragment);
            }

            function renderClockMarks(svg) {
                const fragment = document.createDocumentFragment();

                for (let i = 0; i < 60; i++) {
                    const angle = (i * 6) * (Math.PI / 180);
                    const minuteMarkOuterRadius = 43;
                    const pointMinuteOuter = calculateCoordinates(angle, minuteMarkOuterRadius);
                    const hourMarkInnerRadius = 39;
                    const pointHourInner = calculateCoordinates(angle, hourMarkInnerRadius);
                    const minuteMarkInnerRadius = 40.5;
                    const pointMinuteInner = calculateCoordinates(angle, minuteMarkInnerRadius);

                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", pointMinuteOuter.x);
                    line.setAttribute("y1", pointMinuteOuter.y);

                    if (i % 5 === 0) {
                        line.setAttribute("x2", pointHourInner.x);
                        line.setAttribute("y2", pointHourInner.y);
                        line.setAttribute("class", "clock-hour-line");
                    } else {
                        line.setAttribute("x2", pointMinuteInner.x);
                        line.setAttribute("y2", pointMinuteInner.y);
                        line.setAttribute("class", "clock-minute-line");
                    }

                    fragment.appendChild(line);
                }

                svg.appendChild(fragment);
            }

            function renderClockHands(svg) {
                const now = new Date();
                const second = now.getSeconds();
                const minute = now.getMinutes();
                const hour = now.getHours();

                const secondAngle = second * 6;
                const minuteAngle = minute * 6 + second * 0.1;
                const hourAngle = (hour % 12) * 30 + minute * 0.5;

                const secondHand = svg.querySelector("#second");
                const minuteHand = svg.querySelector("#minute");
                const hourHand = svg.querySelector("#hour");

                secondHand.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
                minuteHand.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
                hourHand.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
            }

            // Create and render the clock SVG elements
            const svg = createClockSvg();
            renderClockHandsAndCenterCircle(svg);
            renderClockDigits(svg);
            renderClockMarks(svg);
            renderClockHands(svg);

            function updateClockHands() {
                renderClockHands(svg);
                requestAnimationFrame(updateClockHands);
            }

            requestAnimationFrame(updateClockHands);

            return {
                updateClockHands
            };
        }

        return {
            createClock
        };
    })();

    global.ClockModule = ClockModule;
})(window);
