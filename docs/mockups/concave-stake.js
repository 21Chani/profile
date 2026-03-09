/* ═══════════════════════════════════════════════
   CONCAVE — STAKING LOCK-UP VAULTS BACKGROUND
   ═══════════════════════════════════════════════

   3 parts below:
   1. CSS
   2. HTML (place inside your Concave section)
   3. JS  (place in a <script> or import as module)

   Requirements:
   - Parent section needs: position: relative; overflow: hidden;
   - Font: JetBrains Mono (used for labels and stats)
*/


/* ─────────────────────────────────────────────
   1. CSS
   ───────────────────────────────────────────── */

// .concave-bg {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   z-index: 0;
//   overflow: hidden;
// }

// .concave-bg canvas {
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

   <section class="your-concave-section" style="position:relative;overflow:hidden;">
     <div class="concave-bg">
       <canvas id="concaveState"></canvas>
     </div>
     <!-- ...your content here... -->
   </section>

   ───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   3. JAVASCRIPT — below
   ───────────────────────────────────────────── */

// ─── Concave Staking Lock-up Vaults ───
(function() {
  var canvas = document.getElementById('concaveState');
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

  // Vault positions and configs — scattered across section
  var vaults = [
    { xf: 0.12, yf: 0.28, lockDays: 90,  elapsed: 0.72, amount: '12.4K', label: '90D VAULT',  tier: 'gold' },
    { xf: 0.38, yf: 0.20, lockDays: 30,  elapsed: 0.45, amount: '3.2K',  label: '30D VAULT',  tier: 'silver' },
    { xf: 0.65, yf: 0.32, lockDays: 60,  elapsed: 0.88, amount: '8.7K',  label: '60D VAULT',  tier: 'gold' },
    { xf: 0.88, yf: 0.22, lockDays: 180, elapsed: 0.31, amount: '45.1K', label: '180D VAULT', tier: 'diamond' },
    { xf: 0.22, yf: 0.62, lockDays: 60,  elapsed: 0.95, amount: '5.6K',  label: '60D VAULT',  tier: 'silver' },
    { xf: 0.52, yf: 0.70, lockDays: 30,  elapsed: 0.12, amount: '1.8K',  label: '30D VAULT',  tier: 'silver' },
    { xf: 0.78, yf: 0.65, lockDays: 90,  elapsed: 0.56, amount: '22.0K', label: '90D VAULT',  tier: 'gold' },
    { xf: 0.08, yf: 0.78, lockDays: 180, elapsed: 0.08, amount: '67.3K', label: '180D VAULT', tier: 'diamond' },
    { xf: 0.92, yf: 0.80, lockDays: 30,  elapsed: 0.67, amount: '2.1K',  label: '30D VAULT',  tier: 'silver' },
  ];

  var tierAlpha = { silver: 0.035, gold: 0.045, diamond: 0.06 };
  var barWidth = 48;
  var barHeight = 4;

  var frame = 0;

  function drawLock(x, y, alpha) {
    var s = 6;
    // Shackle (arc)
    ctx.beginPath();
    ctx.arc(x, y - s * 0.6, s * 0.5, Math.PI, 0, false);
    ctx.strokeStyle = 'rgba(255,255,255,' + alpha.toFixed(4) + ')';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Body (rect)
    ctx.strokeRect(x - s * 0.6, y - s * 0.1, s * 1.2, s * 0.9);
    // Keyhole (dot)
    ctx.beginPath();
    ctx.arc(x, y + s * 0.2, 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.8).toFixed(4) + ')';
    ctx.fill();
  }

  function draw() {
    frame++;
    ctx.clearRect(0, 0, w, h);

    // Progress speed — very slow fill
    var progressPerFrame = 0.000008;

    // Central pool node position
    var poolX = w * 0.50;
    var poolY = h * 0.47;

    // ══════════════════════════════════
    // CONNECTING LINES — vaults to central pool
    // ══════════════════════════════════
    ctx.setLineDash([3, 5]);
    for (var c = 0; c < vaults.length; c++) {
      var cv = vaults[c];
      var cx = cv.xf * w;
      var cy = cv.yf * h;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.018)';
      ctx.lineWidth = 1;
      ctx.moveTo(cx, cy + 10);
      ctx.lineTo(poolX, poolY);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // ── Central pool node ──
    ctx.beginPath();
    ctx.arc(poolX, poolY, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.01)';
    ctx.fill();

    ctx.font = '6px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('POOL', poolX, poolY);

    // ══════════════════════════════════
    // VAULTS
    // ══════════════════════════════════
    for (var i = 0; i < vaults.length; i++) {
      var v = vaults[i];
      var x = v.xf * w;
      var y = v.yf * h;
      var alpha = tierAlpha[v.tier];

      // Slowly advance elapsed
      v.elapsed += progressPerFrame;
      if (v.elapsed >= 1) v.elapsed = 0;

      // Pulse on near-completion (>90%)
      var pulse = 0;
      if (v.elapsed > 0.9) {
        pulse = Math.sin(frame * 0.08) * 0.02;
      }
      var activeAlpha = alpha + pulse;

      // Remaining time
      var remaining = v.lockDays * (1 - v.elapsed);
      var days = Math.floor(remaining);
      var hours = Math.floor((remaining - days) * 24);

      // ── Border box ──
      var boxW = 72;
      var boxH = 58;
      var boxX = x - boxW / 2;
      var boxY = y - 22;

      ctx.strokeStyle = 'rgba(255,255,255,' + (activeAlpha * 0.5).toFixed(4) + ')';
      ctx.lineWidth = 1;
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      // Small corner ticks on box
      var tk = 6;
      ctx.strokeStyle = 'rgba(255,255,255,' + (activeAlpha * 0.7).toFixed(4) + ')';
      // TL
      ctx.beginPath(); ctx.moveTo(boxX, boxY + tk); ctx.lineTo(boxX, boxY); ctx.lineTo(boxX + tk, boxY); ctx.stroke();
      // TR
      ctx.beginPath(); ctx.moveTo(boxX + boxW - tk, boxY); ctx.lineTo(boxX + boxW, boxY); ctx.lineTo(boxX + boxW, boxY + tk); ctx.stroke();
      // BL
      ctx.beginPath(); ctx.moveTo(boxX, boxY + boxH - tk); ctx.lineTo(boxX, boxY + boxH); ctx.lineTo(boxX + tk, boxY + boxH); ctx.stroke();
      // BR
      ctx.beginPath(); ctx.moveTo(boxX + boxW - tk, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH - tk); ctx.stroke();

      // ── Lock icon (with pulse glow) ──
      if (v.elapsed > 0.9) {
        var glowAlpha = (0.03 + pulse).toFixed(4);
        ctx.beginPath();
        ctx.arc(x, y - 16, 10, 0, Math.PI * 2);
        var glow = ctx.createRadialGradient(x, y - 16, 0, x, y - 16, 10);
        glow.addColorStop(0, 'rgba(255,255,255,' + glowAlpha + ')');
        glow.addColorStop(1, 'rgba(255,255,255,0.0)');
        ctx.fillStyle = glow;
        ctx.fill();
      }
      drawLock(x, y - 16, activeAlpha * 1.2);

      // ── Vault label ──
      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(255,255,255,' + activeAlpha.toFixed(4) + ')';
      ctx.fillText(v.label, x, y + 2);

      // ── Amount staked ──
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,' + (activeAlpha * 1.3).toFixed(4) + ')';
      ctx.fillText(v.amount + ' CNV', x, y + 14);

      // ── Progress bar ──
      var bx = x - barWidth / 2;
      var by = y + 27;

      // Background
      ctx.strokeStyle = 'rgba(255,255,255,' + (activeAlpha * 0.6).toFixed(4) + ')';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, barWidth, barHeight);

      // Fill
      var fillW = barWidth * v.elapsed;
      ctx.fillStyle = 'rgba(255,255,255,' + (activeAlpha * 0.8).toFixed(4) + ')';
      ctx.fillRect(bx, by, fillW, barHeight);
    }

    // ══════════════════════════════════
    // TOP — Protocol stats
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

    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillText('STAKING VAULTS', w * 0.05, topY);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillText('│', w * 0.22, topY);

    var tvl = (4.2 + Math.sin(frame * 0.005) * 0.15).toFixed(1);
    ctx.fillText('TVL: $' + tvl + 'M', w * 0.24, topY);

    ctx.fillText('│', w * 0.40, topY);

    var apy = (142.8 + Math.sin(frame * 0.008) * 3.2).toFixed(1);
    ctx.fillText('APY: ' + apy + '%', w * 0.42, topY);

    var blink = Math.sin(frame * 0.04) > 0;
    ctx.textAlign = 'right';
    if (blink) {
      ctx.beginPath();
      ctx.arc(w * 0.95 + 6, topY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('● ACTIVE', w * 0.95, topY);

    // ══════════════════════════════════
    // BOTTOM — Epoch info
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

    ctx.fillText('epoch: 847', w * 0.05, botY);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillText('│', w * 0.18, botY);

    var secs = Math.floor((3600 - (frame * 0.1) % 3600));
    var mm = Math.floor((secs % 3600) / 60);
    var ss = secs % 60;
    ctx.fillText('next rebase: ' + mm + 'm ' + (ss < 10 ? '0' : '') + ss + 's', w * 0.20, botY);

    ctx.fillText('│', w * 0.42, botY);
    ctx.fillText('active locks: 9', w * 0.44, botY);

    ctx.fillText('│', w * 0.60, botY);
    ctx.fillText('total staked: 168.2K CNV', w * 0.62, botY);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('CONCAVE  ·  DeFi', w * 0.95, botY);

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();