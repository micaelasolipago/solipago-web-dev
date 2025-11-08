import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

interface FieldValue {
  [key: string]: string;
}

interface ProcessData {
  [processId: string]: FieldValue;
}

const ProcessVisualizer = () => {
  const [processData, setProcessData] = useState<ProcessData>({
    standard: {},
    adapted: {},
    custom: {},
  });

  const handleFieldChange = (processId: string, fieldName: string, value: string) => {
    setProcessData(prev => ({
      ...prev,
      [processId]: {
        ...prev[processId],
        [fieldName]: value,
      },
    }));
  };

  const handleNewSale = (processName: string) => {
    toast.success(`Nueva venta iniciada para ${processName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Gestión de Pedidos - Solipago
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          
          {/* Producto Estándar */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Producto Estándar</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {/* Ventas */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="std-cliente" className="text-sm font-semibold">Nombre del Cliente:</Label>
                      <Input 
                        id="std-cliente"
                        value={processData.standard['std-cliente'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-cliente', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-producto" className="text-sm font-semibold">Nombre del Producto:</Label>
                      <Input 
                        id="std-producto"
                        value={processData.standard['std-producto'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-producto', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-fecha-requerida" className="text-sm font-semibold">Fecha de entrega requerida:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-requerida"
                        value={processData.standard['std-fecha-requerida'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-requerida', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-usuario-ventas" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="std-usuario-ventas"
                        value={processData.standard['std-usuario-ventas'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-usuario-ventas', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Producción | PCP */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Producción | PCP</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="std-fecha-inicio-prod" className="text-sm font-semibold">Fecha inicio Producción:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-inicio-prod"
                        value={processData.standard['std-fecha-inicio-prod'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-inicio-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-fecha-fin-prod" className="text-sm font-semibold">Fecha fin Producción:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-fin-prod"
                        value={processData.standard['std-fecha-fin-prod'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-fin-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-usuario-prod" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="std-usuario-prod"
                        value={processData.standard['std-usuario-prod'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-usuario-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ventas Final */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="std-fecha-rechazo" className="text-sm font-semibold">Fecha rechazo:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-rechazo"
                        value={processData.standard['std-fecha-rechazo'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-rechazo', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-fecha-activacion" className="text-sm font-semibold">Fecha activación del pedido:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-activacion"
                        value={processData.standard['std-fecha-activacion'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-activacion', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-fecha-final" className="text-sm font-semibold">Fecha de entrega final:</Label>
                      <Input 
                        type="date"
                        id="std-fecha-final"
                        value={processData.standard['std-fecha-final'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-fecha-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="std-usuario-ventas-final" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="std-usuario-ventas-final"
                        value={processData.standard['std-usuario-ventas-final'] || ''}
                        onChange={(e) => handleFieldChange('standard', 'std-usuario-ventas-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4"
                size="lg"
                onClick={() => handleNewSale('Producto Estándar')}
              >
                + Nueva venta
              </Button>
            </div>
          </Card>

          {/* Producto Especial con Ingeniería Adaptada */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Producto Especial con Ingeniería Adaptada</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {/* Ventas */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="adapt-cliente" className="text-sm font-semibold">Nombre del Cliente:</Label>
                      <Input 
                        id="adapt-cliente"
                        value={processData.adapted['adapt-cliente'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-cliente', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-producto" className="text-sm font-semibold">Nombre del Producto:</Label>
                      <Input 
                        id="adapt-producto"
                        value={processData.adapted['adapt-producto'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-producto', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-requerida" className="text-sm font-semibold">Fecha de entrega requerida:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-requerida"
                        value={processData.adapted['adapt-fecha-requerida'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-requerida', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-usuario-ventas" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="adapt-usuario-ventas"
                        value={processData.adapted['adapt-usuario-ventas'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-usuario-ventas', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ingeniería */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ingeniería</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="adapt-factibilidad" className="text-sm font-semibold">Factibilidad [SI/NO]:</Label>
                      <Select 
                        value={processData.adapted['adapt-factibilidad'] || ''}
                        onValueChange={(value) => handleFieldChange('adapted', 'adapt-factibilidad', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-inicio-diseno" className="text-sm font-semibold">Fecha inicio Diseño:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-inicio-diseno"
                        value={processData.adapted['adapt-fecha-inicio-diseno'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-inicio-diseno', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-fin-diseno" className="text-sm font-semibold">Fecha fin Diseño:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-fin-diseno"
                        value={processData.adapted['adapt-fecha-fin-diseno'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-fin-diseno', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-usuario-ing" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="adapt-usuario-ing"
                        value={processData.adapted['adapt-usuario-ing'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-usuario-ing', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Administración */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Administración</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="adapt-costo" className="text-sm font-semibold">Costo informado [SI/NO]:</Label>
                      <Select 
                        value={processData.adapted['adapt-costo'] || ''}
                        onValueChange={(value) => handleFieldChange('adapted', 'adapt-costo', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-usuario-admin" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="adapt-usuario-admin"
                        value={processData.adapted['adapt-usuario-admin'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-usuario-admin', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Producción | PCP */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Producción | PCP</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="adapt-fecha-inicio-prod" className="text-sm font-semibold">Fecha inicio Producción:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-inicio-prod"
                        value={processData.adapted['adapt-fecha-inicio-prod'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-inicio-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-fin-prod" className="text-sm font-semibold">Fecha fin Producción:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-fin-prod"
                        value={processData.adapted['adapt-fecha-fin-prod'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-fin-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-usuario-prod" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="adapt-usuario-prod"
                        value={processData.adapted['adapt-usuario-prod'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-usuario-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ventas Final */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="adapt-fecha-rechazo" className="text-sm font-semibold">Fecha rechazo:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-rechazo"
                        value={processData.adapted['adapt-fecha-rechazo'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-rechazo', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-activacion" className="text-sm font-semibold">Fecha activación del pedido:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-activacion"
                        value={processData.adapted['adapt-fecha-activacion'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-activacion', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-fecha-final" className="text-sm font-semibold">Fecha de entrega final:</Label>
                      <Input 
                        type="date"
                        id="adapt-fecha-final"
                        value={processData.adapted['adapt-fecha-final'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-fecha-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adapt-usuario-ventas-final" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="adapt-usuario-ventas-final"
                        value={processData.adapted['adapt-usuario-ventas-final'] || ''}
                        onChange={(e) => handleFieldChange('adapted', 'adapt-usuario-ventas-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4"
                size="lg"
                onClick={() => handleNewSale('Producto Especial con Ingeniería Adaptada')}
              >
                + Nueva venta
              </Button>
            </div>
          </Card>

          {/* Producto especial con Ingeniería a medida */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Producto especial con Ingeniería a medida</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {/* Ventas */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-cliente" className="text-sm font-semibold">Nombre del Cliente:</Label>
                      <Input 
                        id="medida-cliente"
                        value={processData.custom['medida-cliente'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-cliente', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-producto" className="text-sm font-semibold">Nombre del Producto:</Label>
                      <Input 
                        id="medida-producto"
                        value={processData.custom['medida-producto'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-producto', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-requerida" className="text-sm font-semibold">Fecha de entrega requerida:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-requerida"
                        value={processData.custom['medida-fecha-requerida'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-requerida', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-ventas" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-ventas"
                        value={processData.custom['medida-usuario-ventas'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-ventas', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ingeniería */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ingeniería</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-factibilidad-ing" className="text-sm font-semibold">Factibilidad [SI/NO]:</Label>
                      <Select 
                        value={processData.custom['medida-factibilidad-ing'] || ''}
                        onValueChange={(value) => handleFieldChange('custom', 'medida-factibilidad-ing', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-inicio-diseno" className="text-sm font-semibold">Fecha inicio Diseño:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-inicio-diseno"
                        value={processData.custom['medida-fecha-inicio-diseno'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-inicio-diseno', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-fin-diseno" className="text-sm font-semibold">Fecha fin Diseño:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-fin-diseno"
                        value={processData.custom['medida-fecha-fin-diseno'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-fin-diseno', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-ing" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-ing"
                        value={processData.custom['medida-usuario-ing'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-ing', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Producción | PCP */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Producción | PCP</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-factibilidad-prod" className="text-sm font-semibold">Factibilidad [SI/NO]:</Label>
                      <Select 
                        value={processData.custom['medida-factibilidad-prod'] || ''}
                        onValueChange={(value) => handleFieldChange('custom', 'medida-factibilidad-prod', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-inicio-prod" className="text-sm font-semibold">Fecha inicio Producción:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-inicio-prod"
                        value={processData.custom['medida-fecha-inicio-prod'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-inicio-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-fin-prod" className="text-sm font-semibold">Fecha fin Producción:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-fin-prod"
                        value={processData.custom['medida-fecha-fin-prod'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-fin-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-prod" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-prod"
                        value={processData.custom['medida-usuario-prod'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-prod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Administración */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Administración</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-costo" className="text-sm font-semibold">Costo informado [SI/NO]:</Label>
                      <Select 
                        value={processData.custom['medida-costo'] || ''}
                        onValueChange={(value) => handleFieldChange('custom', 'medida-costo', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-admin" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-admin"
                        value={processData.custom['medida-usuario-admin'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-admin', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Directorio */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Directorio</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-ok-directorio" className="text-sm font-semibold">Ok para avanzar [SI/NO]:</Label>
                      <Select 
                        value={processData.custom['medida-ok-directorio'] || ''}
                        onValueChange={(value) => handleFieldChange('custom', 'medida-ok-directorio', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Seleccionar--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">SI</SelectItem>
                          <SelectItem value="no">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-directorio" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-directorio"
                        value={processData.custom['medida-usuario-directorio'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-directorio', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ventas Final */}
                <div className="flex-1 min-w-[250px] border border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-bold mb-4 text-lg">Ventas</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medida-fecha-rechazo" className="text-sm font-semibold">Fecha rechazo:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-rechazo"
                        value={processData.custom['medida-fecha-rechazo'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-rechazo', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-activacion" className="text-sm font-semibold">Fecha activación del pedido:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-activacion"
                        value={processData.custom['medida-fecha-activacion'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-activacion', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-fecha-final" className="text-sm font-semibold">Fecha de entrega final:</Label>
                      <Input 
                        type="date"
                        id="medida-fecha-final"
                        value={processData.custom['medida-fecha-final'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-fecha-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medida-usuario-ventas-final" className="text-sm font-semibold">Usuario:</Label>
                      <Input 
                        id="medida-usuario-ventas-final"
                        value={processData.custom['medida-usuario-ventas-final'] || ''}
                        onChange={(e) => handleFieldChange('custom', 'medida-usuario-ventas-final', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4"
                size="lg"
                onClick={() => handleNewSale('Producto especial con Ingeniería a medida')}
              >
                + Nueva venta
              </Button>
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default ProcessVisualizer;
