/**
 * main.js
 * 役割: サイト全体のメインエントリーポイント・イベント管理
 */
import { toggleFullscreen } from './fullscreen.js';

// DOM（HTML要素）の読み込み完了後に処理を実行
document.addEventListener('DOMContentLoaded', () => {
  // 全画面表示ボタンの要素を取得
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  if (fullscreenBtn) {
    // クリックイベントの登録
    fullscreenBtn.addEventListener('click', () => {
      toggleFullscreen('pusher-game-frame');
    });
  }
});