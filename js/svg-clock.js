(function (global) {
    const ClockModule = (function () {
        function createClock(clockId) {
            const _clockId = clockId;

            // Ensure the SVG element exists
            const svg = document.getElementById(_clockId);
            if (!svg) {
                console.warn(`SVG with id "${_clockId}" not found.`);
                return;
            }

            function renderClockHands() {
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

            function calculateCoordinates(angle, radius, hasCorrection = false) {
                const x = 50 + radius * Math.cos(angle);
                // Adjust clock digits vertical position
                const y = 50 + radius * Math.sin(angle) + (hasCorrection ? 1 : 0);
                return { x, y };
            }

            function renderClockDigits() {

                const markRadius = 34.5;
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
                    svg.appendChild(text);
                }
            }

            function renderClockMarks() {
                
                for (let i = 0; i < 60; i++) {
                    const angle = (i * 6) * (Math.PI / 180);

                    // Outer circle radius for minute marks
                    const minuteMarkOuterRadius = 42;
                    const pointMinuteOuter = calculateCoordinates(angle, minuteMarkOuterRadius);

                    // Inner circle radius for hour marks
                    const hourMarkInnerRadius = 39;
                    const pointHourInner = calculateCoordinates(angle, hourMarkInnerRadius);

                    // Inner circle radius for minute marks
                    const minuteMarkInnerRadius = 40;
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
                    svg.appendChild(line);
                }                
            }

            // Initialize the clock
            renderClockDigits();
            renderClockMarks();
            renderClockHands();

            setInterval(renderClockHands, 1000);

            return {
                updateClock: renderClockHands
            };
        }

        return {
            createClock
        };
    })();

    global.ClockModule = ClockModule;
})(window);
