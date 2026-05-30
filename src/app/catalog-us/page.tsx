'use client';

import { useState, useMemo, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';

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

// Static metadata for US Stock Catalogs (Lazy loaded)
const sheetsMetadata = [
  {
    id: 'california-xlsx',
    fileName: 'USA Inventory List California.xlsx',
    title: 'USA Inventory (Ex.W California)',
    description: 'Fast-moving wholesale domestic stock ready for West Coast and nationwide distribution.',
    tag: 'USA Inventory Stock',
    colorClass: 'sky',
    rowCount: 873,
    sizeEstimate: '68 KB',
    readyQty: 0,
    topBrands: 'LATTAFA, DUMONT, MAISON, AFNAN, ARMAF, AHMED, RASASI, D&G...',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    borderColor: 'border-sky-500/20',
    accentGradient: 'from-sky-500/20 to-blue-500/10',
    btnColor: 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/20',
    downloadOnly: true,
    preview: []
  },
  {
    id: 'new_jersey-xlsx',
    fileName: 'USA Inventory List (New Jersy).xlsx',
    title: 'USA Inventory (Ex.W FOB New Jersey)',
    description: 'Extensive regional stock feed serving the Tri-State area with premium designer fragrances.',
    tag: 'USA Inventory Stock',
    colorClass: 'violet',
    rowCount: 1229,
    sizeEstimate: '114 KB',
    readyQty: 234101,
    topBrands: 'LATTAFA, VERSACE, RASASI, Z.ALTERNATIVE DESIGNER, DISNEY, CUBA...',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    borderColor: 'border-violet-500/20',
    accentGradient: 'from-violet-500/20 to-purple-500/10',
    btnColor: 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/20',
    downloadOnly: true,
    preview: []
  },
  {
    id: 'new_york-xls',
    fileName: 'USA Inventory (New York).xls',
    title: 'USA Inventory (FOB New York)',
    description: 'High-velocity select stock portfolio covering prestige brands and major wholesale lines.',
    tag: 'USA Inventory Stock',
    colorClass: 'rose',
    rowCount: 4468,
    sizeEstimate: '1.0 MB',
    readyQty: 239231,
    topBrands: 'LATTAFA, AL, ARMAF, TST, KHADLAJ, ARD, SALERM, MONTALE...',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
    borderColor: 'border-rose-500/20',
    accentGradient: 'from-rose-500/20 to-pink-500/10',
    btnColor: 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20',
    downloadOnly: true,
    preview: []
  }
];

export default function UsCatalog() {
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof CatalogRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Data loading state
  const [loadedData, setLoadedData] = useState<Record<string, CatalogRecord[]>>({});
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Spreadsheet cell state
  const [selectedCell, setSelectedCell] = useState<{ row: number; colName: string; value: string } | null>(null);

  // Pagination limit
  const [visibleRowsCount, setVisibleRowsCount] = useState(50);

  // Find currently active sheet configuration
  const activeSheet = useMemo(() => {
    return sheetsMetadata.find((s) => s.id === activeSheetId) || sheetsMetadata[0];
  }, [activeSheetId]);

  // Load catalog sheet data (US sheets are downloadOnly, so this is unused)
  const loadSheetData = async (id: string) => {
    if (loadedData[id]) return loadedData[id];

    setIsLoadingData(true);
    try {
      let data = [];
      const typedData = data as CatalogRecord[];
      setLoadedData(prev => ({ ...prev, [id]: typedData }));
      return typedData;
    } catch (error) {
      console.error('Failed to dynamically load US digital catalog', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Handle opening the spreadsheet modal
  const openSpreadsheet = async (id: string) => {
    setActiveSheetId(id);
    setSearchQuery('');
    setSortField(null);
    setSelectedCell(null);
    setVisibleRowsCount(50);
    setModalOpen(true);
    await loadSheetData(id);
  };

  // Switch tabs inside the modal
  const switchSheetInModal = async (id: string) => {
    setActiveSheetId(id);
    setSearchQuery('');
    setSortField(null);
    setSelectedCell(null);
    setVisibleRowsCount(50);
    await loadSheetData(id);
  };

  // Calculate dynamic stats for the active dataset
  const activeStats = useMemo(() => {
    if (!activeSheet) return { totalSkus: 0, totalStock: 0, avgPriceUsd: 0, distinctBrands: 0 };

    const items = loadedData[activeSheet.id] || [];
    const totalSkus = activeSheet.rowCount;
    const totalStock = activeSheet.readyQty;

    let avgPriceUsd = 0;
    let distinctBrands = 0;

    if (items.length > 0) {
      const sumUsd = items.reduce((sum, item) => {
        const val = typeof item['PRICE USD'] === 'number' ? item['PRICE USD'] : parseFloat(String(item['PRICE USD']).replace(/[^0-9.]/g, '')) || 0;
        return sum + val;
      }, 0);
      avgPriceUsd = sumUsd / items.length;
      distinctBrands = new Set(items.map((item) => item.BRAND)).size;
    }

    return { totalSkus, totalStock, avgPriceUsd, distinctBrands };
  }, [activeSheet, loadedData]);

  // Sorting and Filtering
  const filteredAndSortedRecords = useMemo(() => {
    const recordsRaw = loadedData[activeSheet.id] || [];
    if (recordsRaw.length === 0) return [];

    let records = recordsRaw.filter((row) => {
      const eanStr = String(row.EAN || '').toLowerCase();
      const brandStr = String(row.BRAND || '').toLowerCase();
      const descStr = String(row.DESCRIPTION || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return eanStr.includes(query) || brandStr.includes(query) || descStr.includes(query);
    });

    if (sortField) {
      records = [...records].sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

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
  }, [activeSheet.id, loadedData, searchQuery, sortField, sortDirection]);

  const requestSort = (field: keyof CatalogRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortField(field);
    setSortDirection(direction);
  };

  const handleCellClick = (rowIdx: number, colName: string, value: any) => {
    setSelectedCell({ row: rowIdx + 1, colName, value: String(value) });
  };

  const exportToCSV = () => {
    const data = loadedData[activeSheet.id] || [];
    if (data.length === 0) return;

    const headers = ['EAN', 'BRAND', 'STATUS', 'DESCRIPTION', 'READY QTYS', 'PRICE EUR', 'PRICE USD', 'PRICE GBP'];
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        [
          `"${String(row.EAN).replace(/"/g, '""')}"`,
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
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/50 text-[10px] uppercase tracking-widest font-bold text-sky-600 mb-6"
          >
            <Sparkles size={12} className="animate-pulse" />
            US Inventory Portfolios
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-dark mb-4">
            Digital Wholesale Portfolios (US)
          </h1>
          <p className="text-slate-600 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Explore dynamic North American wholesale stocks. Select a catalog below to open the spreadsheet emulator, search inventory models, and export to CSV instantly.
          </p>
        </div>

        {/* 3 Excel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {sheetsMetadata.map((sheet, index) => {
            return (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group relative bg-white border ${sheet.borderColor} rounded-2xl shadow-sm hover:shadow-xl hover:border-sky-500/30 transition-all duration-500 overflow-hidden flex flex-col`}
              >
                <div className={`h-2 bg-gradient-to-r ${sheet.accentGradient} border-b ${sheet.borderColor}`} />

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl ${sheet.iconBg} ${sheet.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                      <FileSpreadsheet size={28} />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {sheet.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-sky-600 transition-colors">
                    {sheet.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 flex-grow">
                    {sheet.description}
                  </p>

                  {/* Excel Spreadsheet Skeleton Section */}
                  {!(sheet as any).downloadOnly ? (
                    <div className="relative mb-6 rounded-lg border border-slate-200 bg-slate-50/50 p-2 overflow-hidden select-none">
                      <div className="flex text-[9px] font-mono text-slate-400 border-b border-slate-200 pb-1.5 mb-1.5">
                        <div className="w-1/12 text-center border-r border-slate-200">#</div>
                        <div className="w-3/12 px-1 border-r border-slate-200">A (EAN)</div>
                        <div className="w-3/12 px-1 border-r border-slate-200">B (BRAND)</div>
                        <div className="w-5/12 px-1">C (DESCRIPTION)</div>
                      </div>
                      <div className="space-y-1.5">
                        {sheet.preview.map((row, rowIdx) => (
                          <div key={rowIdx} className="flex items-center text-[9px] font-mono text-slate-500">
                            <div className="w-1/12 text-center border-r border-slate-100 text-[8px] text-slate-400 font-bold pr-1">{rowIdx + 1}</div>
                            <div className="w-3/12 px-1 flex items-center border-r border-slate-100">
                              <span className="font-bold text-[8px] text-black max-w-full truncate font-mono">
                                {row.EAN}
                              </span>
                            </div>
                            <div className="w-3/12 px-1 flex items-center border-r border-slate-100">
                              <span className="font-bold text-[8px] text-black max-w-full truncate">
                                {row.BRAND}
                              </span>
                            </div>
                            <div className="w-5/12 px-1 truncate text-[8px] text-black font-bold">
                              {row.DESCRIPTION}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none opacity-80" />
                    </div>
                  ) : (
                    <div className="relative mb-6 rounded-lg border border-slate-200 bg-sky-50/20 p-6 overflow-hidden flex flex-col items-center justify-center text-center gap-2 h-[126px]">
                      <FileSpreadsheet className="text-sky-600 animate-pulse" size={40} />
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Excel Spreadsheet File</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mb-6 text-center text-[10px]">
                    <div>
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">SKU Rows</span>
                      <span className="font-bold text-dark font-mono">{sheet.rowCount.toLocaleString()}</span>
                    </div>
                    <div className="border-x border-slate-100">
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">File Size</span>
                      <span className="font-bold text-dark font-mono">{sheet.sizeEstimate}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 uppercase font-bold tracking-widest text-[8px] mb-1">Ready Qty</span>
                      <span className="font-bold text-sky-600 font-mono">
                        {sheet.readyQty.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {(sheet as any).downloadOnly ? (
                    <a
                      id={`btn-open-sheet-${sheet.id}`}
                      href={`/api/download-file?filename=${encodeURIComponent(sheet.fileName)}`}
                      className={`w-full py-3.5 rounded-lg text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${sheet.btnColor}`}
                    >
                      <Download size={13} />
                      Download Catalog
                    </a>
                  ) : (
                    <button
                      id={`btn-open-sheet-${sheet.id}`}
                      onClick={() => openSpreadsheet(sheet.id)}
                      className={`w-full py-3.5 rounded-lg text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${sheet.btnColor}`}
                    >
                      <Maximize2 size={13} />
                      Open Spreadsheet
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
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
              {/* Header */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500 text-white shadow-lg shadow-sky-500/20">
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
                  <div className="relative w-full md:w-64">
                    <input
                      id="spreadsheet-search"
                      type="text"
                      placeholder="Search EAN, Brand, Product..."
                      value={searchQuery}
                      disabled={isLoadingData}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleRowsCount(50);
                      }}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all font-sans disabled:opacity-50"
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

                  <button
                    id="btn-export-csv"
                    onClick={exportToCSV}
                    disabled={isLoadingData || (loadedData[activeSheet.id] || []).length === 0}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-md shadow-sky-600/10 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={13} />
                    Export CSV
                  </button>

                  <button
                    id="btn-close-modal"
                    onClick={() => setModalOpen(false)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-slate-100 px-6 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
                {sheetsMetadata.filter(sheet => !(sheet as any).downloadOnly).map((sheet) => (
                  <button
                    id={`tab-sheet-${sheet.id}`}
                    key={sheet.id}
                    onClick={() => switchSheetInModal(sheet.id)}
                    className={`px-4 py-2.5 text-xs font-sans font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${activeSheetId === sheet.id
                      ? 'border-sky-600 bg-white text-sky-600 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                      }`}
                  >
                    <Layers size={12} />
                    {sheet.tag}
                  </button>
                ))}
              </div>

              {/* Summary Strip */}
              <div className="bg-white px-6 py-4 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-md text-slate-600"><Database size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Total Rows (SKUs)</span>
                    <span className="text-xs font-mono font-bold text-dark">{activeStats.totalSkus.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-sky-50 rounded-md text-sky-600"><Package size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Total Stock (Units)</span>
                    <span className="text-xs font-mono font-bold text-sky-600">{activeStats.totalStock.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-md text-amber-600"><Coins size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Average Price (USD)</span>
                    <span className="text-xs font-mono font-bold text-dark">
                      {isLoadingData ? '...' : `$${activeStats.avgPriceUsd.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-md text-indigo-600"><Layers size={15} /></div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Represented Brands</span>
                    <span className="text-xs font-mono font-bold text-dark">
                      {isLoadingData ? '...' : activeStats.distinctBrands.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Formula Bar */}
              <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-2 font-mono text-[11px] text-slate-600 select-none">
                <div className="bg-white px-2.5 py-1 border border-slate-200 rounded font-bold text-sky-600 w-16 text-center shadow-sm">
                  {selectedCell ? `${selectedCell.colName}${selectedCell.row}` : 'A1'}
                </div>
                <div className="text-slate-400 italic font-bold select-none px-1 font-serif text-sm">fx</div>
                <div className="flex-grow bg-white border border-slate-200 rounded px-3 py-1 flex items-center font-mono shadow-sm h-7 overflow-x-auto truncate">
                  {isLoadingData ? (
                    <span className="text-slate-400 italic animate-pulse flex items-center gap-2">
                      <Loader2 className="animate-spin" size={12} /> Loading and streaming catalog data points...
                    </span>
                  ) : selectedCell ? selectedCell.value : 'Click any spreadsheet cell to analyze its raw value...'}
                </div>
              </div>

              {/* Grid */}
              <div className="flex-grow overflow-auto relative">
                <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                  <thead className="sticky top-0 bg-slate-100 z-10 text-[10px] font-mono text-slate-500 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
                    <tr>
                      <th className="w-12 bg-slate-200 border-r border-b border-slate-300 text-center select-none font-bold py-1.5 font-mono"></th>

                      <th className="w-36 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('EAN')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col A (EAN) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-32 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('BRAND')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col B (BRAND) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-80 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('DESCRIPTION')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col C (DESCRIPTION) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-24 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('READY QTYS')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col D (QTY) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE EUR')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col E (PRICE €) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-r border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE USD')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col F (PRICE $) <ArrowUpDown size={10} />
                        </button>
                      </th>

                      <th className="w-28 border-b border-slate-200 px-3 select-none font-bold py-1.5">
                        <button onClick={() => requestSort('PRICE GBP')} className="flex items-center gap-1 hover:text-sky-600 transition-colors w-full uppercase">
                          Col G (PRICE £) <ArrowUpDown size={10} />
                        </button>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-150 font-mono text-xs text-slate-700">
                    {isLoadingData ? (
                      <tr>
                        <td colSpan={8} className="py-32 text-center text-slate-400 font-sans">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <Loader2 size={32} className="animate-spin text-sky-500" />
                            <div className="space-y-1">
                              <p className="text-dark font-bold text-sm">Processing Digital Dataset ({activeSheet.sizeEstimate})</p>
                              <p className="text-xs text-slate-400">Deserializing data frames. This will just take a second...</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredAndSortedRecords.slice(0, visibleRowsCount).map((row, index) => {
                      const isEanSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'A';
                      const isBrandSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'B';
                      const isDescSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'C';
                      const isQtySelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'D';
                      const isEurSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'E';
                      const isUsdSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'F';
                      const isGbpSelected = selectedCell?.row === index + 1 && selectedCell?.colName === 'G';

                      return (
                        <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                          <td className="bg-slate-100 border-r border-slate-200 text-center select-none font-bold text-[10px] text-slate-400 py-1.5 font-mono">
                            {index + 1}
                          </td>

                          <td
                            onClick={() => handleCellClick(index, 'A', row.EAN)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-mono select-text truncate ${isEanSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            {row.EAN}
                          </td>

                          <td
                            onClick={() => handleCellClick(index, 'B', row.BRAND)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-bold truncate text-black ${isBrandSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            {row.BRAND}
                          </td>

                          <td
                            onClick={() => handleCellClick(index, 'C', row.DESCRIPTION)}
                            className={`border-r border-slate-150 px-3 py-1.5 cursor-pointer font-sans text-black font-bold truncate ${isDescSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            {row.DESCRIPTION}
                          </td>

                          {/* Quantity Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'D', row['READY QTYS'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono font-bold text-black ${isQtySelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''}`}
                          >
                            {Number(row['READY QTYS']).toLocaleString()}
                          </td>

                          {/* Price EUR Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'E', row['PRICE EUR'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono text-black font-bold ${isEurSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            €{Number(row['PRICE EUR']).toFixed(2)}
                          </td>

                          {/* Price USD Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'F', row['PRICE USD'])}
                            className={`border-r border-slate-150 px-3 py-1.5 text-right cursor-pointer font-mono text-black font-bold ${isUsdSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            ${Number(row['PRICE USD']).toFixed(2)}
                          </td>

                          {/* Price GBP Cell */}
                          <td
                            onClick={() => handleCellClick(index, 'G', row['PRICE GBP'])}
                            className={`px-3 py-1.5 text-right cursor-pointer font-mono text-black font-bold ${isGbpSelected ? 'outline outline-2 outline-sky-600 bg-sky-50/30' : ''
                              }`}
                          >
                            {typeof row['PRICE GBP'] === 'number' ? `£${row['PRICE GBP'].toFixed(2)}` : row['PRICE GBP']}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {!isLoadingData && filteredAndSortedRecords.length === 0 && (
                  <div className="text-center py-24 text-slate-400 text-xs font-sans flex flex-col items-center justify-center gap-2">
                    <Database size={24} className="text-slate-300" />
                    No rows match your query "{searchQuery}"
                  </div>
                )}
              </div>

              {!isLoadingData && filteredAndSortedRecords.length > visibleRowsCount && (
                <div className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center shrink-0">
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
