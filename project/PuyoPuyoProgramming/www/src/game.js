// 起動されたときに呼ばれる関数を登録する
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();

    // ゲームループを開始する
    gameLoop();
});

let gameState; // ゲームの現在の状況
let frame; // ゲームの現在フレーム
let comboCount = 0;

function initialize() {
    // 画像を準備する
    GameImage.initialize();

    // ステージを準備する
    Stage.initialize();

    // シーンを初期状態にセットする
    gameState = 'start';
    // フレームを初期化する
    frame = 0;
}
function gameLoop() {
    switch (gameState) {
        case 'start':
            // ゲーム開始直後の状態
            // 最初は、もしかしたら空中にあるかもしれないぷよを自由落下させるところからスタート
            gameState = 'checkFallingPuyo';
            break;
        case 'checkFallingPuyo':
            // 落ちるかどうか判定する状態
            if (Stage.checkFallingPuyo()) {
                gameState = 'fallingPuyo';
            } else {
                gameState = 'checkPuyoErase';
            }
            break;
        case 'fallingPuyo':
            // ぷよが自由落下しているアニメーション状態
            if (!Stage.fallPuyo()) {
                gameState = 'checkPuyoErase';
            }
            break;
        case 'checkPuyoErase':
            // 消せるかどうか判定する状態
            const eraseInfo = Stage.checkPuyoErase(frame);
            if (eraseInfo) {
                gameState = 'erasingPuyo';
                comboCount++;
                Stage.hideZenkeshi();
            } else {
                if (Stage.puyoCount === 0 && comboCount > 0) {
                    // 全部消えたので、全消しを表示する
                    Stage.showZenkeshi();
                }
                comboCount = 0;
                gameState = 'createPlayerPuyo';
            }
            break;
        case 'erasingPuyo':
            // ぷよが消えているアニメーション状態
            if (!Stage.erasePuyo(frame)) {
                // 消し終わったら、再度落ちるかどうか判定する
                gameState = 'checkFallingPuyo';
            }
            break;
            case 'createPlayerPuyo':
                // 新しくプレイヤーの操作ぷよを作成する状態
                if (!Player.createPlayerPuyo()) {
                    // 新しい操作用ぷよを作成する。作成できなかったら、ゲームオーバー
                    gameState = 'gameOver';
                } else {
                    // プレイヤーが操作する
                    gameState = 'playing';
                }
                break;
            case 'playing':
                // プレイヤーが操作する状態
                const nextAction = Player.update();
                gameState = nextAction; // 'playing' 'fix' のどれかが返ってくる
                break;
            case 'fix':
                // 現在の位置でぷよを固定する状態
                Player.fixPlayerPuyo();
                // 固定が完了したら、自由落下できるぷよがあるかどうかを確認する
                gameState = 'checkFallingPuyo';
                break;
    }
    frame++;
    setTimeout(gameLoop, 1000 / 60); // 1/60秒後にもう一度呼び出す
}