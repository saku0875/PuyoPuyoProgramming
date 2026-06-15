class Stage {
    static stageElement = null; // 初期化

    static initialize() {
        // HTMLからステージの元となる要素を取得し、大きさを設定する
        Stage.stageElement = document.getElementById("stage");
        Stage.stageElement.style.width = Config.puyoImageWidth * Config.stageCols + 'px';
        Stage.stageElement.style.height = Config.puyoImageHeight * Config.stageRows + 'px';
        Stage.stageElement.style.backgroundColor = Config.stageBackgroundColor;
    }
}