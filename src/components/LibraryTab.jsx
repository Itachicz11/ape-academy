import { useState } from 'react';
import { greekCards, strategyCards, glossaryTerms, commonMistakes } from '../data/library';
import strategies from '../data/payoffs';
import PayoffDiagram from './PayoffDiagram';

const subTabs = [
  { id: 'payoffs', label: 'Payoffs' },
  { id: 'greeks', label: 'Greeks' },
  { id: 'strategies', label: 'Strategies' },
  { id: 'mistakes', label: 'Mistakes' },
  { id: 'glossary', label: 'Glossary' },
];

export default function LibraryTab() {
  const [activeSubTab, setActiveSubTab] = useState('payoffs');
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0].id);
  const [expandedTerm, setExpandedTerm] = useState(null);

  const strategy = strategies.find(s => s.id === selectedStrategy);

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px' }}>Strategy Library</h1>

      {/* Sub-tab pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              background: activeSubTab === tab.id ? '#22c55e' : '#1f2937',
              color: activeSubTab === tab.id ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: '20px', padding: '8px 16px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Payoffs sub-tab */}
      {activeSubTab === 'payoffs' && (
        <div>
          <select
            value={selectedStrategy}
            onChange={(e) => setSelectedStrategy(e.target.value)}
            style={{
              width: '100%', background: '#1f2937', color: '#fff', border: '1px solid #374151',
              borderRadius: '10px', padding: '12px', fontSize: '14px', marginBottom: '16px',
              appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
            }}
          >
            {strategies.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <div style={{ background: '#1f2937', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <PayoffDiagram strategy={strategy} />
          </div>

          <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
            {strategy.description}
          </p>
        </div>
      )}

      {/* Greeks sub-tab */}
      {activeSubTab === 'greeks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {greekCards.map(greek => (
            <div key={greek.name} style={{ background: '#1f2937', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px', color: '#22c55e', fontWeight: '700', fontFamily: 'serif', width: '36px', textAlign: 'center' }}>
                  {greek.symbol}
                </span>
                <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: '600', margin: 0 }}>{greek.name}</h3>
              </div>
              <p style={{ color: '#d1d5db', fontSize: '14px', margin: '0 0 10px 0', lineHeight: '1.5' }}>{greek.definition}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ background: '#111827', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#6b7280', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Range</span>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: '2px 0 0 0' }}>{greek.range}</p>
                </div>
                <div style={{ background: '#111827', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '600' }}>BUYERS</span>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: '2px 0 0 0' }}>{greek.buyerEffect}</p>
                </div>
                <div style={{ background: '#111827', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: '600' }}>SELLERS</span>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: '2px 0 0 0' }}>{greek.sellerEffect}</p>
                </div>
              </div>
              <p style={{ color: '#fbbf24', fontSize: '12px', margin: '10px 0 0 0', fontStyle: 'italic' }}>{greek.mnemonic}</p>
            </div>
          ))}
        </div>
      )}

      {/* Strategies sub-tab */}
      {activeSubTab === 'strategies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {strategyCards.map(strat => (
            <div key={strat.name} style={{ background: '#1f2937', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '0 0 10px 0' }}>{strat.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['Legs', strat.legs],
                  ['Max Profit', strat.maxProfit],
                  ['Max Loss', strat.maxLoss],
                  ['Breakeven', strat.breakeven],
                  ['Best When', strat.bestWhen],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', minWidth: '76px', flexShrink: 0 }}>{label}</span>
                    <span style={{ color: '#d1d5db', fontSize: '13px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mistakes sub-tab */}
      {activeSubTab === 'mistakes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {commonMistakes.map((mistake, i) => (
            <div key={i} style={{ background: '#1f2937', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#ef4444', fontSize: '16px' }}>{'\u26A0'}</span>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0 }}>{mistake.title}</h3>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 10px 0', lineHeight: '1.5' }}>{mistake.description}</p>
              <div style={{ background: '#065f46', borderRadius: '8px', padding: '8px 12px' }}>
                <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '600' }}>FIX</span>
                <p style={{ color: '#a7f3d0', fontSize: '13px', margin: '2px 0 0 0', lineHeight: '1.4' }}>{mistake.fix}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Glossary sub-tab */}
      {activeSubTab === 'glossary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {glossaryTerms.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setExpandedTerm(expandedTerm === i ? null : i)}
                style={{
                  width: '100%', background: '#1f2937', border: 'none', borderRadius: expandedTerm === i ? '12px 12px 0 0' : '12px',
                  padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{item.term}</span>
                <span style={{ color: '#6b7280', fontSize: '16px', transform: expandedTerm === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>{'\u203A'}</span>
              </button>
              {expandedTerm === i && (
                <div style={{ background: '#1a2332', borderRadius: '0 0 12px 12px', padding: '12px 16px' }}>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{item.definition}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
