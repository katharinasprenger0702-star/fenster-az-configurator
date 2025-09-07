'use client';

import { useState, useMemo } from 'react';
import pricesDataJson from "@/preise_kompakt.json";

type PriceData = Record<string, number[][]>;

const pricesData: PriceData = pricesDataJson;

export default function PreislistePage() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'width' | 'height'>('price');

  // Get all products
  const products = Object.keys(pricesData);

  // Filter and process data
  const filteredData = useMemo(() => {
    let data = selectedProduct ? [selectedProduct] : products;
    
    if (searchTerm) {
      data = data.filter(product => 
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const result: Array<{
      product: string;
      width: number;
      height: number;
      price: number;
    }> = [];

    data.forEach(product => {
      const prices = pricesData[product];
      prices.forEach(([width, height, price]) => {
        // Apply filters
        if (minWidth && width < parseInt(minWidth)) return;
        if (maxWidth && width > parseInt(maxWidth)) return;
        if (minHeight && height < parseInt(minHeight)) return;
        if (maxHeight && height > parseInt(maxHeight)) return;

        result.push({ product, width, height, price });
      });
    });

    // Sort data
    result.sort((a, b) => {
      switch (sortBy) {
        case 'width':
          return a.width - b.width;
        case 'height':
          return a.height - b.height;
        case 'price':
        default:
          return a.price - b.price;
      }
    });

    return result;
  }, [selectedProduct, searchTerm, minWidth, maxWidth, minHeight, maxHeight, sortBy]);

  return (
    <div className="grid" style={{ gap: 24 }}>
      {/* Header */}
      <section className="card" style={{ padding: 32 }}>
        <h1>Preisliste durchsuchen</h1>
        <p>Durchsuchen Sie unsere komplette Preisliste für Fenster und Türen nach Maßen und Produkttypen.</p>
      </section>

      {/* Search and Filter */}
      <section className="card">
        <h2>Filter und Suche</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
          <div>
            <label htmlFor="search" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Produktsuche
            </label>
            <input
              id="search"
              type="text"
              placeholder="Produktname eingeben..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
          </div>

          <div>
            <label htmlFor="product" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Produkttyp
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            >
              <option value="">Alle Produkte</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Breite (mm)
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={minWidth}
                onChange={(e) => setMinWidth(e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Höhe (mm)
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={minHeight}
                onChange={(e) => setMinHeight(e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxHeight}
                onChange={(e) => setMaxHeight(e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sort" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Sortierung
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'width' | 'height')}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            >
              <option value="price">Nach Preis</option>
              <option value="width">Nach Breite</option>
              <option value="height">Nach Höhe</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedProduct('');
            setMinWidth('');
            setMaxWidth('');
            setMinHeight('');
            setMaxHeight('');
          }}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f5f5f5', 
            border: '1px solid #ccc', 
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Filter zurücksetzen
        </button>
      </section>

      {/* Results */}
      <section className="card">
        <h2>Preisergebnisse ({filteredData.length} Treffer)</h2>
        
        {filteredData.length === 0 ? (
          <p>Keine Preise gefunden. Versuchen Sie andere Filter.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Produkt</th>
                  <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>Breite (mm)</th>
                  <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>Höhe (mm)</th>
                  <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>Preis netto (€)</th>
                  <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>Preis brutto (€)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 1000).map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8, border: '1px solid #ddd' }}>
                      {item.product.replace('IGLO 5 - ', '')}
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>
                      {item.width.toLocaleString()}
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>
                      {item.height.toLocaleString()}
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>
                      {item.price.toFixed(2)}
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'right' }}>
                      {(item.price * 1.19).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length > 1000 && (
              <p style={{ marginTop: 16, fontStyle: 'italic' }}>
                Nur die ersten 1000 Ergebnisse werden angezeigt. Verwenden Sie Filter für genauere Ergebnisse.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}