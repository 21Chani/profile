/* ═══════════════════════════════════════════════
   KAYEN — SWAP ROUTE DIAGRAM BACKGROUND
   ═══════════════════════════════════════════════

   3 parts below:
   1. CSS
   2. HTML (place inside your Kayen section)
   3. JS  (place in a <script> or import as module)

   Requirements:
   - Parent section needs: position: relative; overflow: hidden;
   - Font: JetBrains Mono (used for labels)
*/


/* ─────────────────────────────────────────────
   1. CSS
   ───────────────────────────────────────────── */

// .kayen-bg {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   z-index: 0;
//   overflow: hidden;
// }

// .kayen-bg canvas {
//   position: absolute;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   pointer-events: none;
//   mask-image:
//     linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
//   -webkit-mask-image:
//     linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
// }


/* ─────────────────────────────────────────────
   2. HTML — place inside your section element

   <section class="your-kayen-section" style="position:relative;overflow:hidden;">
     <div class="kayen-bg">
       <canvas id="kayenRoute"></canvas>
     </div>
     <!-- ...your content here... -->
   </section>

   ───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   3. JAVASCRIPT — below
   ───────────────────────────────────────────── */

// ─── Kayen Swap Route Diagram ───
(function() {
  var canvas = document.getElementById('kayenRoute');
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

  // Route graph — nodes and connections
  // Positions defined as fractions of w/h
  var nodes = [
    // Source token (left)
    { id: 'CHZ',    xf: 0.08, yf: 0.45, label: 'CHZ',    r: 18, type: 'source' },
    // Pool layer 1
    { id: 'POOL_A', xf: 0.28, yf: 0.25, label: 'POOL A', r: 12, type: 'pool' },
    { id: 'POOL_B', xf: 0.28, yf: 0.50, label: 'POOL B', r: 12, type: 'pool' },
    { id: 'POOL_C', xf: 0.28, yf: 0.75, label: 'POOL C', r: 12, type: 'pool' },
    // Intermediate tokens
    { id: 'PEPPER', xf: 0.48, yf: 0.30, label: 'PEPPER', r: 14, type: 'token' },
    { id: 'FAN',    xf: 0.48, yf: 0.65, label: 'FAN',    r: 14, type: 'token' },
    // Pool layer 2
    { id: 'POOL_D', xf: 0.68, yf: 0.35, label: 'POOL D', r: 12, type: 'pool' },
    { id: 'POOL_E', xf: 0.68, yf: 0.55, label: 'POOL E', r: 12, type: 'pool' },
    // Destination (right)
    { id: 'USDT',   xf: 0.90, yf: 0.45, label: 'USDT',   r: 18, type: 'dest' },
  ];

  // Edges: [from_index, to_index, weight (0-1 for line brightness)]
  var edges = [
    // CHZ → pools
    [0, 1, 0.6],
    [0, 2, 1.0],  // best route
    [0, 3, 0.4],
    // Pools → intermediate tokens
    [1, 4, 0.6],
    [2, 4, 0.8],
    [2, 5, 0.7],
    [3, 5, 0.4],
    // Intermediate → pools layer 2
    [4, 6, 0.9],
    [4, 7, 0.3],
    [5, 7, 0.6],
    // Pools → USDT
    [6, 8, 0.9],
    [7, 8, 0.5],
  ];

  // Best route path for the tracer: CHZ → POOL_B → PEPPER → POOL_D → USDT
  var bestRoute = [0, 2, 4, 6, 8];

  // Tracer state
  var tracerProgress = 0;
  var tracerSpeed = 0.003;
  var tracerSegment = 0;

  // Token pair ticker data
  var tickerPairs = [
    'CHZ/USDT 0.0871 ▲', 'PEPPER/CHZ 0.0012 ▼', 'FAN/USDT 0.342 ▲',
    'BAR/CHZ 4.21 ▲', 'JUV/USDT 1.87 ▼', 'PSG/CHZ 6.04 ▲',
    'ACM/USDT 2.14 ▼', 'ATM/CHZ 3.76 ▲', 'GAL/USDT 1.52 ▲',
    'CHZ/USDT 0.0871 ▲', 'PEPPER/CHZ 0.0012 ▼', 'FAN/USDT 0.342 ▲',
  ];
  var tickerText = tickerPairs.join('   │   ');
  var tickerOffset = 0;

  // Block hash data
  var blockHashes = [];
  var hexChars = '0123456789abcdef';
  for (var bh = 0; bh < 20; bh++) {
    var hash = '0x';
    for (var hc = 0; hc < 8; hc++) hash += hexChars[Math.floor(Math.sin(bh * 13.7 + hc * 3.1) * 8 + 8)];
    blockHashes.push('#' + (48200000 + bh * 137) + ' ' + hash);
  }
  var blockText = blockHashes.join('    ');
  var blockOffset = 0;

  var frame = 0;

  function getNodePos(n) {
    return { x: n.xf * w, y: n.yf * h };
  }

  function draw() {
    frame++;
    ctx.clearRect(0, 0, w, h);

    // ══════════════════════════════════
    // EDGES
    // ══════════════════════════════════
    for (var e = 0; e < edges.length; e++) {
      var fromNode = nodes[edges[e][0]];
      var toNode = nodes[edges[e][1]];
      var weight = edges[e][2];
      var from = getNodePos(fromNode);
      var to = getNodePos(toNode);

      var alpha = 0.02 + weight * 0.03;

      // Draw path with a slight curve
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,' + alpha.toFixed(4) + ')';
      ctx.lineWidth = 1;

      var cpX = (from.x + to.x) / 2;
      var cpY = (from.y + to.y) / 2 - (to.x - from.x) * 0.05;
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);
      ctx.stroke();

      // Small arrow at midpoint
      var midT = 0.55;
      var mx = (1-midT)*(1-midT)*from.x + 2*(1-midT)*midT*cpX + midT*midT*to.x;
      var my = (1-midT)*(1-midT)*from.y + 2*(1-midT)*midT*cpY + midT*midT*to.y;
      var dx = to.x - from.x;
      var dy = to.y - from.y;
      var angle = Math.atan2(dy, dx);

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.8).toFixed(4) + ')';
      ctx.moveTo(mx + Math.cos(angle) * 4, my + Math.sin(angle) * 4);
      ctx.lineTo(mx + Math.cos(angle + 2.5) * 3, my + Math.sin(angle + 2.5) * 3);
      ctx.lineTo(mx + Math.cos(angle - 2.5) * 3, my + Math.sin(angle - 2.5) * 3);
      ctx.closePath();
      ctx.fill();
    }

    // ══════════════════════════════════
    // NODES
    // ══════════════════════════════════
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var pos = getNodePos(node);

      if (node.type === 'source' || node.type === 'dest') {
        // Token endpoints — circle with label
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.015)';
        ctx.fill();

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.07)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, pos.x, pos.y);

      } else if (node.type === 'token') {
        // Intermediate tokens — smaller circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.01)';
        ctx.fill();

        ctx.font = '7px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.055)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, pos.x, pos.y);

      } else {
        // Pool nodes — small diamond
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-node.r * 0.6, -node.r * 0.6, node.r * 1.2, node.r * 1.2);
        ctx.fillStyle = 'rgba(255,255,255,0.008)';
        ctx.fillRect(-node.r * 0.6, -node.r * 0.6, node.r * 1.2, node.r * 1.2);
        ctx.restore();

        ctx.font = '6px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.035)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, pos.x, pos.y + node.r + 4);
      }
    }

    // ══════════════════════════════════
    // ANIMATED TRACER — best route
    // ══════════════════════════════════
    tracerProgress += tracerSpeed;

    var totalSegments = bestRoute.length - 1;
    var fullProgress = tracerProgress % 1;
    var segFloat = fullProgress * totalSegments;
    var seg = Math.floor(segFloat);
    var segT = segFloat - seg;

    if (seg < totalSegments) {
      var fromN = nodes[bestRoute[seg]];
      var toN = nodes[bestRoute[seg + 1]];
      var fp = getNodePos(fromN);
      var tp = getNodePos(toN);

      var cpX2 = (fp.x + tp.x) / 2;
      var cpY2 = (fp.y + tp.y) / 2 - (tp.x - fp.x) * 0.05;

      var tX = (1-segT)*(1-segT)*fp.x + 2*(1-segT)*segT*cpX2 + segT*segT*tp.x;
      var tY = (1-segT)*(1-segT)*fp.y + 2*(1-segT)*segT*cpY2 + segT*segT*tp.y;

      // Glow
      ctx.beginPath();
      ctx.arc(tX, tY, 8, 0, Math.PI * 2);
      var glow = ctx.createRadialGradient(tX, tY, 0, tX, tY, 8);
      glow.addColorStop(0, 'rgba(255,255,255,0.06)');
      glow.addColorStop(1, 'rgba(255,255,255,0.0)');
      ctx.fillStyle = glow;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(tX, tY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.fill();
    }

    // ══════════════════════════════════
    // TOKEN PAIR TICKER (top)
    // ══════════════════════════════════
    tickerOffset -= 0.3;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, h * 0.08);
    ctx.clip();

    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    var tickerY = h * 0.04;
    var tickerW = ctx.measureText(tickerText).width;
    var tx1 = tickerOffset % (tickerW + 100);
    ctx.fillText(tickerText, tx1, tickerY);
    ctx.fillText(tickerText, tx1 + tickerW + 100, tickerY);

    // Thin separator line
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.05, h * 0.075);
    ctx.lineTo(w * 0.95, h * 0.075);
    ctx.stroke();

    ctx.restore();

    // ══════════════════════════════════
    // BLOCK HASHES (bottom)
    // ══════════════════════════════════
    blockOffset -= 0.2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, h * 0.93, w, h * 0.07);
    ctx.clip();

    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    var blockY = h * 0.965;
    var blockW = ctx.measureText(blockText).width;
    var bx1 = blockOffset % (blockW + 80);
    ctx.fillText(blockText, bx1, blockY);
    ctx.fillText(blockText, bx1 + blockW + 80, blockY);

    // Thin separator line
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.05, h * 0.93);
    ctx.lineTo(w * 0.95, h * 0.93);
    ctx.stroke();

    ctx.restore();

    // ══════════════════════════════════
    // LABELS
    // ══════════════════════════════════
    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('ROUTE: CHZ → POOL B → PEPPER → POOL D → USDT', w * 0.08, h * 0.10);

    ctx.textAlign = 'right';
    ctx.fillText('HOPS: 4  ·  BEST PRICE', w * 0.92, h * 0.10);

    // Aggregator label
    var blink = Math.sin(frame * 0.04) > 0;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillText('KAYEN AGGREGATOR', w * 0.08, h * 0.90);

    if (blink) {
      ctx.beginPath();
      ctx.arc(w * 0.08 - 6, h * 0.90 - 4, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillText('CHILIZ CHAIN', w * 0.92, h * 0.90);

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();