import { useState } from 'react';
import { useCalculationHistory } from '@/hooks/use-local-storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Trash2, Calendar, Type } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function CalculationHistory() {
  const { history, deleteCalculation, clearHistory } = useCalculationHistory();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <History className="h-4 w-4 mr-2" />
        История ({history.length})
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              История расчетов
            </CardTitle>
            <div className="flex gap-2">
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-destructive hover:text-destructive"
                >
                  Очистить все
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Пока нет сохраненных расчетов
            </p>
          ) : (
            history.map((calculation: any) => (
              <div
                key={calculation.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{calculation.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(calculation.timestamp), 'dd MMM yyyy, HH:mm', { locale: ru })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{calculation.type}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCalculation(calculation.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted rounded p-2 text-sm space-y-1">
                  <div className="font-medium">Входные данные:</div>
                  <div className="text-muted-foreground">
                    {JSON.stringify(calculation.inputs, null, 0).replace(/[{}\"]/g, '').replace(/,/g, ', ')}
                  </div>
                </div>
                
                <div className="bg-primary/5 rounded p-2 text-sm space-y-1">
                  <div className="font-medium">Результат:</div>
                  <div className="text-primary">
                    {JSON.stringify(calculation.results, null, 0).replace(/[{}\"]/g, '').replace(/,/g, ', ')}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}