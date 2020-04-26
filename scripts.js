function openFullScreen(event) {
    event.currentTarget.classList.add('video_full-screen');
}

function exitFullScreen(event) {
    event.stopPropagation();

    const video = event.currentTarget.closest('.video');
    video.classList.remove('video_full-screen');
}

(function () {
    const videos = document.querySelectorAll('.video').values();

    for (let video of videos) {
        video.addEventListener('click', openFullScreen);

        const exitControl = video.querySelector('.video-controls__exit-fullscreen');
        exitControl.addEventListener('click', exitFullScreen);
    }
})();
