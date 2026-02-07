import { useState, useCallback } from 'react';

function calculateLegPnL(price, leg) {
  const dir = leg.direction === 'buy' ? 1 : -1;
  if (leg.type === 'stock') {
    return price - leg.strike;
  }
  if (leg.type === 'call') {
    const intrinsic = Math.max(0, price - leg.strike);
    return dir * (intrinsic - leg.premium);
  }
  // put
  const intrinsic = Math.max(0, leg.strike - price);
  return dir * (intrinsic - leg.premium);
}

function calculatePnL(price, legs) {
  return legs.reduce((sum, leg) => sum + calculateLegPnL(price, leg), 0);
}

export default function PayoffDiagram({ strategy }) {
  const [hoverPrice, setHoverPrice] = useState(null);

  const [rangeMin, rangeMax] = strategy.defaultRange;
  const steps = 200;
  const stepSize = (rangeMax - rangeMin) / steps;

  // Build points array
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const price = rangeMin + i * stepSize;
    points.push({ price, pnl: calculatePnL(price, strategy.legs) });
  }

  // SVG dimensions
  const svgW = 400;
  const svgH = 240;
  const padL = 48;
  const padR = 16;
  const padT = 20;
  const padB = 32;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const pnlValues = points.map(p => p.pnl);
  const minPnL = Math.min(...pnlValues);
  const maxPnL = Math.max(...pnlValues);
  const pnlPad = Math.max((maxPnL - minPnL) * 0.1, 0.5);
  const yMin = minPnL - pnlPad;
  const yMax = maxPnL + pnlPad;

  const toX = (price) => padL + ((price - rangeMin) / (rangeMax - rangeMin)) * chartW;
  const toY = (pnl) => padT + chartH - ((pnl - yMin) / (yMax - yMin)) * chartH;

  // Zero line Y position
  const zeroY = toY(0);
  const zeroVisible = yMin <= 0 && yMax >= 0;

  // Build polyline segments split at zero crossings for coloring
  const greenPoints = [];
  const redPoints = [];

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const x = toX(p.price);
    const y = toY(p.pnl);

    if (i > 0) {
      const prev = points[i - 1];
      // Check for zero crossing
      if ((prev.pnl >= 0 && p.pnl < 0) || (prev.pnl < 0 && p.pnl >= 0)) {
        // Interpolate crossing point
        const ratio = Math.abs(prev.pnl) / (Math.abs(prev.pnl) + Math.abs(p.pnl));
        const crossX = toX(prev.price + (p.price - prev.price) * ratio);
        const crossY = toY(0);
        greenPoints.push(`${crossX},${crossY}`);
        redPoints.push(`${crossX},${crossY}`);
      }
    }

    if (p.pnl >= 0) {
      greenPoints.push(`${x},${y}`);
    } else {
      redPoints.push(`${x},${y}`);
    }
  }

  // Y-axis tick labels
  const yTicks = [];
  const yTickCount = 5;
  for (let i = 0; i <= yTickCount; i++) {
    const val = yMin + (i / yTickCount) * (yMax - yMin);
    yTicks.push({ val, y: toY(val) });
  }

  // X-axis tick labels
  const xTicks = [];
  const xTickCount = 5;
  for (let i = 0; i <= xTickCount; i++) {
    const val = rangeMin + (i / xTickCount) * (rangeMax - rangeMin);
    xTicks.push({ val, x: toX(val) });
  }

  const handlePointerMove = useCallback((e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = clientX - rect.left;
    const svgX = (relX / rect.width) * svgW;
    // Ignore pointer in padding zones
    if (svgX < padL || svgX > svgW - padR) {
      setHoverPrice(null);
      return;
    }
    const price = rangeMin + ((svgX - padL) / chartW) * (rangeMax - rangeMin);
    const clamped = Math.max(rangeMin, Math.min(rangeMax, price));
    setHoverPrice(clamped);
  }, [rangeMin, rangeMax, chartW]);

  const handlePointerLeave = useCallback(() => setHoverPrice(null), []);

  const hoverPnL = hoverPrice !== null ? calculatePnL(hoverPrice, strategy.legs) : null;

  return (
    <div>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ width: '100%', height: 'auto', touchAction: 'none', userSelect: 'none' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchMove={handlePointerMove}
      >
        {/* Grid lines */}
        {yTicks.map((t, i) => (
          <line key={`yg${i}`} x1={padL} x2={svgW - padR} y1={t.y} y2={t.y} stroke="#374151" strokeWidth="0.5" />
        ))}

        {/* Zero line */}
        {zeroVisible && (
          <line x1={padL} x2={svgW - padR} y1={zeroY} y2={zeroY} stroke="#6b7280" strokeWidth="1" strokeDasharray="4,3" />
        )}

        {/* Profit curve - green */}
        {greenPoints.length > 1 && (
          <polyline points={greenPoints.join(' ')} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Loss curve - red */}
        {redPoints.length > 1 && (
          <polyline points={redPoints.join(' ')} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Y-axis labels */}
        {yTicks.map((t, i) => (
          <text key={`yl${i}`} x={padL - 6} y={t.y + 4} textAnchor="end" fill="#6b7280" fontSize="10">
            ${t.val.toFixed(0)}
          </text>
        ))}

        {/* X-axis labels */}
        {xTicks.map((t, i) => (
          <text key={`xl${i}`} x={t.x} y={svgH - 8} textAnchor="middle" fill="#6b7280" fontSize="10">
            ${t.val.toFixed(0)}
          </text>
        ))}

        {/* Axis labels */}
        <text x={padL + chartW / 2} y={svgH} textAnchor="middle" fill="#9ca3af" fontSize="9">Stock Price</text>
        <text x={12} y={padT + chartH / 2} textAnchor="middle" fill="#9ca3af" fontSize="9" transform={`rotate(-90, 12, ${padT + chartH / 2})`}>P&L</text>

        {/* Hover cursor */}
        {hoverPrice !== null && (
          <>
            <line x1={toX(hoverPrice)} x2={toX(hoverPrice)} y1={padT} y2={padT + chartH} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2" />
            <circle cx={toX(hoverPrice)} cy={toY(hoverPnL)} r="5" fill={hoverPnL >= 0 ? '#22c55e' : '#ef4444'} stroke="#fff" strokeWidth="1.5" />
          </>
        )}
      </svg>

      {/* Hover readout */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '24px', padding: '8px 0',
        minHeight: '28px', color: '#9ca3af', fontSize: '13px',
      }}>
        {hoverPrice !== null ? (
          <>
            <span>Stock: <b style={{ color: '#fff' }}>${hoverPrice.toFixed(2)}</b></span>
            <span>P&L: <b style={{ color: hoverPnL >= 0 ? '#22c55e' : '#ef4444' }}>{hoverPnL >= 0 ? '+' : ''}${hoverPnL.toFixed(2)}</b></span>
          </>
        ) : (
          <span style={{ color: '#6b7280' }}>Drag across chart to see P&L</span>
        )}
      </div>
    </div>
  );
}
