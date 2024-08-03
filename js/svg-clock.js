
(function (global) {
    const ClockModule = (function () {
        function createClock() {

            let _clockId = '';

            function updateClock() {
                const now = new Date();
                const second = now.getSeconds();
                const minute = now.getMinutes();
                const hour = now.getHours();

                const secondAngle = second * 6;
                const minuteAngle = minute * 6 + second * 0.1;
                const hourAngle = (hour % 12) * 30 + minute * 0.5;

                const clock = document.getElementById(_clockId);
                if (clock) {
                    const secondHand = clock.querySelector("#second");
                    const minuteHand = clock.querySelector("#minute");
                    const hourHand = clock.querySelector("#hour");

                    secondHand.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
                    minuteHand.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
                    hourHand.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
                    secondHand.style.display = 'block';
                    minuteHand.style.display = 'block';
                    hourHand.style.display = 'block';
                }
                else{
                    console.warn(`SVG with id "${_clockId}" not found.`);
                }
            }

            function calculateCoordinates(angle, radius, hasCorrection = false) {
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle) + (hasCorrection ? 1 : 0);
                return { x, y };
            }

            function renderHourNumbers(clockId) {
                const svg = document.getElementById(clockId);
                for (let i = 1; i <= 12; i++) {
                    const angle = ((i * 30) - 90) * (Math.PI / 180);
                    const point = calculateCoordinates(angle, 35.5, true);

                    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute("x", point.x);
                    text.setAttribute("y", point.y);
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("alignment-baseline", "middle");
                    text.setAttribute("font-size", "6");
                    text.setAttribute("fill", "black");
                    text.textContent = i;
                    svg.appendChild(text);
                }
            }

            function initMarks(clockId) {
                const svg = document.getElementById(clockId);

                if (!svg) {
                    console.warn(`SVG with id "${clockId}" not found.`);
                    return;
                }

                for (let i = 0; i < 60; i++) {
                    const angle = (i * 6) * (Math.PI / 180);
                    // Outer circle radius for minute marks
                    const point1 = calculateCoordinates(angle, 43);
                    // Inner circle radius for hour marks
                    const point2 = calculateCoordinates(angle, 39);
                    // Inner circle radius for minute marks
                    const point3 = calculateCoordinates(angle, 41);

                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", point1.x);
                    line.setAttribute("y1", point1.y);

                    if (i % 5 === 0) {
                        // Hour marks
                        line.setAttribute("x2", point2.x);
                        line.setAttribute("y2", point2.y);
                        line.setAttribute("stroke", "#474646");
                        line.setAttribute("stroke-width", "1.2");
                    } else {
                        // Minute marks
                        line.setAttribute("x2", point3.x);
                        line.setAttribute("y2", point3.y);
                        line.setAttribute("stroke", "#474646");
                        line.setAttribute("stroke-width", "0.75");
                    }
                    svg.appendChild(line);
                }

                renderHourNumbers(clockId);
            }

            function initializeClock(clockId) {
                _clockId = clockId;
                initMarks(_clockId);
                updateClock();
                setInterval(updateClock, 1000);
                return this;
            }

            return {
                initializeClock
            };
        }

        return {
            createClock
        };
    })();

    global.ClockModule = ClockModule;
})(window);
