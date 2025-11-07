import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProcessStage {
  title: string;
  fields: string[];
  apps: string[];
}

interface Process {
  id: string;
  name: string;
  stages: ProcessStage[];
}

interface FieldData {
  [processId: string]: {
    [stageIndex: number]: {
      [fieldName: string]: string;
    };
  };
}

const processes: Process[] = [
  {
    id: "p1",
    name: "Producto estándar",
    stages: [
      {
        title: "Producción | PCP",
        fields: ["Programa", "Fecha estipulada"],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: [],
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["Bejerman ERP"],
      },
    ],
  },
  {
    id: "p3",
    name: "Producto especial con Ingeniería adaptada",
    stages: [
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: ["Factibilidad"],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Administración",
        fields: ["Costos"],
        apps: ["Bejerman ERP"],
      },
      {
        title: "Ingeniería",
        fields: ["Fecha de inicio", "Tiempo de desarrollo"],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Producción | PCP",
        fields: ["Carga de planta", "Fecha de inicio", "Fecha de entrega"],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["Bejerman ERP"],
      },
    ],
  },
  {
    id: "p4",
    name: "Producto especial con Ingeniería a medida",
    stages: [
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: ["Factibilidad", "Estimación materiales"],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Producción | PCP",
        fields: ["Capacidad técnica", "Tiempo de producción"],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Administración",
        fields: ["Costos", "Costo de oportunidad"],
        apps: ["Bejerman ERP"],
      },
      {
        title: "Directorio",
        fields: ["Conveniencia", "Etapas"],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: ["Fecha de inicio x etapa", "Tipo de desarrollo x etapa", "Fecha de entrega x etapa"],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Producción | PCP",
        fields: ["Carga de planta", "Fecha de inicio x etapa", "Fecha de entrega x etapa"],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["Bejerman ERP"],
      },
    ],
  },
];

const ProcessVisualizer = () => {
  const [selectedStage, setSelectedStage] = useState<{
    processId: string;
    processName: string;
    stageIndex: number;
    stage: ProcessStage;
  } | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>("p1");
  const [fieldData, setFieldData] = useState<FieldData>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const isStageComplete = (processId: string, stageIndex: number, fields: string[]) => {
    const stageData = fieldData[processId]?.[stageIndex];
    if (!stageData) return false;
    return fields.every(field => stageData[field] && stageData[field].trim() !== "");
  };

  const handleSaveFields = () => {
    if (!selectedStage) return;

    const newFieldData = { ...fieldData };
    if (!newFieldData[selectedStage.processId]) {
      newFieldData[selectedStage.processId] = {};
    }
    if (!newFieldData[selectedStage.processId][selectedStage.stageIndex]) {
      newFieldData[selectedStage.processId][selectedStage.stageIndex] = {};
    }

    Object.keys(formValues).forEach(field => {
      newFieldData[selectedStage.processId][selectedStage.stageIndex][field] = formValues[field];
    });

    setFieldData(newFieldData);
    toast.success("Campos guardados correctamente");
    setSelectedStage(null);
    setFormValues({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Procesos de Venta
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {processes.map((process) => {
            const isExpanded = expandedProcess === process.id;
            
            return (
              <Card
                key={process.id}
                className="border-2 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <CardHeader
                  className="cursor-pointer select-none hover:bg-muted/30 transition-colors py-4"
                  onClick={() => setExpandedProcess(isExpanded ? null : process.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      {process.name}
                      <Badge variant="secondary" className="font-normal">
                        {process.stages.length} etapas
                      </Badge>
                    </CardTitle>
                    <Button variant="ghost" size="icon">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-4 pb-6">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4">
                      {process.stages.map((stage, index) => {
                        const isComplete = isStageComplete(process.id, index, stage.fields);
                        const cardClasses = isComplete 
                          ? "bg-stage-complete/20 border-stage-complete" 
                          : "bg-stage-pending/20 border-stage-pending";
                        
                        return (
                          <div key={index} className="flex items-center gap-4 flex-shrink-0">
                            {/* Stage Card */}
                            <Card
                              className={`${cardClasses} border-2 min-w-[220px] cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300`}
                              onClick={() => {
                                const currentData = fieldData[process.id]?.[index] || {};
                                const initialValues: { [key: string]: string } = {};
                                stage.fields.forEach(field => {
                                  initialValues[field] = currentData[field] || "";
                                });
                                setFormValues(initialValues);
                                setSelectedStage({ 
                                  processId: process.id,
                                  processName: process.name, 
                                  stageIndex: index,
                                  stage 
                                });
                              }}
                            >
                              <CardHeader className="pb-2 pt-3">
                                <CardTitle className="text-sm font-bold">
                                  {stage.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 pb-3">
                                <div>
                                  <p className="text-xs font-semibold mb-1.5 opacity-70">
                                    CAMPOS:
                                  </p>
                                  <ul className="space-y-0.5">
                                    {stage.fields.map((field, idx) => (
                                      <li key={idx} className="text-xs flex items-start gap-1.5">
                                        <span className="text-[10px] mt-0.5">•</span>
                                        <span>{field}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {stage.apps.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {stage.apps.map((app, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-[9px] px-1.5 py-0 h-4"
                                      >
                                        {app}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            {/* Arrow */}
                            {index < process.stages.length - 1 && (
                              <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedStage}
        onOpenChange={() => {
          setSelectedStage(null);
          setFormValues({});
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedStage?.stage.title}
            </DialogTitle>
            <DialogDescription>
              Completar campos de la etapa en: <strong>{selectedStage?.processName}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {selectedStage?.stage.fields.map((field, idx) => (
                <div key={idx} className="space-y-2">
                  <Label htmlFor={`field-${idx}`}>{field}</Label>
                  <Input
                    id={`field-${idx}`}
                    value={formValues[field] || ""}
                    onChange={(e) => setFormValues(prev => ({
                      ...prev,
                      [field]: e.target.value
                    }))}
                    placeholder={`Ingrese ${field.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            {selectedStage?.stage.apps && selectedStage.stage.apps.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Aplicaciones:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStage.stage.apps.map((app, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-sm"
                    >
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStage(null);
                  setFormValues({});
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveFields}>
                Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProcessVisualizer;
