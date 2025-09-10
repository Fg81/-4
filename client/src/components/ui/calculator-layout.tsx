import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExport } from '@/hooks/use-export';
import { useCalculationHistory } from '@/hooks/use-local-storage';
import { Download, Save, History } from 'lucide-react';

interface CalculatorLayoutProps {
  title: string;
  children: ReactNode;
  results?: any;
  inputs?: any;
  calculatorType?: string;
}

export default function CalculatorLayout({ 
  title, 
  children, 
  results, 
  inputs, 
  calculatorType 
}: CalculatorLayoutProps) {
  const { exportToPNG, exportToPDF } = useExport();
  const { saveCalculation } = useCalculationHistory();

  const handleSave = () => {
    if (results && inputs && calculatorType) {
      saveCalculation(calculatorType, inputs, results);
      // Show success message
    }
  };

  const handleExportPNG = () => {
    exportToPNG('calculator-content', `${calculatorType}-calculation`);
  };

  const handleExportPDF = () => {
    exportToPDF('calculator-content', `${calculatorType}-calculation`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            {title}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {results && inputs && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Сохранить</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPNG}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">PNG</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent id="calculator-content" className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}