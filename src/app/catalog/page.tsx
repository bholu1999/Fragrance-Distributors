'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  Search,
  Download,
  X,
  ArrowUpDown,
  Maximize2,
  Database,
  Coins,
  Package,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

// Import JSON catalog files directly
import clarinsData from '../../data/Clarins (Skincare GiftSets).json';
import isseyData from '../../data/Issey Miyake Narciso Rodriguez Zadig Voltaire.json';
import mixedData from '../../data/Mixed Selection.json';

// Types for spreadsheet records
interface CatalogRecord {
  EAN: number | string;
  BRAND: string;
  STATUS: string;
  DESCRIPTION: string;
  'READY QTYS': number;
  'PRICE EUR': number;
  'PRICE USD': number;
  'PRICE GBP': string | number;
}

// Define spreadsheets metadata
const sheetsMetadata = [
  {
    id: 'clarins',
    fileName: 'Clarins (Skincare GiftSets).json',
    title: 'Clarins Skincare & Gift Sets',
    description: 'Premium collection of facial care, anti-aging serums, body oils, and exclusive gift sets from Clarins.',
    tag: 'Skincare',
    colorClass: 'emerald',
    raw: clarinsData as CatalogRecord[],
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-500/20',
    accentGradient: 'from-emerald-500/20 to-teal-500/10',
    btnColor: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
  },
  {
    id: 'issey_miyake',
    fileName: 'Issey Miyake Narciso Rodriguez Zadig Voltaire.json',
    title: 'Issey Miyake & Narciso Rodriguez',
    description: 'High-end French and Japanese designer fragrance lines, featuring Le Sel, All Of Me, and Burning Love collections.',
    tag: 'Designer Fragrances',
    colorClass: 'indigo',
    raw: isseyData as CatalogRecord[],
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
    borderColor: 'border-indigo-500/20',
    accentGradient: 'from-indigo-500/20 to-blue-500/10',
    btnColor: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
  },
  {
    id: 'mixed_selection',
    fileName: 'Mixed Selection.json',
    title: 'Mixed Brand Luxury Selection',
    description: 'A comprehensive high-volume assortment of luxury SKUs across Coach, Elie Saab, Jimmy Choo, Karl Lagerfeld, Rochas, Sensai, and Shiseido.',
    tag: 'Mixed Brands',
    colorClass: 'amber',
    raw: mixedData as CatalogRecord[],
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-500/20',
    accentGradient: 'from-amber-500/20 to-yellow-500/10',
    btnColor: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
  }
];

export default function Catalog() {
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof CatalogRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Spreadsheet cell state
  const [selectedCell, setSelectedCell] = useState<{ row: number; colName: string; value: string } | null>(null);

  // Pagination limit to avoid sluggish DOM renders for huge arrays
  const [visibleRowsCount, setVisibleRowsCount] = useState(50);

  // Find currently active sheet configuration
  const activeSheet = useMemo(() => {
    return sheetsMetadata.find((s) => s.id === activeSheetId) || sheetsMetadata[0];
  }, [activeSheetId]);

  // Handle opening the spreadsheet modal
  const openSpreadsheet = (id: string) => {
    setActiveSheetId(id);
    setSearchQuery('');
    setSortField(null);
    setSelectedCell(null);
    setVisibleRowsCount(50);
    setModalOpen(true);
  };

  // Switch tabs inside the modal
  const switchSheetInModal = (id: string) => {
    setActiveSheetId(id);
    setSearchQuery('');
    setSortField(null);
    setSelectedCell(null);
    setVisibleRowsCount(50);
  };

  // Calculate dynamic stats for the active dataset
  const activeStats = useMemo(() => {
    if (!activeSheet) return { totalSkus: 0, totalStock: 0, avgPriceEur: 0, distinctBrands: 0 };
    const items = activeSheet.raw;
    const totalSkus = items.length;
    const totalStock = items.reduce((sum, item) => sum + (item['READY QTYS'] || 0), 0);
    const avgPriceEur = totalSkus > 0 ? items.reduce((sum, item) => sum + (item['PRICE EUR'] || 0), 0) / totalSkus : 0;
    const distinctBrands = new Set(items.map((item) => item.BRAND)).size;
    return { totalSkus, totalStock, avgPriceEur, distinctBrands };
  }, [activeSheet]);

  // Sorting and Filtering logic
  const filteredAndSortedRecords = useMemo(() => {
    if (!activeSheet) return [];

    // 1. Filter
    let records = activeSheet.raw.filter((row) => {
      const eanStr = String(row.EAN || '').toLowerCase();
      const brandStr = String(row.BRAND || '').toLowerCase();
      const descStr = String(row.DESCRIPTION || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return eanStr.includes(query) || brandStr.includes(query) || descStr.includes(query);
    });

    // 2. Sort
    if (sortField) {
      records = [...records].sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        // Convert values to comparable formats
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        if (typeof valA === 'string') valA = parseFloat(valA.replace(/[^0-9.]/g, '')) || 0;
        if (typeof valB === 'string') valB = parseFloat(valB.replace(/[^0-9.]/g, '')) || 0;

        return sortDirection === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
    }

    return records;
  }, [activeSheet, searchQuery, sortField, sortDirection]);

  // Handle column sorting toggle
  const requestSort = (field: keyof CatalogRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortField(field);
    setSortDirection(direction);
  };

  // Cell click handler
  const handleCellClick = (rowIdx: number, colName: string, value: any) => {
    setSelectedCell({ row: rowIdx + 1, colName, value: String(value) });
  };

  // Real CSV File Export Trigger
  const exportToCSV = () => {
    if (!activeSheet) return;
    const data = activeSheet.raw;
    const headers = ['EAN', 'BRAND', 'STATUS', 'DESCRIPTION', 'READY QTYS', 'PRICE EUR', 'PRICE USD', 'PRICE GBP'];
    const csvRows = [
      headers.join(','), // Header row
      ...data.map((row) =>
        [
          row.EAN,
          `"${row.BRAND.replace(/"/g, '""')}"`,
          `"${row.STATUS.replace(/"/g, '""')}"`,
          `"${row.DESCRIPTION.replace(/"/g, '""')}"`,
          row['READY QTYS'],
          row['PRICE EUR'],
          row['PRICE USD'],
          typeof row['PRICE GBP'] === 'string' ? `"${row['PRICE GBP'].replace(/"/g, '""')}"` : row['PRICE GBP']
        ].join(',')
      )
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', activeSheet.fileName.replace('.json', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-6"
          >
            <Sparkles size={12} className="animate-pulse" />
            Interactive Datasets
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-dark mb-4">
            Digital Wholesale Portfolios
          </h1>
          <p className="text-slate-600 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Click on any catalog below to open our live spreadsheet emulator, search stock, sort pricing metrics, and export inventory directly to CSV.
          </p>
        </div>

        {/* 3 Excel Skeleton Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {sheetsMetadata.map((sheet, index) => {
            const rowCount = sheet.raw.length;
            const sizeEstimate = `${(JSON.stringify(sheet.raw).length / 1024).toFixed(1)} KB`;
            const mainBrands = Array.from(new Set(sheet.raw.slice(0, 8).map((p) => p.BRAND))).join(', ');

            return (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className={`group relative bg-white border ${sheet.borderColor} rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden flex flex-col`}
              >
                {/* Visual Accent Bar */}
                <div className={`h-2 bg-gradient-to-r ${sheet.accentGradient} border-b ${sheet.borderColor}`} />

                <div className="p-8 flex-grow flex flex-col">
                  {/* File Info Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl ${sheet.iconBg} ${sheet.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                      <FileSpreadsheet size={28} />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {sheet.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-emerald-600 transition-colors">
                    {sheet.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 flex-grow">
                    {sheet.description}
                  </p>

                  {/* Excel Spreadsheet Skeleton Section */}
                  <div className="relative mb-6 rounded-lg border border-slate-200 bg-slate-50/50 p-2 overflow-hidden select-none">
                    <div className="flex text-[9px] font-mono text-slate-400 border-b border-slate-200 pb-1.5 mb-1.5">
                      <div className="w-1/12 text-center border-r border-slate-200">#</div>
                      <div className="w-3/12 px-1 border-r border-slate-200">A (EAN)</div>
                      <div className="w-3/12 px-1 border-r border-slate-200">B (BRAND)</div>
                      <div className="w-5/12 px-1">C (DESCRIPTION)</div>
                    </div>
                    <div className="space-y-1.5">
                      {[0, 1, 2].map((rowIdx) => (
                        <div key={rowIdx} className="flex items-center text-[9px] font-mono text-slate-500">
                          <div className="w-1/12 text-center border-r border-slate-100 text-[8px] text-slate-400 font-bold pr-1">{rowIdx + 1}</div>
                          <div className="w-3/12 px-1 flex items-center border-r border-slate-100">
                            <div className="h-2 w-11/12 bg-slate-200 rounded animate-pulse" />
                          </div>
                          <div className="w-3/12 px-1 flex items-center border-r border-slate-100">
                            <span className="font-semibold text-[8px] text-slate-600 max-w-full truncate">
                              {sheet.raw[rowIdx]?.BRAND || 'Loading...'}
                            </span>
                          </div>
                          <div className="w-5/12 px-1 truncate text-[8px] text-slate-400">
                            {sheet.raw[rowIdx]?.DESCRIPTION.slice(0, 20) || '...'}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Excel Style gridlines layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none opacity-80" />
                  </div>

                  {/* Card Metadata Footer */}
                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mb-6 text-center text-[10px]">
                    <div>
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">SKU Rows</span>
                      <span className="font-bold text-dark font-mono">{rowCount}</span>
                    </div>
                    <div className="border-x border-slate-100">
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">File Size</span>
                      <span className="font-bold text-dark font-mono">{sizeEstimate}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">Ready Qty</span>
                      <span className="font-bold text-emerald-600 font-mono">
                        {sheet.raw.reduce((acc, c) => acc + (c['READY QTYS'] || 0), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    id={`btn-open-sheet-${sheet.id}`}
                    onClick={() => openSpreadsheet(sheet.id)}
                    className={`w-full py-3.5 rounded-lg text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${sheet.btnColor}`}
                  >
                    <Maximize2 size={13} />
                    Open Spreadsheet
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Information Footer banner */}
        {/* <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
          <div className="relative z-10 max-w-xl">
            <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
              <Info className="text-emerald-400" size={18} />
              Need Custom Data Feed Formats?
            </h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              We specialize in customized automated data sync pipelines. Connect our warehouse to your Shopify, WooCommerce, or enterprise ERP systems with JSON, XML, API, or automated SFTP CSV feeds.
            </p>
          </div>
          <a
            href="/contact"
            className="relative z-10 px-8 py-4 bg-white text-dark hover:bg-emerald-500 hover:text-white text-[11px] uppercase tracking-widest font-bold rounded-lg transition-all shadow-md shrink-0 border border-slate-200"
          >
            Configure custom feed
          </a>
        </div> */}
      </div>

      {/* Spreadsheet Modal Overlay */}
      <AnimatePresence>
        {modalOpen && activeSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white w-full max-w-7xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >

              {/* Modal Spreadsheet Header / Controls */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base font-bold flex items-center gap-2">
                      Excel Spreadsheet Emulator <span className="text-[10px] font-mono font-normal text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">{activeSheet.fileName}</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-light hidden md:block">Interactive live warehouse data grid</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Real-time Search Box */}
                  <div className="relative w-full md:w-64">
                    <input
                      id="spreadsheet-search"
                      type="text"
                      placeholder="Search EAN, Brand, Product..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleRowsCount(50); // Reset pagination on filter
                      }}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={13} />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* CSV Export Button */}
                  <button
                    id="btn-export-csv"
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-md shadow-emerald-600/10 shrink-0"
                  >
                    <Download size={13} />
                    Export CSV
                  </button>

                  {/* Close Modal */}
                  <button
                    id="btn-close-modal"
                    onClick={() => setModalOpen(false)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Excel Tabs - Allows switching sheets directly inside modal */}
              <div className="bg-slate-100 px-6 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
                {sheetsMetadata.map((sheet) => (
                  <button
                    id={`tab-sheet-${sheet.id}`}
                    key={sheet.id}
                    onClick={() => switchSheetInModal(sheet.id)}
                    className={`px-4 py-2.5 text-xs font-sans font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${activeSheetId === sheet.id
                        ? 'border-emerald-600 bg-white text-emerald-600 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                      }`}
                  >
                    <Layers size={12} />
                    {sheet.title.split(' ')[0]} Portfolio
                  </button>
                ))}
              </div>

              {/* KPI Summary Strip inside Spreadsheet */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-md text-slate-600"><Database size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Total Rows (SKUs)</span>
                    <span className="text-xs font-mono font-bold text-dark">{activeStats.totalSkus}</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-md text-emerald-600"><Package size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Total Stock (Units)</span>
                    <span className="text-xs font-mono font-bold text-emerald-600">{activeStats.totalStock.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-md text-amber-600"><Coins size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Average Price (EUR)</span>
                    <span className="text-xs font-mono font-bold text-dark">€{activeStats.avgPriceEur.toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-md text-indigo-600"><Layers size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Represented Brands</span>
                    <span className="text-xs font-mono font-bold text-dark">{activeStats.distinctBrands}</span>
                  </div>
                </div>
              </div>

              {/* Excel Address/Formula Bar */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center gap-2 font-mono text-[11px] text-slate-600 select-none">
                <div className="bg-white px-2.5 py-1 border border-slate-200 rounded font-bold text-emerald-600 w-16 text-center shadow-sm">
                  {selectedCell ? `${selectedCell.colName}${selectedCell.row}` : 'A1'}
                </div>
                <div className="text-slate-400 italic font-bold select-none px-1 font-serif text-sm">fx</div>
                <div className="flex-grow bg-white border border-slate-200 rounded px-3 py-1 flex items-center font-mono shadow-sm h-7 overflow-x-auto truncate">
                  {selectedCell ? selectedCell.value : 'Click any spreadsheet cell to analyze its raw value...'}
                </div>
              </div>

              {/* Interactive Spreadsheet Grid View */}
              <div className="flex-grow overflow-auto relative">
                <table className="w-full text-left border-collapse table-fixed min-w-[900px]">

                  {/* Excel Column Letters Header */}
                  <thead className="sticky top-0 bg-slate-100 z-10 text-[10px] font-mono text-slate-500 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
                    <tr>
                      <th className="w-12 bg-slate-200 border-r border-b border-slate-300 text-center select-none font-bold py-1.5 font-mono"></th>

                      <th className="w-36 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('EAN')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col A (EAN) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-32 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('BRAND')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col B (BRAND) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-80 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('DESCRIPTION')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col C (DESCRIPTION) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-24 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('READY QTYS')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col D (QTY) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE EUR')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col E (PRICE €) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE USD')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col F (PRICE $) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE GBP')} className="flex items-center gap-1 hover:text-emerald-600 transition-colors w-full uppercase">
                          Col G (PRICE £) <ArrowUpDown size={10} />
                        </button>
                      </th>
                    </tr>
                  </thead>

                  {/* Excel Data Rows */}
                  <tbody className="divide-y divide-slate-150 font-mono text-xs text-slate-700">
                    {filteredAndSortedRecords.slice(0, visibleRowsCount).map((row, index) => {
                      const isEanSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'A';
                      const isBrandSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'B';
                      const isDescSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'C';
                      const isQtySelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'D';
                      const isEurSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'E';
                      const isUsdSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'F';
                      const isGbpSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'G';

                      return (
                        <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                          {/* Row Number Column */}
                          <td className="bg-slate-100 border-r border-slate-200 text-center select-none font-bold text-[10px] text-slate-400 py-1.5 font-mono">
                            {index + 1}
                          </td>

                          {/* EAN Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'A', row.EAN)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-mono select-text truncate ${isEanSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            {row.EAN}
                          </td>

                          {/* Brand Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'B', row.BRAND)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-semibold truncate ${isBrandSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            {row.BRAND}
                          </td>

                          {/* Description Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'C', row.DESCRIPTION)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-sans text-slate-600 font-light truncate ${isDescSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            {row.DESCRIPTION}
                          </td>

                          {/* Quantity Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'D', row['READY QTYS'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono font-bold ${row['READY QTYS'] < 10 ? 'text-amber-600' : 'text-slate-700'
                              } ${isQtySelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''}`}
                          >
                            {row['READY QTYS'].toLocaleString()}
                          </td>

                          {/* Price EUR Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'E', row['PRICE EUR'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono text-emerald-600 font-semibold ${isEurSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            €{Number(row['PRICE EUR']).toFixed(2)}
                          </td>

                          {/* Price USD Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'F', row['PRICE USD'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono text-slate-600 ${isUsdSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            ${Number(row['PRICE USD']).toFixed(2)}
                          </td>

                          {/* Price GBP Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'G', row['PRICE GBP'])}
                            className={`px-3 py-1.5 text-right cursor-pointer font-mono text-slate-600 ${isGbpSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/30' : ''
                              }`}
                          >
                            {typeof row['PRICE GBP'] === 'number' ? `£${row['PRICE GBP'].toFixed(2)}` : row['PRICE GBP']}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Empty State */}
                {filteredAndSortedRecords.length === 0 && (
                  <div className="text-center py-24 text-slate-400 text-xs font-sans flex flex-col items-center justify-center gap-2">
                    <Database size={24} className="text-slate-300" />
                    No rows match your query "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Paginated Load More Section */}
              {filteredAndSortedRecords.length > visibleRowsCount && (
                <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center shrink-0">
                  <span className="text-[10px] text-slate-500 font-sans font-light">
                    Showing <span className="font-semibold text-slate-800">{visibleRowsCount}</span> of{' '}
                    <span className="font-semibold text-slate-800">{filteredAndSortedRecords.length}</span> rows
                  </span>
                  <button
                    onClick={() => setVisibleRowsCount((prev) => Math.min(prev + 50, filteredAndSortedRecords.length))}
                    className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold font-sans tracking-wide transition-all shadow-sm"
                  >
                    Load 50 More Rows
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
