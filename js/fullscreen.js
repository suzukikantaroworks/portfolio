/**
 * js/fullscreen.js
 * 役割: 全画面化と同時に Unity へフォーカスを強制復帰させてレンダリング停止を防ぐ
 */

export function toggleFullscreen(iframeId) {
  const iframe = document.getElementById(iframeId);

  if (!iframe) {
    console.error(`[Fullscreen Error] Target iframe '#${iframeId}' not found.`);
    return;
  }

  const container = iframe.closest('.game-wrapper') || iframe;

  // 1. 全画面化の実行
  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  // 2. 【最重要】全画面化直後に Unity キャンバスへフォーカスを強制的に渡す
  setTimeout(() => {
    try {
      // iframe 自体にフォーカスを当てる
      iframe.focus();

      // iframe 内部のキャンバス要素を取得して直接フォーカスを当てる
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const unityCanvas = iframeDoc.querySelector('#unity-canvas');
      
      if (unityCanvas) {
        unityCanvas.focus();
        // Unity側のキャンバスにクリックイベントを疑似発行して描画ループを再起動
        unityCanvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        unityCanvas.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      }
    } catch (e) {
      console.warn('Focus delegation failed:', e);
    }
  }, 50); // 全画面切り替えの処理完了をわずかに待ってから実行
}