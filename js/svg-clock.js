(function (global) {
    const ClockModule = (function () {
        function createClock(containerId) {
            const _clockSvgId = containerId + 'SVGClock';

            // Ensure the clock div container exists
            const svgContainer = document.getElementById(containerId);
            if (!svgContainer) {
                console.warn(`Clock container with id "${containerId}" not found.`);
                return;
            }   

            function createClockSvg(svgContainer) {
                // Create the main SVG element
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("id", _clockSvgId);
                svg.setAttribute("viewBox", "0 0 100 100");
            
                // Create the clock background SVG element
                const clockBackground = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                clockBackground.setAttribute("id", "clockBackground");
                clockBackground.setAttribute("viewBox", "0 0 100 100");
            
                // Create the outer circle
                const outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                outerCircle.setAttribute("cx", "50");
                outerCircle.setAttribute("cy", "50");
                outerCircle.setAttribute("r", "45.5");
                outerCircle.setAttribute("class", "clock-border-outer");
            
                // Create the inner circle
                const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                innerCircle.setAttribute("cx", "50");
                innerCircle.setAttribute("cy", "50");
                innerCircle.setAttribute("r", "45");
                innerCircle.setAttribute("class", "clock-border-inner");
            
                // Append the circles to the clockBackground
                clockBackground.appendChild(outerCircle);
                clockBackground.appendChild(innerCircle);
            
                // Append the clockBackground to the main SVG
                svg.appendChild(clockBackground);
            
                // Get the container and append the SVG
                //const clockContainer = document.getElementById(containerId);
                svgContainer.appendChild(svg);
            }

            function renderClockHandsAndCenterCircle(svg) {
                            
                const marksAndHandsGroup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                marksAndHandsGroup.setAttribute("id", "analogClockId");
                marksAndHandsGroup.setAttribute("viewBox", "0 0 100 100");
            
                const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                centerCircle.setAttribute("cx", "50");
                centerCircle.setAttribute("cy", "50");
                centerCircle.setAttribute("r", "2");
                centerCircle.setAttribute("class", "clock-bg");
            
                const hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
                hourHand.setAttribute("id", "hour");
                hourHand.setAttribute("x1", "50");
                hourHand.setAttribute("y1", "50");
                hourHand.setAttribute("x2", "50");
                hourHand.setAttribute("y2", "26");
                hourHand.setAttribute("class", "clock-hand-hour");
            
                const minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
                minuteHand.setAttribute("id", "minute");
                minuteHand.setAttribute("x1", "50");
                minuteHand.setAttribute("y1", "50");
                minuteHand.setAttribute("x2", "50");
                minuteHand.setAttribute("y2", "20");
                minuteHand.setAttribute("class", "clock-hand-minute");
            
                const secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
                secondHand.setAttribute("id", "second");
                secondHand.setAttribute("x1", "50");
                secondHand.setAttribute("y1", "50");
                secondHand.setAttribute("x2", "50");
                secondHand.setAttribute("y2", "19");
                secondHand.setAttribute("class", "clock-hand-second");
            
                const centerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                centerFillCircle.setAttribute("cx", "50");
                centerFillCircle.setAttribute("cy", "50");
                centerFillCircle.setAttribute("r", "2");
                centerFillCircle.setAttribute("fill", "#474646");
            
                marksAndHandsGroup.appendChild(centerCircle);
                marksAndHandsGroup.appendChild(hourHand);
                marksAndHandsGroup.appendChild(minuteHand);
                marksAndHandsGroup.appendChild(secondHand);
                marksAndHandsGroup.appendChild(centerFillCircle);
            
                svg.appendChild(marksAndHandsGroup);
            }

            function renderClockDigits(svg) {

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

            function renderClockMarks(svg) {
                
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

            function calculateCoordinates(angle, radius, hasCorrection = false) {
                const x = 50 + radius * Math.cos(angle);
                // Adjust clock digits vertical position
                const y = 50 + radius * Math.sin(angle) + (hasCorrection ? 1 : 0);
                return { x, y };
            }

            // Create main svg container, clock circles, and clock background
            createClockSvg(svgContainer);

            // Get main svg element
            const svg = document.getElementById(_clockSvgId);

            renderClockHandsAndCenterCircle(svg);

            renderClockDigits(svg);

            renderClockMarks(svg);

            renderClockHands(svg);

            setInterval(renderClockHands, 1000, svg);

            return {
                updateClockHands: renderClockHands
            };
        }

        return {
            createClock
        };
    })();

    global.ClockModule = ClockModule;
})(window);
