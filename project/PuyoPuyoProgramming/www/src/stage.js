class Stage {
    static stageElement = null; // 初期化
    static puyoBoard = null;
    static puyoCount = 0;
    static fallingPuyoInfoList = [];

    static initialize() {
        // HTMLからステージの元となる要素を取得し、大きさを設定する
        Stage.stageElement = document.getElementById("stage");
        Stage.stageElement.style.width = Config.puyoImageWidth * Config.stageCols + 'px';
        Stage.stageElement.style.height = Config.puyoImageHeight * Config.stageRows + 'px';
        Stage.stageElement.style.backgroundColor = Config.stageBackgroundColor;
        Stage.stageElement.style.position = 'relative';

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

        // ぷよぷよ盤にぷよ情報をセットする
        static setPuyoInfo(x, y, info) {
            Stage.puyoBoard[y][x] = info;
        }

        // ぷよぷよ盤の情報を返す
        static getPuyoInfo(x, y) {
            // 左右、もしくは底の場合は、ダミーのぷよ情報を返す
            if (x < 0 || x >= Config.stageCols || y >= Config.stageRows) {
                return {
                    puyoColor: -1
                };
            }
            // y座標がマイナスの場合は、そこは空白扱いする
            if (y < 0) {
                return null;
            }
            // それ以外の場合はぷよぷよ盤の情報をそのまま返す
            return Stage.puyoBoard[y][x];
        }

        // ぷよぷよ盤からぷよ情報を消す
        static removePuyoInfo(x, y) {
            Stage.puyoBoard[y][x] = null;
        }

        // 自由落下するぷよがあるかどうかをチェックする
        static checkFallingPuyo() {
            Stage.fallingPuyoInfoList = [];

            // 下の行から上の行を見ていく
            for (let y = Config.stageRows - 2; y >= 0; y--) {
                for (let x = 0; x < Config.stageCols; x++) {
                    const currentPuyoInfo = Stage.getPuyoInfo(x, y);
                    if (!currentPuyoInfo) {
                        // 個のマスにぷよがなければ、次
                        continue;
                    }
                    const belowPuyoInfo = Stage.getPuyoInfo(x, y + 1);
                    if (!belowPuyoInfo) {
                        // 下が空白なので、このぷよは落ちる

                        // まずぷよぷよ盤からそのぷよを取り去る
                        Stage.removePuyoInfo(x, y);

                        // 自由落下した場合にどこまで落ちるのか調べる
                        let destination = y;
                        while (!Stage.getPuyoInfo(x, destination + 1)) {
                            destination++;
                        }
                        // 最終目的地に置く
                        Stage.setPuyoInfo(x, destination, currentPuyoInfo);
                        // 「落ちるぷよ情報リスト」に「落ちるぷよ情報」を入れる
                        Stage.fallingPuyoInfoList.push({
                            element: currentPuyoInfo.element,
                            position: y * Config.puyoImageHeight,
                            destination: destination * Config.puyoImageHeight,
                            falling: true
                        });
                    }
                }
            }
                return(Stage.fallingPuyoInfoList.length > 0);
            }

            // 自由落下させる
            static fallPuyo() {
                let isFalling = false;
                for(const fallingPuyoInfo of Stage.fallingPuyoInfoList) {
                    if (!fallingPuyoInfo.falling) {
                        // すでに自由落下が終っている
                        continue;
                    }
                    // 現在の画面上のY座標を取得して、それに自由落下分を追加する
                    let position = fallingPuyoInfo.position;
                    position += Config.fallingSpeed;

                    if (position >= fallingPuyoInfo.destination) {
                        // 自由落下終了
                        position = fallingPuyoInfo.destination;
                        fallingPuyoInfo.falling = false;
                    } else {
                         // まだ落下しているぷよがあることを記憶する
                         isFalling = true;
                    }
                    // 新しい位置を保持する
                    fallingPuyoInfo.position = position;
                    // ぷよを動かす
                    fallingPuyoInfo.element.style.top = position + "px";
                 }
                 return isFalling;
        }
}