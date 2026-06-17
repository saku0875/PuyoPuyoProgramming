class Stage {
    static stageElement = null; // 初期化
    static puyoBoard = null;
    static puyoCount = 0;

    static initialize() {
        // HTMLからステージの元となる要素を取得し、大きさを設定する
        Stage.stageElement = document.getElementById("stage");
        Stage.stageElement.style.width = Config.puyoImageWidth * Config.stageCols + 'px';
        Stage.stageElement.style.height = Config.puyoImageHeight * Config.stageRows + 'px';
        Stage.stageElement.style.backgroundColor = Config.stageBackgroundColor;
        Stage.stageElement.style.positn = 'relative';

        // ぷよぷよ盤を初期化する
        Stage.puyoCount = 0;
        Stage.puyoBoard = [];
        for (let y = 0; y < Config.stageRows; y++) {
            Stage.puyoBoard[y] = [];
            for (let x = 0; x < Config.stageCols; x++) {
                Stage.puyoBoard[y][x] = null;
            }
        }

        // もし初期状態ステージの情報があれば、その情報をもとにぷよを配置する
        for (let y = 0; y < Config.stageRows; y++) {
            for (let x = 0; x < Config.stageCols; x++) {
                let puyoColor = 0;
                if (Config.initialBoard && Config.initialBoard[y][x]) {
                    puyoColor = Config.initialBoard[y][x];
                }
                if (puyoColor >= 1 && puyoColor <= Config.puyoColorMax) {
                    Stage.createPuyo(x, y, puyoColor);
                }
            }
        }
    }

    // ぷよを新しく作って、画面上とぷよぷよ盤の両方にセットする
    static createPuyo(x, y, puyoColor) {
        // 画面を作成し、画面上の適切な位置に配置する
        const puyoImage = GameImage.getPuyoImage(puyoColor);
        puyoImage.style.position = 'absolute';
        puyoImage.style.left = x * Config.puyoImageWidth + "px";
        puyoImage.style.top = y * Config.puyoImageHeight + "px";
        Stage.stageElement.appendChild(puyoImage);

        // ぷよぷよ盤に情報を保存する
        Stage.puyoBoard[y][x] = {
            puyoColor: puyoColor,
            element: puyoImage
        }
        // ぷよの総数を追加する
        Stage.puyoCount++;
    }
}