const Analyser = function (source) {
    const an = this,
        AudioContext = window.AudioContext || window.webkitAudioContext;

    //Создание источника
    this.audio = source;

    //Создаем аудио-контекст
    this.context = new AudioContext();
    this.node = this.context.createScriptProcessor(2048, 1, 1);

    //Создаем анализатор
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);

    try {
        //отправляем на обработку в  AudioContext
        an.source = an.context.createMediaElementSource(an.audio);

        //связываем источник и анализатором
        an.source.connect(an.analyser);

        //связываем анализатор с интерфейсом, из которого он будет получать данные
        an.analyser.connect(an.node);

        //Связываем все с выходом
        an.node.connect(an.context.destination);
        an.source.connect(an.context.destination);

        //подписываемся на событие изменения входных данных
        an.node.onaudioprocess = function () {
            an.analyser.getByteFrequencyData(an.bands);
            if (!an.audio.paused) {
                if (typeof an.update === "function") {
                    return an.update(an.bands);
                } else {
                    return 0;
                }
            }
        };
    } catch (e) {
        console.log(e);
    }

    return this;
};