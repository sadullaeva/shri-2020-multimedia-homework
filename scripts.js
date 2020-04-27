let audioAnalyser = null;

function openFullScreen(event) {
    event.currentTarget.classList.add('video_full-screen');

    const video = event.currentTarget.querySelector('video');
    video.muted = false;

    visualizeAudio(video);
}

function exitFullScreen(event) {
    event.stopPropagation();

    const videoContainer = event.currentTarget.closest('.video');
    videoContainer.classList.remove('video_full-screen');

    const video = videoContainer.querySelector('video');
    video.muted = true;

    audioAnalyser = null;
}

function changeBrightness(event) {
    const { value } = event.currentTarget;
    const videoContainer = event.currentTarget.closest('.video');
    const video = videoContainer.querySelector('video');

    video.style.filter = `brightness(${value})`;
}

function changeContrast(event) {
    const { value } = event.currentTarget;
    const videoContainer = event.currentTarget.closest('.video');
    const video = videoContainer.querySelector('video');

    video.style.filter = `contrast(${value})`;
}

function visualizeAudio(video) {
    const videoContainer = video.closest('.video');
    const visualizer = videoContainer.querySelector('.video-controls__volume-level');

    audioAnalyser = new Analyser(video);
    audioAnalyser.update = function (bands) {
        const value = bands.reduce((acc, band) => acc + band, 0) / 256;
        visualizer.style.width = `${Math.round(value)}%`;
    };
}

(function () {
    const videos = document.querySelectorAll('.video').values();

    for (let video of videos) {
        video.addEventListener('click', openFullScreen);

        const exitControl = video.querySelector('.video-controls__exit-fullscreen');
        exitControl.addEventListener('click', exitFullScreen);

        const brightnessControl = video.querySelector('.video-controls__brightness input[type=range]');
        brightnessControl.addEventListener('input', changeBrightness);

        const contrastControl = video.querySelector('.video-controls__contrast input[type=range]');
        contrastControl.addEventListener('input', changeContrast);
    }
})();
