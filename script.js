document.addEventListener('DOMContentLoaded', function() {
    // Clock Functionality
    const clock = document.getElementById('clock');
    const tickSound = document.getElementById('tickSound');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Play quiet ticking sound for clock
        tickSound.volume = 0.2;
        tickSound.currentTime = 0;
        tickSound.play();
    }
    
    setInterval(updateClock, 1000);
    updateClock(); // Initialize immediately

    // Stopwatch Functionality
    const stopwatch = document.getElementById('stopwatch');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsContainer = document.getElementById('laps');
    const runner = document.getElementById('runner');
    const watch = document.getElementById('watch');
    const lapSound = document.getElementById('lapSound');
    
    let timer;
    let isRunning = false;
    let startTime;
    let elapsedTime = 0;
    let lapTimes = [];
    
    function formatTime(ms) {
        const date = new Date(ms);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    function updateStopwatch() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        stopwatch.textContent = formatTime(elapsedTime);
        watch.textContent = formatTime(elapsedTime);
        
        // Move runner based on time (0% to 90% of track width)
        const progress = (elapsedTime % 10000) / 10000; // Reset every 10 seconds for demo
        runner.style.left = `${progress * 90}%`;
        
        // Play ticking sound
        tickSound.volume = 0.5;
        tickSound.currentTime = 0;
        tickSound.play();
    }
    
    function addLap() {
        const lapTime = elapsedTime;
        lapTimes.unshift(lapTime);
        
        // Play lap sound
        lapSound.currentTime = 0;
        lapSound.play();
        
        // Update laps display
        lapsContainer.innerHTML = '';
        lapTimes.forEach((lap, index) => {
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span>Lap ${lapTimes.length - index}</span>
                <span>${formatTime(lap)}</span>
            `;
            lapsContainer.appendChild(lapItem);
        });
    }
    
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateStopwatch, 10);
        }
    });
    
    stopBtn.addEventListener('click', () => {
        if (isRunning) {
            isRunning = false;
            clearInterval(timer);
        }
    });
    
    lapBtn.addEventListener('click', () => {
        if (isRunning) {
            addLap();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = 0;
        stopwatch.textContent = "00:00:00";
        watch.textContent = "00:00:00";
        runner.style.left = "10px";
        lapTimes = [];
        lapsContainer.innerHTML = '';
    });
});
