import { Database, Cpu, PlayCircle, Filter } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { DataTable } from './DataTable';
import { Badge } from './Badge';
import { Button } from './Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const distributionData = [
  { range: '0.0-0.1', count: 12 },
  { range: '0.1-0.2', count: 28 },
  { range: '0.2-0.3', count: 45 },
  { range: '0.3-0.4', count: 67 },
  { range: '0.4-0.5', count: 89 },
  { range: '0.5-0.6', count: 124 },
  { range: '0.6-0.7', count: 98 },
  { range: '0.7-0.8', count: 56 },
  { range: '0.8-0.9', count: 34 },
  { range: '0.9-1.0', count: 18 }
];

const recentRuns = [
  { 
    id: 'RUN-2024-1124-001',
    algorithm: 'GENIE3',
    dataset: 'hESC',
    auprc: 0.847,
    auroc: 0.923,
    runtime: '4.2 min',
    status: 'Completed',
    timestamp: '2 hours ago'
  },
  { 
    id: 'RUN-2024-1124-002',
    algorithm: 'PPCOR',
    dataset: 'mDC',
    auprc: 0.612,
    auroc: 0.789,
    runtime: '1.8 min',
    status: 'Completed',
    timestamp: '3 hours ago'
  },
  { 
    id: 'RUN-2024-1123-045',
    algorithm: 'SINCERITIES',
    dataset: 'hESC',
    auprc: 0.734,
    auroc: 0.856,
    runtime: '8.7 min',
    status: 'Completed',
    timestamp: '5 hours ago'
  },
  { 
    id: 'RUN-2024-1123-044',
    algorithm: 'PIDC',
    dataset: 'mESC',
    auprc: 0.691,
    auroc: 0.812,
    runtime: '3.1 min',
    status: 'Completed',
    timestamp: '6 hours ago'
  },
  { 
    id: 'RUN-2024-1123-043',
    algorithm: 'GRNBoost2',
    dataset: 'hHep',
    auprc: 0.803,
    auroc: 0.891,
    runtime: '5.4 min',
    status: 'Completed',
    timestamp: '8 hours ago'
  }
];

export function MainDashboard() {
  const navigate = useNavigate();
  const [selectedOrganism, setSelectedOrganism] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const columns = [
    { 
      key: 'id', 
      label: 'Run ID',
      sortable: true,
      render: (val: string) => <span className="font-mono text-purple-600">{val}</span>
    },
    { 
      key: 'algorithm', 
      label: 'Algorithm',
      sortable: true,
      render: (val: string) => <span>{val}</span>
    },
    { 
      key: 'dataset', 
      label: 'Dataset',
      sortable: true,
      render: (val: string) => <Badge variant="info">{val}</Badge>
    },
    { 
      key: 'auprc', 
      label: 'AUPRC',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    },
    { 
      key: 'auroc', 
      label: 'AUROC',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    },
    { 
      key: 'runtime', 
      label: 'Runtime',
      sortable: true 
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (val: string) => (
        <Badge variant={val === 'Completed' ? 'success' : 'warning'}>{val}</Badge>
      )
    },
    { 
      key: 'timestamp', 
      label: 'Time',
      render: (val: string) => <span className="text-gray-500">{val}</span>
    }
  ];
  
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of BEELINE benchmarking activity</p>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          label="Total Datasets"
          value="42"
          trend={8}
          trendLabel="vs last month"
          icon={<Database className="w-6 h-6" />}
          color="var(--color-primary)"
        />
        <MetricCard
          label="Total Algorithms"
          value="18"
          trend={2}
          trendLabel="new this month"
          icon={<Cpu className="w-6 h-6" />}
          color="var(--color-accent)"
        />
        <MetricCard
          label="Total Runs"
          value="1,247"
          sparklineData={[45, 52, 48, 61, 73, 89, 94, 102, 98, 124]}
          icon={<PlayCircle className="w-6 h-6" />}
          color="var(--color-blue)"
        />
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AUPRC Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-1">AUPRC Distribution</h3>
            <p className="text-gray-500 text-sm">Performance across all completed runs</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Quick Filters */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Quick Filters</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Organism</label>
              <select 
                value={selectedOrganism}
                onChange={(e) => setSelectedOrganism(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All organisms</option>
                <option value="human">Human</option>
                <option value="mouse">Mouse</option>
                <option value="yeast">Yeast</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Dataset Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All types</option>
                <option value="scRNA-seq">scRNA-seq</option>
                <option value="Bulk RNA-seq">Bulk RNA-seq</option>
                <option value="ChIP-seq">ChIP-seq</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Size Range</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-gray-700">Small (&lt; 500 genes)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
                  <span className="text-sm text-gray-700">Medium (500-2000)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
                  <span className="text-sm text-gray-700">Large (&gt; 2000 genes)</span>
                </label>
              </div>
            </div>
            
            <Button variant="primary" className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recent Runs Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-1">Recent Runs</h3>
            <p className="text-gray-500 text-sm">Latest benchmarking results</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/upload')}>
            New Run
          </Button>
        </div>
        <DataTable 
          columns={columns} 
          data={recentRuns}
          onRowClick={(row) => navigate(`/run/${row.id}`)}
        />
      </div>
    </div>
  );
}