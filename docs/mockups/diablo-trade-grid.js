/* ═══════════════════════════════════════════════
   DIABLO TRADE — INVENTORY GRID BACKGROUND
   ═══════════════════════════════════════════════

   3 parts below:
   1. CSS
   2. HTML (place inside your Diablo Trade section)
   3. JS  (place in a <script> or import as module)

   Requirements:
   - Parent section needs: position: relative; overflow: hidden;
   - Font: JetBrains Mono (used for symbols and labels)
*/


/* ─────────────────────────────────────────────
   1. CSS
   ───────────────────────────────────────────── */

// .diablo-bg {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   z-index: 0;
//   overflow: hidden;
// }

// .diablo-bg canvas {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   mask-image:
//     linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
//   -webkit-mask-image:
//     linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
// }


/* ─────────────────────────────────────────────
   2. HTML — place inside your section element

   <section class="your-diablo-section" style="position:relative;overflow:hidden;">
     <div class="diablo-bg">
       <canvas id="diabloGrid"></canvas>
     </div>
     <!-- ...your content here... -->
   </section>

   ───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   3. JAVASCRIPT — below
   ───────────────────────────────────────────── */

// ─── Diablo Trade Inventory Grid ───
(function() {
  var canvas = document.getElementById('diabloGrid');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var w, h;

  var cellSize = 52;
  var gap = 3;
  var step = cellSize + gap;
  var cols, rows;
  var cells = [];

  var symbols = ['⚔', '◈', '☆', '♦'];

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(w / step) + 2;
    rows = Math.ceil(h / step) + 2;

    cells = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var filled = Math.random() < 0.08;
        cells.push({
          filled: filled,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          alpha: filled ? 0.04 + Math.random() * 0.03 : 0,
          targetAlpha: filled ? 0.04 + Math.random() * 0.03 : 0,
          timer: 500 + Math.random() * 1500,
        });
      }
    }
  }

  var frame = 0;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, w, h);

    var offsetX = ((w % step) / 2) - step;
    var offsetY = ((h % step) / 2) - step;
    var gridTop = h * 0.10;
    var gridBot = h * 0.90;

    // Clip grid to middle zone
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, gridTop, w, gridBot - gridTop);
    ctx.clip();

    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var idx = r * cols + c;
        var cell = cells[idx];
        var x = offsetX + c * step;
        var y = offsetY + r * step;

        // Cell border
        ctx.strokeStyle = 'rgba(255,255,255,0.015)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Slow timer
        cell.timer--;
        if (cell.timer <= 0) {
          if (cell.filled) {
            cell.targetAlpha = 0;
            cell.timer = 800 + Math.random() * 2000;
          } else if (Math.random() < 0.15) {
            cell.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            cell.targetAlpha = 0.04 + Math.random() * 0.03;
            cell.filled = true;
            cell.timer = 600 + Math.random() * 1500;
          } else {
            cell.timer = 400 + Math.random() * 1000;
          }
        }

        // Very slow fade
        if (cell.alpha < cell.targetAlpha) {
          cell.alpha = Math.min(cell.alpha + 0.0008, cell.targetAlpha);
        } else if (cell.alpha > cell.targetAlpha) {
          cell.alpha = Math.max(cell.alpha - 0.0008, cell.targetAlpha);
          if (cell.alpha <= 0.001) {
            cell.filled = false;
            cell.alpha = 0;
          }
        }

        if (cell.alpha > 0.001) {
          ctx.fillStyle = 'rgba(255,255,255,' + cell.alpha.toFixed(4) + ')';
          ctx.fillText(cell.symbol, x + cellSize / 2, y + cellSize / 2);
        }
      }
    }

    ctx.restore();

    // ══════════════════════════════════
    // TOP — WebSocket status bar
    // ══════════════════════════════════
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.04, h * 0.07);
    ctx.lineTo(w * 0.96, h * 0.07);
    ctx.stroke();

    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textBaseline = 'middle';
    var topY = h * 0.038;

    var blink = Math.sin(frame * 0.05) > 0;
    ctx.textAlign = 'left';

    if (blink) {
      ctx.beginPath();
      ctx.arc(w * 0.05, topY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.045)';
    ctx.fillText('ws://live', w * 0.06, topY);

    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('●  CONNECTED', w * 0.14, topY);

    var latency = 11 + Math.floor(Math.sin(frame * 0.02) * 3 + Math.sin(frame * 0.007) * 2);
    ctx.fillText('│', w * 0.30, topY);
    ctx.fillText('latency: ' + latency + 'ms', w * 0.32, topY);

    ctx.fillText('│', w * 0.48, topY);
    ctx.fillText('uptime: 99.8%', w * 0.50, topY);

    var evts = 42 + Math.floor(Math.sin(frame * 0.013) * 8);
    ctx.textAlign = 'right';
    ctx.fillText('events/s: ' + evts, w * 0.95, topY);

    // ══════════════════════════════════
    // BOTTOM — Search index stats
    // ══════════════════════════════════
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.beginPath();
    ctx.moveTo(w * 0.04, h * 0.935);
    ctx.lineTo(w * 0.96, h * 0.935);
    ctx.stroke();

    var botY = h * 0.965;
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';

    ctx.fillText('indexed: 14,247 items', w * 0.05, botY);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillText('│', w * 0.24, botY);

    var qps = 840 + Math.floor(Math.sin(frame * 0.011) * 30);
    ctx.fillText('queries/s: ' + qps, w * 0.26, botY);

    ctx.fillText('│', w * 0.42, botY);
    ctx.fillText('cache: HIT 94.2%', w * 0.44, botY);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('MARKETPLACE  ·  LIVE', w * 0.95, botY);

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();