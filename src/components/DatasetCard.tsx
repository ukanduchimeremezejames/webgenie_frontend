import { Badge } from './Badge';
import { Button } from './Button';
import { Activity, Download } from 'lucide-react';

interface DatasetCardProps {
  name: string;
  organism: string;
  type: string;
  genes: number;
  cells: number;
  edges: number;
  onClick?: () => void;
}

export function DatasetCard({ name, organism, type, genes, cells, edges, onClick }: DatasetCardProps) {
  return (
    <div 
      className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="text-gray-900">{name}</h4>
            <p className="text-gray-500 text-xs">{organism}</p>
          </div>
        </div>
        <Badge variant="info" size="sm">{type}</Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Genes</p>
          <p className="text-gray-900">{genes.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Cells</p>
          <p className="text-gray-900">{cells.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Edges</p>
          <p className="text-gray-900">{edges.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          View Details
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          icon={<Download className="w-4 h-4" />}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
        </Button>
      </div>
    </div>
  );
}
