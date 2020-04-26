function openFullScreen(event) {
    event.currentTarget.classList.add('video_full-screen');
}

function exitFullScreen(event) {
    event.stopPropagation();

    const video = event.currentTarget.closest('.video');
    video.classList.remove('video_full-screen');
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
