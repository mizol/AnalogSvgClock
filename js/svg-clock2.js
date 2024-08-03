
const ClockModule = (function () {
    function createClock() {
        let _isAfternoonMode = false;
        let _clockId = '';
        function calculatePath(startHour, startMinute, endHour, endMinute) {
            const centerX = 50;
            const centerY = 50;
            const radius = 44.5;

            // Convert time to angles in degrees
            const startAngle = ((startHour % 12) * 30 + (startMinute / 2)) - 90;
            const endAngle = ((endHour % 12) * 30 + (endMinute / 2)) - 90;

            // Convert degrees to radians
            const startAngleRad = (Math.PI / 180) * startAngle;
            const endAngleRad = (Math.PI / 180) * endAngle;

            // Calculate start and end points
            const startX = centerX + radius * Math.cos(startAngleRad);
            const startY = centerY + radius * Math.sin(startAngleRad);
            const endX = centerX + radius * Math.cos(endAngleRad);
            const endY = centerY + radius * Math.sin(endAngleRad);

            // Determine if the arc spans more than 180 degrees
            const largeArcFlag = (endAngle - startAngle <= 180) ? 0 : 1;

            // Create the path data
            const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} L ${centerX} ${centerY} Z`;

            return pathData;
        }

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

                const active = _isAfternoonMode ? hour >= 12 : hour < 12;

                if (active) {
                    secondHand.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
                    minuteHand.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
                    hourHand.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
                    secondHand.style.display = 'block';
                    minuteHand.style.display = 'block';
                    hourHand.style.display = 'block';
                } else {
                    secondHand.style.display = 'none';
                    minuteHand.style.display = 'none';
                    hourHand.style.display = 'none';
                }
            }
        }

        function getTimeObject(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            return new Date(0, 0, 0, hours, minutes, seconds);
        }

        function updateWatchRegions(outages) {
            const clockElement = document.getElementById(_clockId);
            const filledCircle = clockElement.querySelector('.watch-bg');

            outages.forEach(period => {
                
                const startTime = getTimeObject(period.start_time);
                const endTime = getTimeObject(period.end_time);

                const pathData = calculatePath(startTime.getHours(), startTime.getMinutes(), endTime.getHours(), endTime.getMinutes());

                const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathElement.setAttribute("d", pathData);
                pathElement.setAttribute("style", "stroke:#FF9E9E; stroke-width:0.2; fill:#FDC8C8; fill-opacity:0.4;");

                filledCircle.insertAdjacentElement('afterend', pathElement);
            });
        }

        function initializeClock(clockId, isAfternoonMode) {
            _clockId = clockId;
            _isAfternoonMode = isAfternoonMode?.toLowerCase?.() === 'true';;

            updateClock();
            setInterval(updateClock, 1000);

            return this;
        }
               
        function bindOutages(outages) {
            updateWatchRegions(outages);
        }

        return {
            initializeClock,
            bindOutages
        };
    }

    return {
        createClock
    };
})();

export default ClockModule;
