/* ═══════════════════════════════════════════════
   FJORD FOUNDRY — LBP BONDING CURVE BACKGROUND
   ═══════════════════════════════════════════════

   3 parts below:
   1. CSS
   2. HTML (place inside your Fjord section)
   3. JS  (place in a <script> or import as module)

   Requirements:
   - Parent section needs: position: relative; overflow: hidden;
   - Font: JetBrains Mono (used for chart labels)
*/


/* ─────────────────────────────────────────────
   1. CSS
   ───────────────────────────────────────────── */

// .fjord-bg {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   z-index: 0;
//   overflow: hidden;
// }

// .fjord-bg canvas {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   mask-image:
//     radial-gradient(ellipse 90% 70% at 50% 50%, black 15%, transparent 70%);
//   -webkit-mask-image:
//     radial-gradient(ellipse 90% 70% at 50% 50%, black 15%, transparent 70%);
// }


/* ─────────────────────────────────────────────
   2. HTML — place inside your section element

   <section class="your-fjord-section" style="position:relative;overflow:hidden;">
     <div class="fjord-bg">
       <canvas id="fjordCurve"></canvas>
     </div>
     <!-- ...your content here... -->
   </section>

   ───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   3. JAVASCRIPT — below
   ───────────────────────────────────────────── */

// ─── Fjord LBP Bonding Curve ───
(function() {
  var canvas = document.getElementById('fjordCurve');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var w, h;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  var padT = 0.18;
  var padB = 0.15;

  function curveY(xNorm) {
    var decay = Math.exp(-3.2 * xNorm);
    var noise = Math.sin(xNorm * 42) * 0.008 + Math.sin(xNorm * 97) * 0.004;
    return decay + noise;
  }

  // Pre-generate volume bar data (deterministic)
  var volBars = [];
  for (var v = 0; v < 36; v++) {
    var base = Math.exp(-2 * (v / 36)) * 0.8;
    var spike = Math.abs(Math.sin(v * 7.3 + 2.1)) * 0.4 + Math.abs(Math.sin(v * 13.7)) * 0.2;
    volBars.push(Math.min(1, base + spike * base));
  }

  // Tracer state
  var tracerT = 0;
  var tracerSpeed = 0.0012;
  var trail = [];
  var trailMax = 40;

  var frame = 0;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, w, h);

    var chartL = w * 0.08;
    var chartR = w * 0.92;
    var chartT = h * padT;
    var chartB = h * (1 - padB);
    var chartW = chartR - chartL;
    var chartH = chartB - chartT;

    // ══════════════════════════════════
    // BASE CHART
    // ══════════════════════════════════

    // Axis lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(chartL, chartT - 10);
    ctx.lineTo(chartL, chartB);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(chartL, chartB);
    ctx.lineTo(chartR + 10, chartB);
    ctx.stroke();

    // Y-axis tick marks + price labels
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';

    var prices = [1.0, 0.75, 0.5, 0.25, 0.0];
    for (var p = 0; p < prices.length; p++) {
      var ty = chartB - prices[p] * chartH;
      ctx.beginPath();
      ctx.moveTo(chartL - 4, ty);
      ctx.lineTo(chartL, ty);
      ctx.stroke();
      if (prices[p] > 0 && prices[p] < 1) {
        ctx.setLineDash([2, 6]);
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.beginPath();
        ctx.moveTo(chartL + 1, ty);
        ctx.lineTo(chartR, ty);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      }
      ctx.fillText(prices[p].toFixed(2), chartL - 8, ty);
    }

    // X-axis time labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    var times = ['0h', '24h', '48h', '72h'];
    for (var ti = 0; ti < times.length; ti++) {
      var tx = chartL + (ti / (times.length - 1)) * chartW;
      ctx.beginPath();
      ctx.moveTo(tx, chartB);
      ctx.lineTo(tx, chartB + 4);
      ctx.stroke();
      ctx.fillText(times[ti], tx, chartB + 8);
    }

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TIME', chartL + chartW / 2, chartB + 22);

    ctx.save();
    ctx.translate(chartL - 28, chartT + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('PRICE', 0, 0);
    ctx.restore();

    // ══════════════════════════════════
    // VOLUME BARS
    // ══════════════════════════════════
    var barCount = volBars.length;
    var barW = (chartW / barCount) * 0.6;
    var barGap = chartW / barCount;
    var maxBarH = chartH * 0.18;

    for (var b = 0; b < barCount; b++) {
      var bx = chartL + b * barGap + barGap * 0.2;
      var bh = volBars[b] * maxBarH;
      var by = chartB - bh;

      var barDist = Math.abs((b / barCount) - tracerT);
      var barHighlight = barDist < 0.06 ? 0.03 : 0;

      ctx.fillStyle = 'rgba(255,255,255,' + (0.025 + barHighlight).toFixed(4) + ')';
      ctx.fillRect(bx, by, barW, bh);
    }

    // ══════════════════════════════════
    // THE CURVE
    // ══════════════════════════════════
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1.5;

    var steps = 200;
    for (var i = 0; i <= steps; i++) {
      var xNorm = i / steps;
      var px = chartL + xNorm * chartW;
      var py = chartB - curveY(xNorm) * chartH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(chartR, chartB);
    ctx.lineTo(chartL, chartB);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, chartT, 0, chartB);
    grad.addColorStop(0, 'rgba(255,255,255,0.02)');
    grad.addColorStop(1, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Dot at curve start
    var startY = chartB - curveY(0) * chartH;
    ctx.beginPath();
    ctx.arc(chartL, startY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();

    // Label on curve
    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.textAlign = 'left';
    ctx.fillText('LBP DECAY', chartL + 12, startY - 10);

    // ══════════════════════════════════
    // ANIMATED TRACER DOT
    // ══════════════════════════════════
    tracerT += tracerSpeed;
    if (tracerT > 1) {
      tracerT = 0;
      trail = [];
    }

    var dotX = chartL + tracerT * chartW;
    var dotY = chartB - curveY(tracerT) * chartH;

    // Trail
    trail.push({ x: dotX, y: dotY });
    if (trail.length > trailMax) trail.shift();

    for (var tr = 0; tr < trail.length; tr++) {
      var trAlpha = (tr / trail.length) * 0.06;
      var trSize = (tr / trail.length) * 1.5;
      ctx.beginPath();
      ctx.arc(trail[tr].x, trail[tr].y, trSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + trAlpha.toFixed(4) + ')';
      ctx.fill();
    }

    // Main dot
    ctx.beginPath();
    ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill();

    // Glow ring
    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Crosshair dashes to axes
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(dotX, dotY);
    ctx.lineTo(chartL, dotY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(dotX, dotY);
    ctx.lineTo(dotX, chartB);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live price at Y axis
    var curPrice = curveY(tracerT);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillText(curPrice.toFixed(3), chartL - 8, dotY);

    // ══════════════════════════════════
    // ETH/TKN PAIR LABEL
    // ══════════════════════════════════
    var lblX = chartR - 8;
    var lblY = chartT - 2;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';

    // Blinking status dot
    var blink = Math.sin(frame * 0.05) > 0;
    if (blink) {
      ctx.beginPath();
      ctx.arc(lblX + 4, lblY - 5, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
    }

    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillText('◆ ETH / TKN', lblX, lblY);

    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('FJORD LBP', lblX, lblY + 12);

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();