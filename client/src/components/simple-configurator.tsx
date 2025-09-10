import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Car, Music, DollarSign, CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const steps: Step[] = [
  {
    id: 'car',
    title: 'Автомобиль',
    description: 'Расскажите о вашем автомобиле',
    icon: Car
  },
  {
    id: 'music',
    title: 'Музыкальные предпочтения',
    description: 'Какую музыку вы слушаете?',
    icon: Music
  },
  {
    id: 'budget',
    title: 'Бюджет',
    description: 'Сколько готовы потратить?',
    icon: DollarSign
  },
  {
    id: 'result',
    title: 'Рекомендации',
    description: 'Получите персональные рекомендации',
    icon: CheckCircle
  }
];

export default function SimpleConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    carYear: '',
    musicGenres: [] as string[],
    listeningHabits: '',
    budget: '',
    priorities: [] as string[]
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: (prev[key as keyof typeof prev] as string[]).includes(value)
        ? (prev[key as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[key as keyof typeof prev] as string[]), value]
    }));
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    const Icon = step.icon;

    switch (step.id) {
      case 'car':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carMake">Марка автомобиля</Label>
                <Input
                  id="carMake"
                  placeholder="например, BMW"
                  value={formData.carMake}
                  onChange={(e) => updateFormData('carMake', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="carModel">Модель</Label>
                <Input
                  id="carModel"
                  placeholder="например, X5"
                  value={formData.carModel}
                  onChange={(e) => updateFormData('carModel', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="carYear">Год выпуска</Label>
                <Input
                  id="carYear"
                  type="number"
                  placeholder="2020"
                  value={formData.carYear}
                  onChange={(e) => updateFormData('carYear', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'music':
        const genres = ['Рок', 'Поп', 'Электронная', 'Хип-хоп', 'Классика', 'Джаз', 'Метал', 'R&B'];
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>

            <div>
              <Label>Любимые жанры (выберите несколько)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map(genre => (
                  <Badge
                    key={genre}
                    variant={formData.musicGenres.includes(genre) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayValue('musicGenres', genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="listeningHabits">Как часто слушаете музыку в машине?</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Каждый день', 'Несколько раз в неделю', 'По выходным', 'Редко'].map(habit => (
                  <Badge
                    key={habit}
                    variant={formData.listeningHabits === habit ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateFormData('listeningHabits', habit)}
                  >
                    {habit}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 'budget':
        const budgetRanges = ['До 50 000₽', '50 000 - 100 000₽', '100 000 - 200 000₽', 'Свыше 200 000₽'];
        const priorities = ['Качество звука', 'Громкость', 'Мощные басы', 'Сбалансированность'];
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>

            <div>
              <Label>Примерный бюджет</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {budgetRanges.map(range => (
                  <Badge
                    key={range}
                    variant={formData.budget === range ? "default" : "outline"}
                    className="cursor-pointer p-3 justify-center"
                    onClick={() => updateFormData('budget', range)}
                  >
                    {range}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Приоритеты (выберите главные)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {priorities.map(priority => (
                  <Badge
                    key={priority}
                    variant={formData.priorities.includes(priority) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayValue('priorities', priority)}
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">Персональные рекомендации для вашего автомобиля</p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold">Рекомендуемая конфигурация:</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-background rounded border">
                  <span className="font-medium">Головное устройство</span>
                  <span className="text-primary">Pioneer AVH-Z5200BT</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-background rounded border">
                  <span className="font-medium">Передние динамики</span>
                  <span className="text-primary">Focal Access 165 AS</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-background rounded border">
                  <span className="font-medium">Усилитель</span>
                  <span className="text-primary">Alpine MRV-F300</span>
                </div>
                
                {formData.priorities.includes('Мощные басы') && (
                  <div className="flex justify-between items-center p-3 bg-background rounded border">
                    <span className="font-medium">Сабвуфер</span>
                    <span className="text-primary">JL Audio 10W3v3-4</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Примерная стоимость:</span>
                  <span className="text-xl font-bold text-primary">
                    {formData.budget === 'До 50 000₽' ? '45 000₽' : 
                     formData.budget === '50 000 - 100 000₽' ? '85 000₽' :
                     formData.budget === '100 000 - 200 000₽' ? '150 000₽' : '200 000₽'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                Получить детальный план
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Начать заново
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Простой конфигуратор автозвука</CardTitle>
        <div className="w-full">
          <Progress value={progress} className="mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Шаг {currentStep + 1} из {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            Далее
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}