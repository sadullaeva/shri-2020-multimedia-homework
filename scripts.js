function openFullScreen() {
    this.classList.add('video_full-screen');
}

(function () {
    const videos = document.querySelectorAll('.video').values();

    for (let video of videos) {
        video.onclick = function() {
            openFullScreen.bind(this)();
        }
    }
})();
