import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProcessStage {
  title: string;
  fields: string[];
  apps: string[];
  color: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
  stages: ProcessStage[];
}

const processes: Process[] = [
  {
    id: "p1",
    name: "Producto estándar Programado",
    description: "Flujo para productos con programa establecido",
    stages: [
      {
        title: "Producción | PCP",
        fields: ["Programa", "Fecha estipulada"],
        apps: ["SIEMENS Opcenter SC"],
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: ["App"],
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-orange-100 border-orange-300 text-orange-900",
      },
    ],
  },
  {
    id: "p2",
    name: "Producto estándar sin Programa",
    description: "Flujo para productos sin programa previo",
    stages: [
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: ["App"],
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        title: "Producción | PCP",
        fields: ["Carga de planta", "Fecha de inicio", "Fecha de entrega"],
        apps: ["SIEMENS Opcenter SC"],
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-orange-100 border-orange-300 text-orange-900",
      },
    ],
  },
  {
    id: "p3",
    name: "Producto especial con Ingeniería adaptada",
    description: "Flujo con ingeniería de adaptación",
    stages: [
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: ["App"],
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        title: "Ingeniería | de ventas",
        fields: ["Factibilidad"],
        apps: ["SIEMENS Teamcenter"],
        color: "bg-teal-100 border-teal-300 text-teal-900",
      },
      {
        title: "Administración",
        fields: ["Costos"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-amber-100 border-amber-300 text-amber-900",
      },
      {
        title: "Ingeniería | de diseño",
        fields: ["Fecha de inicio", "Tiempo de desarrollo"],
        apps: ["SIEMENS Teamcenter"],
        color: "bg-green-100 border-green-300 text-green-900",
      },
      {
        title: "Producción | PCP",
        fields: ["Carga de planta", "Fecha de inicio", "Fecha de entrega"],
        apps: ["SIEMENS Opcenter SC"],
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-orange-100 border-orange-300 text-orange-900",
      },
    ],
  },
  {
    id: "p4",
    name: "Producto especial con Ingeniería a medida",
    description: "Flujo completo con ingeniería personalizada",
    stages: [
      {
        title: "Ventas",
        fields: ["Oportunidad"],
        apps: ["App"],
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        title: "Ingeniería | de diseño",
        fields: ["Factibilidad", "Estimación materiales"],
        apps: ["SIEMENS Teamcenter"],
        color: "bg-green-100 border-green-300 text-green-900",
      },
      {
        title: "Producción | PCP",
        fields: ["Capacidad técnica", "Tiempo de producción"],
        apps: ["SIEMENS Opcenter SC"],
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        title: "Administración",
        fields: ["Costos", "Costo de oportunidad"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-amber-100 border-amber-300 text-amber-900",
      },
      {
        title: "Directorio",
        fields: ["Conveniencia", "Etapas"],
        apps: ["App"],
        color: "bg-slate-100 border-slate-300 text-slate-900",
      },
      {
        title: "Ingeniería | de diseño",
        fields: ["Fecha de inicio x etapa", "Tipo de desarrollo x etapa", "Fecha de entrega x etapa"],
        apps: ["SIEMENS Teamcenter"],
        color: "bg-green-100 border-green-300 text-green-900",
      },
      {
        title: "Producción | PCP",
        fields: ["Carga de planta", "Fecha de inicio x etapa", "Fecha de entrega x etapa"],
        apps: ["SIEMENS Opcenter SC"],
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        title: "Ventas",
        fields: ["Cotización", "Activación del pedido", "Fecha de entrega"],
        apps: ["App", "Bejerman ERP"],
        color: "bg-orange-100 border-orange-300 text-orange-900",
      },
    ],
  },
];

const ProcessVisualizer = () => {
  const [selectedStage, setSelectedStage] = useState<{
    process: string;
    stage: ProcessStage;
  } | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>("p1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Procesos de Venta
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Visualización interactiva de los flujos de trabajo
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {processes.map((process) => {
            const isExpanded = expandedProcess === process.id;
            
            return (
              <Card
                key={process.id}
                className="border-2 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <CardHeader
                  className="cursor-pointer select-none hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedProcess(isExpanded ? null : process.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold flex items-center gap-3">
                        {process.name}
                        <Badge variant="secondary" className="font-normal">
                          {process.stages.length} etapas
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">
                        {process.description}
                      </p>
                    </div>
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
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4">
                      {process.stages.map((stage, index) => (
                        <div key={index} className="flex items-center gap-4 flex-shrink-0">
                          {/* Stage Card */}
                          <Card
                            className={`${stage.color} border-2 min-w-[280px] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300`}
                            onClick={() =>
                              setSelectedStage({ process: process.name, stage })
                            }
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-bold">
                                {stage.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-xs font-semibold mb-2 opacity-70">
                                  CAMPOS:
                                </p>
                                <ul className="space-y-1">
                                  {stage.fields.map((field, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <span className="text-xs mt-0.5">#</span>
                                      <span>{field}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold mb-2 opacity-70">
                                  APPS:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {stage.apps.map((app, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {app}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Arrow */}
                          {index < process.stages.length - 1 && (
                            <ArrowRight className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      ))}
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
        onOpenChange={() => setSelectedStage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedStage?.stage.title}
            </DialogTitle>
            <DialogDescription>
              Detalles de la etapa en el proceso: <strong>{selectedStage?.process}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                📋 Campos requeridos
              </h3>
              <div className="space-y-2">
                {selectedStage?.stage.fields.map((field, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <p className="font-medium">{field}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                💻 Aplicaciones utilizadas
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedStage?.stage.apps.map((app, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-base px-4 py-2"
                  >
                    {app}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProcessVisualizer;
