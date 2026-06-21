class Player {
    static centerPuyoColor = 0;
    static rotatingPuyoColor = 0;
    static playerPuyoStatus = null;
    static centerPuyoElement = null;
    static rotatingPuyoElement = null;
    static groundedFrame = 0;
    static keyStatus = null;

    static initialize() {
        // キーボードの入力を確認する
        Player.keyStatus = {
            right: false,
            left: false,
            up: false,
            down: false
        };
        // ブラウザのキーボードの入力を取得するイベントリスナを登録する
        document.addEventListener('keydown', (event) => {
            // キーボードが押された場合
            switch (event.key) {
                case "ArrowLeft": // 左向きキー
                    Player.keyStatus.left = true;
                    event.preventDefault();
                    return;
                case "ArrowUp":
                    Player.keyStatus.right = true;
                    event.preventDefault();
                    return;
                case "ArrowRight":
                    Player.keyStatus.right = true;
                    event.preventDefault();
                    return;
                case "ArrowDown":
                    Player.keyStatus.down = true;
                    event.preventDefault();
                    return;
            }
        });

                document.addEventListener('keyup', (event) => {
            // キーボードが離された場合
            switch (event.key) {
                case "ArrowLeft": // 左向きキー
                    Player.keyStatus.left = false;
                    event.preventDefault();
                    return;
                case "ArrowUp":
                    Player.keyStatus.right = false;
                    event.preventDefault();
                    return;
                case "ArrowRight":
                    Player.keyStatus.right = false;
                    event.preventDefault();
                    return;
                case "ArrowDown":
                    Player.keyStatus.down = false;
                    event.preventDefault();
                    return;
            }
        });

    }

    // プレイヤーが操作するぷよを作る
    static createPlayerPuyo() {
        // ぷよぷよが置けるかどうか、1番上の段の左から3つめを確認する
        if (Stage.getPuyoInfo(2, 0)) {
            // 空白でない場合は新しいぷよを置けない
            return false;
        }

        // 新しいぷよの色を決める
        Player.centerPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
        Player.rotatingPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;

        // 新しいぷよ画像を作成する
        Player.centerPuyoElement = GameImage.getPuyoImage(Player.centerPuyoColor);
        Player.centerPuyoElement.style.position = 'absolute';
        Player.rotatingPuyoElement = GameImage.getPuyoImage(Player.rotatingPuyoColor);
        Player.rotatingPuyoElement.style.position = 'absolute';
        Stage.stageElement.appendChild(Player.centerPuyoElement);
        Stage.stageElement.appendChild(Player.rotatingPuyoElement);

        // ぷよの初期情報を定める
        Player.playerPuyoStatus = {
            x: 2,
            y: -1,
            left: 2 * Config.puyoImageWidth,
            top: -1 * Config.puyoImageHeight,
            dx: 1,
            dy: 0,
            rotation: 90 // 画面上の回転するぷよの角度: 90度（上向き）
        };
        // 接地時間はゼロ
        Player.groundedFrame = 0;
        // ぷよを描画
        Player.setPlayerPuyoPosition();
        return true;
    }

    // playerPuyoStatusに従って、画面上のぷよの位置を更新する
    static setPlayerPuyoPosition() {
        // まず中心ぷよの位置を確定させる
        Player.centerPuyoElement.style.left = Player.playerPuyoStatus.left + 'px';
        Player.centerPuyoElement.style.top = Player.playerPuyoStatus.top + 'px';

        // 次に回転するぷよの位置を計算する
        const x = Player.playerPuyoStatus.left + Math.cos(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageWidth;
        const y = Player.playerPuyoStatus.top - Math.sin(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageHeight;
        Player.rotatingPuyoElement.style.left = x + 'px';
        Player.rotatingPuyoElement.style.top = y + 'px';
    }

    // プレイヤーの操作ぷよを落下させる
    static dropPlayerPuyo(isPressingDown) {
        let{ x, y, dx, dy } = Player.playerPuyoStatus;

        //現状のプレイヤーの操作ぷよの下にぷよがあるか確認する
        if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x + dx, y + dy + 1)) {
            // 中心ぷよ・回転するぷよ両方の下にぷよがないので、自由落下してよい
            Player.playerPuyoStatus.top += Config.playerFallingSpeed;
            if (isPressingDown) {
                Player.playerPuyoStatus.top += Config.playerDownSpeed;
            }
            // 自由落下した際、マス目の境界を超えていないか確認する
            if (Math.floor(Player.playerPuyoStatus.top / Config.puyoImageHeight) != y) {
                // ブロックの境を超えたので、自分の位置を1つ下にずらす
                y += 1;
                Player.playerPuyoStatus.y = y;
                // 下にブロックがないか再度チェックする
                if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x + dx, y + dy + 1)) {
                    // 境を超えたが、下にぷよはなかった。接地していないよう設定して、自由落下を続ける
                    Player.groundedFrame = 0;
                    return false;
                } else {
                    // 境を超えたらぷよにぶつかった。位置を調節して、接地を開始する
                    Player.playerPuyoStatus.top = y * Config.puyoImageHeight;
                    Player.groundedFrame = 1;
                    return false;
                }
            } else {
                // 自由落下でマス目を超えていなかった。接地していないように設定して、自由落下を続ける
                Player.groundedFrame = 0;
                return false;
            }
        } else {
            // プレイヤーのぷよ操作ぷよの下にぷよがあるので、必ず接地している
            if (Player.groundedFrame === 0) {
                // 初接地である。接地を開始する
                Player.groundedFrame = 1;
                return false;
            } else {
                // 接地中である。接地の時間を増加させる。
                Player.groundedFrame++;
                if (Player.groundedFrame > Config.playerLockDelayFrames) {
                    // 接地で一定時間が経過した。この位置で固定する。
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    // イベントループで現在の状況を更新する
    static update() {
        // まずプレイヤーの操作ぷよを落下させる
        if (Player.dropPlayerPuyo(Player.keyStatus.down)) {
            // 接地が終ったら、ぷよを固定する
            return "fix";
        }
        // ぷよの位置を更新する
        Player.setPlayerPuyoPosition();
        return "playing";
    }

    // 現在のプレイヤー操作ぷよを、ぷよぷよ盤の上に配置する
    static fixPlayerPuyo() {
        const { x, y, dx, dy } = Player.playerPuyoStatus;
        if (y >= 0) {
            // 中心ぷよが画面内にあった場合のみ配置する。画面外ならば配置しない
            Stage.createPuyo(x, y, Player.centerPuyoColor);
        }
        if (y + dy >= 0) {
            // 回転するぷよが画面内にあった場合のみ配置する。画面外ならば配置しない
            Stage.createPuyo(x + dx, y + dy, Player.rotatingPuyoColor);
        }
        // 操作用に作成したプレイヤーぷよ画像を画面上から消す
        Player.centerPuyoElement.remove();
        Player.centerPuyoElement = null;
        Player.rotatingPuyoElement.remove();
        Player.rotatingPuyoElement = null;
    }
}