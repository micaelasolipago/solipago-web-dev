import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// ICONOS ACTUALIZADOS: Se añadió X (para eliminar)
import { ArrowRight, ChevronDown, ChevronUp, X, PlusCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; 
// Importaciones para campos de selección (SI/NO)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// ===================================
// 1. INTERFACES ACTUALIZADAS
// ===================================

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
  // Ahora la clave principal es el saleId (ej: 'vta-001')
  [saleId: string]: {
    [stageIndex: number]: {
      [fieldName: string]: string;
    };
  };
}

// NUEVA INTERFAZ para manejar las instancias de venta activas
interface SalesInstance {
  id: string; // ID único para esta venta (ej: 'vta-001')
  processId: string; // Referencia al ID del proceso estático (ej: 'p1')
  processName: string;
}


// ===================================
// 2. DATA ESTÁTICA (CONFIGURACIÓN)
// ===================================

// ===================================
// 2. DATA ESTÁTICA (CONFIGURACIÓN ORIGINAL)
// ===================================

const processes: Process[] = [
  {
    id: "p1",
    name: "Producto estándar",
    stages: [
      {
        title: "Ventas",
        fields: ["Nombre del Cliente", "Nombre del Producto", "Fecha de entrega requerida", "Usuario"],
        apps: [],
      },
      {
        title: "Producción | PCP",
        fields: ["Fecha inicio Producción", "Fecha fin Producción", "Usuario"],
        apps: ["SIEMENS Opcenter SC"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Ventas",
        fields: ["Fecha rechazo", "Fecha activación del pedido", "Fecha de entrega final", "Usuario"],
        apps: ["Bejerman ERP"], // <-- VUELVE LA APP CORRECTA
      },
    ],
  },
  {
    id: "p3",
    name: "Producto especial con ingeniería adaptada",
    stages: [
      {
        title: "Ventas",
        fields: ["Nombre del Cliente", "Nombre del Producto", "Fecha de entrega requerida", "Usuario"],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: ["Factibilidad [SI/NO]", "Fecha inicio Diseño", "Fecha fin Diseño", "Usuario"],
        apps: ["SIEMENS Teamcenter"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Administración",
        fields: ["Costo informado [SI/NO]", "Usuario"],
        apps: ["Bejerman ERP"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Producción | PCP",
        fields: ["Fecha inicio Producción", "Fecha fin Producción", "Usuario"],
        apps: ["SIEMENS Opcenter SC"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Ventas",
        fields: ["Fecha rechazo", "Fecha activación del pedido", "Fecha de entrega final", "Usuario"],
        apps: ["Bejerman ERP"], // <-- VUELVE LA APP CORRECTA
      },
    ],
  },
  {
    id: "p4",
    name: "Producto especial con ingeniería a medida",
    stages: [
      {
        title: "Ventas",
        fields: ["Nombre del Cliente", "Nombre del Producto", "Fecha de entrega requerida", "Usuario"],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: ["Factibilidad [SI/NO]", "Fecha inicio Diseño", "Fecha fin Diseño", "Usuario"],
        apps: ["SIEMENS Teamcenter"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Producción | PCP",
        fields: ["Factibilidad [SI/NO]", "Fecha inicio Producción", "Fecha fin Producción", "Usuario"],
        apps: ["SIEMENS Opcenter SC"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Administración",
        fields: ["Costo informado [SI/NO]", "Usuario"],
        apps: ["Bejerman ERP"], // <-- VUELVE LA APP CORRECTA
      },
      {
        title: "Directorio",
        fields: ["Ok para avanzar [SI/NO]", "Usuario"],
        apps: [],
      },
      {
        title: "Ventas",
        fields: ["Fecha rechazo", "Fecha activación del pedido", "Fecha de entrega final", "Usuario"],
        apps: ["Bejerman ERP"], // <-- VUELVE LA APP CORRECTA
      },
    ],
  },
];

// ===================================
// 3. ESTILOS Y UTILIDADES
// ===================================

const getAppStyles = (appName: string): { style: React.CSSProperties, className?: string } => {
  switch (appName.toLowerCase()) {
    case 'solidworks':
    case 'inventor':
    case 'nx cad':
      return { style: { backgroundColor: '#FFD700', color: '#333' } }; // Amarillo CAD
    case 'erp':
    case 'sap ariba':
      return { style: { backgroundColor: '#1E90FF', color: 'white' } }; // Azul ERP
    case 'wms':
    case 'sharepoint':
      return { style: { backgroundColor: '#3CB371', color: 'white' } }; // Verde Gestión
    case 'metrología':
    case 'control de calidad':
      return { style: { backgroundColor: '#FF4500', color: 'white' } }; // Naranja QA
    default:
      return { style: { backgroundColor: '#E0E0E0', color: '#333' } };
  }
};


// ===================================
// 4. COMPONENTE PRINCIPAL (ProcessVisualizer)
// ===================================

const ProcessVisualizer = () => {
  const [selectedStage, setSelectedStage] = useState<{
    processId: string; // ESTO AHORA CONTIENE EL saleId (ej: 'vta-001')
    processName: string;
    stageIndex: number;
    stage: ProcessStage;
  } | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>("p1");
  const [fieldData, setFieldData] = useState<FieldData>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  // >>> NUEVO ESTADO PARA GESTIONAR LAS INSTANCIAS DE VENTA
  const [salesInstances, setSalesInstances] = useState<SalesInstance[]>([
    { id: 'vta-001', processId: 'p1', processName: processes.find(p => p.id === 'p1')?.name || 'Producto estándar' },
    { id: 'vta-002', processId: 'p3', processName: processes.find(p => p.id === 'p3')?.name || 'Producto especial con Ingeniería Adaptada' },
    { id: 'vta-003', processId: 'p4', processName: processes.find(p => p.id === 'p4')?.name || 'Producto especial con Ingeniería a medida' },
  ]);
  const [saleCounter, setSaleCounter] = useState(4); // Inicia el contador para el próximo ID (vta-004)
  // <<< FIN DEL NUEVO ESTADO


  // FUNCIÓN PARA AGREGAR NUEVAS VENTAS
  const addSale = (processId: string, processName: string) => {
    const newId = `vta-${String(saleCounter).padStart(3, '0')}`;
    const newSale: SalesInstance = {
        id: newId,
        processId: processId,
        processName: processName,
    };
    setSalesInstances(prev => [...prev, newSale]);
    setSaleCounter(prev => prev + 1);
    toast.info(`Nueva venta (${newId}) agregada al proceso: ${processName}`);
  };

  // FUNCIÓN PARA ELIMINAR VENTAS
  const removeSale = (saleId: string) => {
    setSalesInstances(prev => prev.filter(sale => sale.id !== saleId));
    
    // Limpieza de fieldData asociado a la venta eliminada (Crucial para no dejar "basura" de datos)
    setFieldData(prev => {
        const { [saleId]: _, ...rest } = prev;
        return rest;
    });
    toast.warning(`Venta ${saleId} eliminada.`);
  };


  // FUNCIÓN ACTUALIZADA: USA saleId como clave
  const isStageComplete = (saleId: string, stageIndex: number, fields: string[]) => {
    // Usamos el saleId como clave principal para buscar los datos de ESTA venta
    const stageData = fieldData[saleId]?.[stageIndex]; 
    if (!stageData) return false;
    
    return fields.every(field => {
      const isYesNoField = field.includes("[SI/NO]");
      const key = isYesNoField ? field.replace(" [SI/NO]", "") : field;
      return stageData[key] && stageData[key].trim() !== "";
    });
  };

  // FUNCIÓN ACTUALIZADA: USA saleId como clave
  const handleSaveFields = () => {
    if (!selectedStage) return;

    const saleId = selectedStage.processId; // selectedStage.processId AHORA CONTIENE el saleId

    const newFieldData = { ...fieldData };
    if (!newFieldData[saleId]) {
      newFieldData[saleId] = {};
    }
    if (!newFieldData[saleId][selectedStage.stageIndex]) {
      newFieldData[saleId][selectedStage.stageIndex] = {};
    }

    // El formValues ya usa las claves limpias (sin [SI/NO])
    Object.keys(formValues).forEach(fieldKey => {
      newFieldData[saleId][selectedStage.stageIndex][fieldKey] = formValues[fieldKey];
    });

    setFieldData(newFieldData);
    toast.success("Campos guardados correctamente");
    setSelectedStage(null);
    setFormValues({});
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* =================================== */}
      {/* HEADER y ThemeToggle */}
      {/* =================================== */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* INICIO DEL BLOQUE VULCANO (Solo Título) */}
            <h1 
              className="text-3xl font-black"
              style={{ color: '#F46917', fontFamily: 'Arial, sans-serif' }}
            >
              Proceso de Venta Vulcano
            </h1>
            {/* FIN DEL BLOQUE VULCANO */}
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* =================================== */}
      {/* CONTENIDO PRINCIPAL */}
      {/* =================================== */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Mapeamos sobre los procesos ESTÁTICOS para mostrar la tarjeta contenedora y el botón */}
          {processes.map((process) => {
            const isExpanded = expandedProcess === process.id;
            
            // Filtramos las ventas que corresponden a ESTE proceso
            const salesForThisProcess = salesInstances.filter(sale => sale.processId === process.id);

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
                  {/* MODIFICACIÓN: AÑADIMOS w-52 AL CONTENEDOR DEL TÍTULO */}
                  <CardTitle className="text-xl font-bold flex items-center gap-3 w-[520px]"> 
                    {process.name}
                    <Badge variant="secondary" className="font-normal">
                      {salesForThisProcess.length} Ventas Activas
                    </Badge>
                  </CardTitle>
                  
                  {/* BOTÓN: Nueva Venta */}
                  <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                          e.stopPropagation(); 
                          addSale(process.id, process.name);
                      }}
                  >
                      Nueva Venta
                  </Button>
                  
                  <Button variant="ghost" size="icon">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

                {/* CONTENIDO EXPANDIDO: Mapeamos las ventas activas */}
                {isExpanded && salesForThisProcess.map(sale => {
                    const saleProcess = processes.find(p => p.id === sale.processId);
                    
                    if (!saleProcess) return null;

                    return (
                        <div key={sale.id} className="border-t border-border/50 bg-background/50 pt-4 pb-6 px-6">
                            <div className="flex items-center justify-between mb-4">
                                {/* Etiqueta de la Venta (ID) */}
                                {/*
                                <span className="text-sm font-bold text-foreground/80">
                                    Instancia de Venta: {sale.id}
                                </span>
                                */}
                                {/* BOTÓN: ELIMINAR VENTA (Punto 1) */}
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => removeSale(sale.id)}
                                >
                                    <X className="w-4 h-4 mr-1" /> Eliminar
                                </Button>
                            </div>
                            
                            {/* FILA DE ETAPAS */}
                            <div className="flex items-stretch gap-4 overflow-x-auto pb-4">
                                {saleProcess.stages.map((stage, index) => {
                                    // isComplete y cardClasses (Punto 3)
                                    const isComplete = isStageComplete(sale.id, index, stage.fields);
                                    const cardClasses = isComplete 
                                      ? "bg-stage-complete/20 border-stage-complete" 
                                      : "bg-stage-pending/20 border-stage-pending";

                                    // Obtenemos los datos cargados para mostrar en la tarjeta
                                    const currentData = fieldData[sale.id]?.[index] || {};
                                    
                                    return (
                                        <div key={index} className="flex items-center gap-4 flex-shrink-0 h-full">
                                            {/* Stage Card */}
                                            <Card
                                                className={`${cardClasses} border-2 min-w-[220px] cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 h-full`}
                                                onClick={() => {
                                                    // Usamos sale.id como processId para el estado selectedStage
                                                    const initialValues: { [key: string]: string } = {};
                                                    stage.fields.forEach(field => {
                                                      const isYesNoField = field.includes("[SI/NO]");
                                                      const key = isYesNoField ? field.replace(" [SI/NO]", "") : field;
                                                      initialValues[key] = currentData[key] || "";
                                                    });
                                                    setFormValues(initialValues);
                                                    setSelectedStage({ 
                                                        processId: sale.id, // AHORA ES sale.id
                                                        processName: sale.processName, 
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
                                                    {/* Bloque de campos con valores cargados (Punto 2) */}
                                                    <ul className="space-y-0.5" style={{ paddingLeft: 0, listStyleType: 'none' }}>
                                                        {stage.fields.map((field, idx) => {
                                                            const key = field.includes("[SI/NO]") ? field.replace(" [SI/NO]", "") : field;
                                                            const value = currentData[key];
                                                            return (
                                                                <li key={idx} className="text-xs">
                                                                    {value ? 
                                                                        <span className="font-medium text-foreground">
                                                                            {key}: <span className="font-normal text-muted-foreground">{value}</span>
                                                                        </span> 
                                                                        : field
                                                                    }
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>

                                                    {/* Bloque de aplicaciones */}
                                                    {stage.apps.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {stage.apps.map((app, idx) => {
                                                                const { style, className: appClass } = getAppStyles(app);
                                                                return (
                                                                    <Badge
                                                                        key={idx}
                                                                        variant="outline"
                                                                        className={cn("text-[9px] px-1.5 py-0 h-4", appClass)}
                                                                        style={style}
                                                                    >
                                                                        {app}
                                                                    </Badge>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {/* Arrow */}
                                            {index < saleProcess.stages.length - 1 && (
                                                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
              </Card>
            );
          })}
        </div>
      </main>

      {/* =================================== */}
      {/* MODAL DE ENTRADA DE DATOS */}
      {/* =================================== */}
      <Dialog
        open={!!selectedStage}
        onOpenChange={() => {
          setSelectedStage(null);
          setFormValues({});
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedStage?.stage.title} - {selectedStage?.processName}
            </DialogTitle>
            <DialogDescription>
              Instancia: {selectedStage?.processId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
{/* 1. Bloque de campos (CON LÓGICA DE FECHA CORREGIDA) */}
            <div className="space-y-4">
              {selectedStage?.stage.fields.map((field, idx) => {
                // Detección de tipos de campo
                const isYesNoField = field.includes("[SI/NO]");
                const isDateField = field.includes("Fecha"); // <-- LÍNEA AÑADIDA
                
                // Clave limpia para la etiqueta y el estado del formulario
                const cleanField = isYesNoField ? field.replace(" [SI/NO]", "") : field;
                const formKey = cleanField;

                return (
                  <div key={idx} className="grid gap-2">
                    <Label htmlFor={`field-${idx}`}>{cleanField}</Label>
                    
                    {isYesNoField ? (
                      // (Bloque Select se mantiene igual)
                      <Select
                        value={formValues[formKey] || ""}
                        onValueChange={(value) => setFormValues(prev => ({
                          ...prev,
                          [formKey]: value
                        }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SI">SI</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      // (Bloque Input modificado)
                      <Input
                        id={`field-${idx}`}
                        type={isDateField ? "date" : "text"} // <-- LÓGICA APLICADA
                        value={formValues[formKey] || ""}
                        onChange={(e) => setFormValues(prev => ({
                          ...prev,
                          [formKey]: e.target.value
                        }))}
                        placeholder={cleanField}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Bloque de aplicaciones (Estilos Condicionales) */}
            {selectedStage?.stage.apps && selectedStage.stage.apps.length > 0 && (
              <div className="flex flex-wrap gap-2"> 
                {selectedStage.stage.apps.map((app, idx) => {
                  const { style, className: appClass } = getAppStyles(app); 
                  return (
                    <Badge
                      key={idx}
                      variant="outline"
                      className={cn("text-sm", appClass)}
                      style={style}
                    >
                      {app}
                    </Badge>
                  );
                })}
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