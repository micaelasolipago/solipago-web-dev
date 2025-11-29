import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  X,
  Save,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import React from "react"; // Importar React para React.FormEvent

// ===================================
// MAPA DE TRADUCCIÓN (DB -> Frontend)
// ===================================
const dbToFrontendMap: Record<string, string> = {
  // Ventas Inicial
  cliente_nombre: "Nombre del Cliente",
  producto_nombre: "Nombre del Producto",
  fecha_entrega_requerida: "Fecha de entrega requerida",
  usuario_ventas_inicial: "Usuario Ventas Inicial",

  // Ingeniería
  ingenieria_factibilidad: "Factibilidad [SI/NO]",
  fecha_inicio_diseno: "Fecha inicio Diseño",
  fecha_fin_diseno: "Fecha fin Diseño",
  usuario_ingenieria: "Usuario Ingeniería",

  // Administración
  admin_costo_informado: "Costo informado [SI/NO]",
  fecha_disponibilidad_materiales: "Fecha disponibilidad materiales",
  usuario_administracion: "Usuario Administración",

  // Producción | PCP
  produccion_factibilidad: "Factibilidad [SI/NO]",
  fecha_inicio_produccion: "Fecha inicio Producción",
  fecha_fin_produccion: "Fecha fin Producción",
  usuario_pcp: "Usuario PCP",

  // Directorio
  directorio_ok_avanzar: "Ok para avanzar [SI/NO]",
  usuario_directorio: "Usuario Directorio",

  // Ventas Final
  fecha_rechazo: "Fecha rechazo",
  fecha_activacion_pedido: "Fecha activación del pedido",
  fecha_entrega_final: "Fecha de entrega final",
  usuario_ventas_final: "Usuario Ventas Final",
};

// ===================================
// 1. INTERFACES
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
  [saleId: string]: {
    [stageIndex: number]: {
      [fieldName: string]: string;
    };
  };
}

interface SalesInstance {
  id: string;
  processId: string;
  processName: string;
}

// NUEVA INTERFAZ PARA EL ESTADO DEL USUARIO
interface UserState {
  name: string | null;
}

// ===================================
// 2. DATA ESTÁTICA
// ===================================

const processes: Process[] = [
  {
    id: "p1",
    name: "Producto estándar",
    stages: [
      {
        title: "Ventas Inicial",
        fields: [
          "Nombre del Cliente",
          "Nombre del Producto",
          "Fecha de entrega requerida",
          "Usuario Ventas Inicial",
        ],
        apps: [],
      },
      {
        title: "Producción | PCP",
        fields: [
          "Fecha inicio Producción",
          "Fecha fin Producción",
          "Usuario PCP",
        ],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Ventas Final",
        fields: [
          "Fecha rechazo",
          "Fecha activación del pedido",
          "Fecha de entrega final",
          "Usuario Ventas Final",
        ],
        apps: ["Bejerman ERP"],
      },
    ],
  },
  {
    id: "p3",
    name: "Producto especial con ingeniería adaptada",
    stages: [
      {
        title: "Ventas Inicial",
        fields: [
          "Nombre del Cliente",
          "Nombre del Producto",
          "Fecha de entrega requerida",
          "Usuario Ventas Inicial",
        ],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: [
          "Factibilidad [SI/NO]",
          "Fecha inicio Diseño",
          "Fecha fin Diseño",
          "Usuario Ingeniería",
        ],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Administración",
        fields: [
          "Costo informado [SI/NO]",
          "Fecha disponibilidad materiales",
          "Usuario Administración",
        ],
        apps: ["Bejerman ERP"],
      },
      {
        title: "Producción | PCP",
        fields: [
          "Fecha inicio Producción",
          "Fecha fin Producción",
          "Usuario PCP",
        ],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Ventas Final",
        fields: [
          "Fecha rechazo",
          "Fecha activación del pedido",
          "Fecha de entrega final",
          "Usuario Ventas Final",
        ],
        apps: ["Bejerman ERP"],
      },
    ],
  },
  {
    id: "p4",
    name: "Producto especial con ingeniería a medida",
    stages: [
      {
        title: "Ventas Inicial",
        fields: [
          "Nombre del Cliente",
          "Nombre del Producto",
          "Fecha de entrega requerida",
          "Usuario Ventas Inicial",
        ],
        apps: [],
      },
      {
        title: "Ingeniería",
        fields: [
          "Factibilidad [SI/NO]",
          "Fecha inicio Diseño",
          "Fecha fin Diseño",
          "Usuario Ingeniería",
        ],
        apps: ["SIEMENS Teamcenter"],
      },
      {
        title: "Producción | PCP",
        fields: [
          "Factibilidad [SI/NO]",
          "Fecha inicio Producción",
          "Fecha fin Producción",
          "Usuario PCP",
        ],
        apps: ["SIEMENS Opcenter SC"],
      },
      {
        title: "Administración",
        fields: [
          "Costo informado [SI/NO]",
          "Fecha disponibilidad materiales",
          "Usuario Administración",
        ],
        apps: ["Bejerman ERP"],
      },
      {
        title: "Directorio",
        fields: ["Ok para avanzar [SI/NO]", "Usuario Directorio"],
        apps: [],
      },
      {
        title: "Ventas Final",
        fields: [
          "Fecha rechazo",
          "Fecha activación del pedido",
          "Fecha de entrega final",
          "Usuario Ventas Final",
        ],
        apps: ["Bejerman ERP"],
      },
    ],
  },
];

// ===================================
// 3. ESTILOS Y UTILIDADES
// ===================================

const getAppStyles = (appName: string): { className?: string } => {
  switch (appName.toLowerCase()) {
    case "solidworks":
    case "inventor":
    case "nx cad":
      return {
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
      };
    case "erp":
    case "sap ariba":
    case "bejerman erp":
      return {
        className:
          "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
      };
    case "wms":
    case "sharepoint":
      return {
        className:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      };
    case "metrología":
    case "control de calidad":
      return {
        className:
          "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
      };
    case "siemens opcenter sc":
    case "siemens teamcenter":
      return {
        className:
          "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
      };
    default:
      return {
        className:
          "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
      };
  }
};

// -----------------------------------
// NUEVO: Componente para la pantalla de Login
// -----------------------------------
const LoginComponent = ({
  onLoginSuccess,
}: {
  onLoginSuccess: (userName: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Bienvenido, ${data.user}.`);
        onLoginSuccess(data.user); // Llama a la función de éxito para actualizar el estado principal
      } else {
        setError(data.error || "Error de conexión con el servidor.");
        toast.error(data.error || "Error al iniciar sesión.");
      }
    } catch (err) {
      console.error("Error de red durante el login:", err);
      setError("Error de red. Intente más tarde.");
      toast.error("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600 font-extrabold tracking-wide">
            Vulcano Login ⚙️
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ingrese sus credenciales para acceder al sistema.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="ingrese su usuario"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="ingrese su contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// ===================================
// 4. COMPONENTE PRINCIPAL
// ===================================

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

  // NUEVO ESTADO DE USUARIO
  const [currentUser, setCurrentUser] = useState<UserState>({ name: null });

  const [salesInstances, setSalesInstances] = useState<SalesInstance[]>([
    {
      id: "vta-001",
      processId: "p1",
      processName:
        processes.find((p) => p.id === "p1")?.name || "Producto estándar",
    },
    {
      id: "vta-002",
      processId: "p3",
      processName:
        processes.find((p) => p.id === "p3")?.name ||
        "Producto especial con Ingeniería Adaptada",
    },
    {
      id: "vta-003",
      processId: "p4",
      processName:
        processes.find((p) => p.id === "p4")?.name ||
        "Producto especial con Ingeniería a medida",
    },
  ]);
  const [saleCounter, setSaleCounter] = useState(4);

  // NUEVO: Cargar sesión desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem("vulcanoUser");
    if (storedUser) {
      setCurrentUser({ name: storedUser });
    }
    // NOTA: Esta useEffect solo corre una vez al montar, sin dependencias.
  }, []);

  useEffect(() => {
    // Si el usuario no está logueado, no intentamos hacer fetch de ventas
    if (!currentUser.name) return;

    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ventas");
        if (!response.ok) throw new Error("Error al conectar con el servidor");

        const data = await response.json();

        // 1. Reconstruir SalesInstances
        const loadedInstances: SalesInstance[] = data.map((row: any) => ({
          id: row.id,
          processId: row.process_id,
          processName: row.process_name || "Proceso Desconocido",
        }));
        setSalesInstances(loadedInstances);

        // 2. Reconstruir FieldData (Mapeo complejo DB -> Estructura Visual)
        const loadedFieldData: FieldData = {};

        data.forEach((row: any) => {
          loadedFieldData[row.id] = {};

          // Encontrar el proceso para saber qué etapas tiene
          const processDef = processes.find((p) => p.id === row.process_id);
          if (!processDef) return;

          processDef.stages.forEach((stage, stageIndex) => {
            loadedFieldData[row.id][stageIndex] = {};

            // Buscar si las columnas de la DB tienen valores para los campos de esta etapa
            Object.entries(dbToFrontendMap).forEach(
              ([dbCol, frontendField]) => {
                // Si la etapa actual usa este campo y la fila tiene un valor...
                // (Nota: manejamos la duplicidad de "Factibilidad" verificando si el campo pertenece a la etapa)
                const cleanField = frontendField.replace(" [SI/NO]", "");
                if (
                  stage.fields.some((f) => f.includes(cleanField)) &&
                  row[dbCol]
                ) {
                  loadedFieldData[row.id][stageIndex][cleanField] = row[dbCol];
                }
              }
            );
          });
        });

        setFieldData(loadedFieldData);

        // Actualizar el contador para que no se repitan IDs nuevos
        if (loadedInstances.length > 0) {
          const maxId = Math.max(
            ...loadedInstances.map((s) => {
              // Extraer solo la parte numérica (e.g., de 'vta-004' obtener 4)
              const numPart = s.id.split("-").pop();
              return parseInt(numPart || "0", 10) || 0;
            })
          );
          // Aseguramos que el próximo ID a generar sea el siguiente número.
          setSaleCounter(maxId + 1);
        } else {
          // Si no hay ventas, reiniciamos el contador a 1.
          setSaleCounter(1);
        }
      } catch (error) {
        console.error("Error cargando ventas:", error);
        toast.error("No se pudo conectar con el servidor de base de datos");
      }
    };

    fetchSales();
  }, [currentUser.name]); // Dependencia agregada para recargar al iniciar sesión

  const addSale = async (processId: string, processName: string) => {
    const newId = `vta-${String(saleCounter).padStart(3, "0")}`;

    try {
      // 1. Guardar en Base de Datos
      const response = await fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newId,
          processId: processId,
          processName: processName,
        }),
      });

      if (!response.ok) throw new Error("Error al crear venta en DB");

      // 2. Actualizar estado local (solo si la DB respondió OK)
      const newSale: SalesInstance = {
        id: newId,
        processId: processId,
        processName: processName,
      };
      setSalesInstances((prev) => [...prev, newSale]);
      setSaleCounter((prev) => prev + 1);
      toast.info(`Nueva venta (${newId}) creada en base de datos.`);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la venta. Verifique la conexión.");
    }
  };

  const removeSale = async (saleId: string) => {
    // Confirmación simple antes de borrar (opcional pero recomendada)
    if (
      !window.confirm(
        `¿Estás seguro de que quieres eliminar la venta ${saleId} permanentemente?`
      )
    ) {
      return;
    }

    try {
      // 1. Borrar en Base de Datos
      const response = await fetch(
        `http://localhost:3000/api/ventas/${saleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar en DB");

      // 2. Si salió bien, actualizar el estado visual
      setSalesInstances((prev) => prev.filter((sale) => sale.id !== saleId));
      setFieldData((prev) => {
        const { [saleId]: _, ...rest } = prev;
        return rest;
      });

      toast.success(`Venta ${saleId} eliminada correctamente.`);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar. Intente nuevamente.");
    }
  };

  const isStageComplete = (
    saleId: string,
    stageIndex: number,
    fields: string[]
  ) => {
    const stageData = fieldData[saleId]?.[stageIndex];
    if (!stageData) return false;

    // Identificar si es la etapa 'Ventas Final'
    const processId = salesInstances.find((s) => s.id === saleId)?.processId;
    const isFinalStage =
      processes.find((p) => p.id === processId)?.stages[stageIndex].title ===
      "Ventas Final";

    // Lógica para todos los campos de la etapa (excepto los bifurcados que chequearemos aparte)
    const allOtherFieldsComplete = fields.every((field) => {
      const isYesNoField = field.includes("[SI/NO]");
      const key = isYesNoField ? field.replace(" [SI/NO]", "") : field;

      const fechaRechazoKey = "Fecha rechazo";
      const fechaActivacionKey = "Fecha activación del pedido";
      const fechaEntregaFinalKey = "Fecha de entrega final";
      const usuarioFinalKey = "Usuario Ventas Final"; // El usuario final debe estar siempre.

      // Si estamos en Ventas Final, ignoramos los campos de bifurcación en este primer chequeo
      if (
        isFinalStage &&
        (key === fechaRechazoKey ||
          key === fechaActivacionKey ||
          key === fechaEntregaFinalKey)
      ) {
        return true;
      }

      // Chequeo estándar: el campo debe tener valor.
      return stageData[key] && stageData[key].trim() !== "";
    });

    // Lógica ESPECIAL para Ventas Final
    if (isFinalStage) {
      const fechaRechazoKey = "Fecha rechazo";
      const fechaActivacionKey = "Fecha activación del pedido";
      const fechaEntregaFinalKey = "Fecha de entrega final";
      const usuarioFinalKey = "Usuario Ventas Final";

      const rechazoLleno = !!stageData[fechaRechazoKey];
      const activacionLleno = !!stageData[fechaActivacionKey];
      const entregaLleno = !!stageData[fechaEntregaFinalKey];
      const usuarioLleno = !!stageData[usuarioFinalKey];

      // -----------------------------------------------------
      // CONDICIÓN 1: RECHAZO (XOR)
      // Fecha rechazo lleno Y (Fecha activación y Fecha entrega final) VACÍOS
      const isRejectedComplete =
        rechazoLleno && !activacionLleno && !entregaLleno && usuarioLleno;

      // -----------------------------------------------------
      // CONDICIÓN 2: ACTIVACIÓN + ENTREGA (XOR)
      // (Fecha activación Y Fecha entrega final) LLENOS Y Fecha rechazo VACÍO
      const isActivatedComplete =
        !rechazoLleno && activacionLleno && entregaLleno && usuarioLleno;

      // -----------------------------------------------------
      // El proceso está completo si cumple una de las dos condiciones
      const isBifurcationValid = isRejectedComplete || isActivatedComplete;

      // La etapa final está completa si:
      // 1. La bifurcación es válida.
      // 2. Todos los demás campos (que no son los de fecha/bifurcación) están completos.
      return isBifurcationValid && allOtherFieldsComplete;
    }

    // Lógica estándar para TODAS LAS DEMÁS etapas
    return allOtherFieldsComplete;
  };

  // NUEVA FUNCIÓN: Verifica si TODAS las etapas están completas.
  const isSaleFullyComplete = (saleId: string, process: Process) => {
    // Si la venta no tiene datos cargados, no está completa.
    if (!fieldData[saleId]) return false;

    // Iterar sobre TODAS las etapas del proceso
    return process.stages.every((stage, stageIndex) => {
      // Reutiliza la función isStageComplete para cada etapa
      return isStageComplete(saleId, stageIndex, stage.fields);
    });
  };

  // Función de cierre (AHORA LLAMA AL BACKEND PARA MARCAR COMO CERRADA)
  const completeSale = async (saleId: string) => {
    if (
      !window.confirm(
        `¿Estás seguro de que quieres CERRAR la venta ${saleId}? Esto la marcará como archivada y la quitará de la vista para todos los usuarios.`
      )
    ) {
      return;
    }

    try {
      // 1. LLAMAR AL BACKEND PARA MARCAR is_closed = TRUE
      const response = await fetch(
        `http://localhost:3000/api/ventas/${saleId}/close`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) throw new Error("Error al marcar como cerrada en DB");

      // 2. Si salió bien en el backend, quitar de la vista (Frontend)
      setSalesInstances((prev) => prev.filter((sale) => sale.id !== saleId));
      setFieldData((prev) => {
        const { [saleId]: _, ...rest } = prev;
        return rest;
      });
      setExpandedProcess(null); // Colapsar por si acaso

      // 3. Notificación
      toast.success(
        `Venta ${saleId} CERRADA. El registro fue conservado en la base de datos.`
      );
    } catch (error) {
      console.error("Error al cerrar venta:", error);
      toast.error("Error al cerrar la venta. Intente nuevamente.");
    }
  };

  const handleSaveFields = async () => {
    if (!selectedStage) return;

    // Nota: El processId en selectedStage en realidad contiene el ID de la Venta (sale.id)
    const saleId = selectedStage.processId;
    const stageName = selectedStage.stage.title;

    try {
      // 1. Guardar en Base de Datos
      const response = await fetch(
        `http://localhost:3000/api/ventas/${saleId}/stage/${encodeURIComponent(
          stageName
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) throw new Error("Error guardando campos");

      // 2. Actualizar estado local (Visualización inmediata)
      const newFieldData = { ...fieldData };
      if (!newFieldData[saleId]) {
        newFieldData[saleId] = {};
      }
      if (!newFieldData[saleId][selectedStage.stageIndex]) {
        newFieldData[saleId][selectedStage.stageIndex] = {};
      }

      Object.keys(formValues).forEach((fieldKey) => {
        newFieldData[saleId][selectedStage.stageIndex][fieldKey] =
          formValues[fieldKey];
      });

      setFieldData(newFieldData);
      toast.success("Campos guardados en base de datos");
      setSelectedStage(null);
      setFormValues({});
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar. Intente nuevamente.");
    }
  };
  const formatValue = (val: string) => {
    if (!val) return "";
    // Si tiene una "T" (formato ISO), cortamos ahí
    if (val.includes("T")) {
      return val.split("T")[0];
    }
    return val;
  };

  // -----------------------------------
  // RENDERIZADO CONDICIONAL DE LOGIN
  // -----------------------------------
  if (!currentUser.name) {
    return (
      <LoginComponent
        onLoginSuccess={(userName) => {
          localStorage.setItem("vulcanoUser", userName); // <-- GUARDAR AQUÍ
          setCurrentUser({ name: userName });
        }}
      />
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER y ThemeToggle */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 tracking-tight truncate">
                Proceso de ventas Vulcano
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">
                Sistema de gestión comercial
              </p>
            </div>
            {/* NUEVO: Mostrar usuario y opción de Logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hola, {currentUser.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("vulcanoUser"); // <-- ELIMINAR AQUÍ
                  setCurrentUser({ name: null }); // Logout
                  setExpandedProcess(null); // Colapsar todo
                  setSalesInstances([]); // Limpiar la vista
                  setFieldData({}); // Limpiar datos
                  toast.info("Sesión cerrada.");
                }}
                className="text-xs sm:text-sm"
              >
                Cerrar Sesión
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-4">
          {processes.map((process) => {
            const isExpanded = expandedProcess === process.id;
            // CORRECCIÓN 1: Filtro correcto usando processId
            const salesForThisProcess = salesInstances.filter(
              (sale) => sale.processId === process.id
            );

            return (
              <Card
                key={process.id}
                className="border hover:border-primary/30 transition-all duration-200 overflow-hidden shadow-sm"
              >
                <CardHeader
                  className="cursor-pointer select-none hover:bg-muted/50 transition-colors py-3 sm:py-4"
                  onClick={() =>
                    setExpandedProcess(isExpanded ? null : process.id)
                  }
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="text-base sm:text-lg font-semibold flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
                      <span className="break-words">{process.name}</span>
                      <Badge
                        variant="secondary"
                        className="font-normal text-xs whitespace-nowrap"
                      >
                        {salesForThisProcess.length}{" "}
                        {salesForThisProcess.length === 1 ? "Venta" : "Ventas"}
                      </Badge>
                    </CardTitle>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addSale(process.id, process.name);
                        }}
                        className="text-xs sm:text-sm"
                      >
                        <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Nueva Venta</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded &&
                  salesForThisProcess.map((sale) => {
                    // CORRECCIÓN 2: Encontrar el proceso base usando processId
                    const saleProcess = processes.find(
                      (p) => p.id === sale.processId
                    );

                    if (!saleProcess) return null;

                    return (
                      <div
                        key={sale.id}
                        className="border-t bg-muted/20 pt-3 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6"
                      >
                        {/* ProcessVisualizer.tsx (Estructura de botones) */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <span className="text-sm font-bold text-foreground/80">
                            {sale.id}
                          </span>
                          {/* === Botones de Acción (Cerrar y Eliminar) === */}
                          <div className="flex gap-2">
                            {/* Botón de Cierre */}
                            <Button
                              variant="default"
                              size="sm"
                              // HABILITAR: Si TODAS las etapas de ese proceso están completas
                              disabled={
                                !isSaleFullyComplete(sale.id, saleProcess)
                              }
                              onClick={() => completeSale(sale.id)}
                              className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                            >
                              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="hidden xs:inline">
                                Cerrar Venta
                              </span>
                            </Button>

                            {/* Botón de Eliminación */}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeSale(sale.id)}
                              className="text-xs sm:text-sm"
                            >
                              <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="hidden xs:inline">Eliminar</span>
                            </Button>
                          </div>
                          {/* =================================================== */}
                        </div>
                        {/* FILA DE ETAPAS */}
                        <div className="flex items-stretch gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                          {saleProcess.stages.map((stage, index) => {
                            const isComplete = isStageComplete(
                              sale.id,
                              index,
                              stage.fields
                            );
                            // Las clases CSS 'bg-stage-complete/20 border-stage-complete' deben estar definidas en tu CSS global o tailwind config.
                            const cardClasses = isComplete
                              ? "bg-stage-complete/20 border-stage-complete"
                              : "bg-stage-pending/20 border-stage-pending";

                            // Data para visualización (fuera del onClick)
                            const currentData =
                              fieldData[sale.id]?.[index] || {};

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 h-full"
                              >
                                <Card
                                  className={`${cardClasses} border min-w-[180px] sm:min-w-[200px] md:min-w-[220px] cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full`}
                                  // CORRECCIÓN 3: onClick blindado
                                  onClick={() => {
                                    setFormValues({});

                                    // IMPORTANTE: Obtener data fresca aquí dentro
                                    const freshData =
                                      fieldData[sale.id]?.[index] || {};

                                    const initialValues: {
                                      [key: string]: string;
                                    } = {};
                                    stage.fields.forEach((field) => {
                                      const isYesNoField =
                                        field.includes("[SI/NO]");
                                      const key = isYesNoField
                                        ? field.replace(" [SI/NO]", "")
                                        : field;
                                      const rawVal = freshData[key] || "";

                                      // === LÓGICA DE AUTO-COMPLETADO ===
                                      if (
                                        key.includes("Usuario") &&
                                        rawVal === "" &&
                                        currentUser.name
                                      ) {
                                        initialValues[key] = currentUser.name;
                                      } else {
                                        initialValues[key] =
                                          formatValue(rawVal);
                                      }
                                      // =================================
                                    });

                                    setFormValues(initialValues);
                                    setSelectedStage({
                                      processId: sale.id, // Esto es el sale.id (vta-00X)
                                      processName: sale.processName,
                                      stageIndex: index,
                                      stage,
                                    });
                                  }}
                                >
                                  <CardHeader className="pb-2 pt-3">
                                    <CardTitle className="text-sm font-semibold">
                                      {stage.title}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2 pb-3">
                                    <ul
                                      className="space-y-0.5"
                                      style={{
                                        paddingLeft: 0,
                                        listStyleType: "none",
                                      }}
                                    >
                                      {stage.fields.map((field, idx) => {
                                        const key = field.includes("[SI/NO]")
                                          ? field.replace(" [SI/NO]", "")
                                          : field;
                                        const rawValue = currentData[key];
                                        const value = formatValue(rawValue);
                                        return (
                                          <li key={idx} className="text-xs">
                                            {value ? (
                                              <span className="font-medium text-foreground">
                                                {key}:{" "}
                                                <span className="font-normal text-muted-foreground">
                                                  {value}
                                                </span>
                                              </span>
                                            ) : (
                                              field
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>

                                    {stage.apps.length > 0 && (
                                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                                        {stage.apps.map((app, idx) => {
                                          const { className: appClass } =
                                            getAppStyles(app);
                                          return (
                                            <Badge
                                              key={idx}
                                              variant="outline"
                                              className={cn(
                                                "text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5",
                                                appClass
                                              )}
                                            >
                                              {app}
                                            </Badge>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                {index < saleProcess.stages.length - 1 && (
                                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
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

      <Dialog
        open={!!selectedStage}
        onOpenChange={() => {
          setSelectedStage(null);
          setFormValues({});
        }}
      >
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {selectedStage?.stage.title} - {selectedStage?.processName}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Instancia: {selectedStage?.processId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
            <div className="space-y-3 sm:space-y-4">
              {selectedStage?.stage.fields.map((field, idx) => {
                const isYesNoField = field.includes("[SI/NO]");
                const isDateField = field.includes("Fecha");

                const cleanField = isYesNoField
                  ? field.replace(" [SI/NO]", "")
                  : field;
                const formKey = cleanField;

                // === LÓGICA DE SOLO LECTURA ===
                const isUserField = formKey.includes("Usuario");
                const isDisabled = isUserField && !!formValues[formKey]; // Deshabilitar si es campo Usuario y ya tiene valor.
                // ===================================

                // Función auxiliar para limpiar la fecha
                return (
                  <div key={idx} className="grid gap-1.5 sm:gap-2">
                    <Label
                      htmlFor={`field-${idx}`}
                      className="text-xs sm:text-sm"
                    >
                      {cleanField}
                      {isDisabled && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-[10px] py-0 px-1 font-normal"
                        >
                          Bloqueado
                        </Badge>
                      )}
                    </Label>

                    {isYesNoField ? (
                      <Select
                        value={formValues[formKey] || ""}
                        onValueChange={(value) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [formKey]: value,
                          }))
                        }
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
                      <Input
                        id={`field-${idx}`}
                        type={isDateField ? "date" : "text"}
                        value={formValues[formKey] || ""}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [formKey]: e.target.value,
                          }))
                        }
                        placeholder={cleanField}
                        // === APLICAR EL ATRIBUTO DISABLED ===
                        disabled={isDisabled}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {selectedStage?.stage.apps &&
              selectedStage.stage.apps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedStage.stage.apps.map((app, idx) => {
                    const { className: appClass } = getAppStyles(app);
                    return (
                      <Badge
                        key={idx}
                        variant="outline"
                        className={cn("text-xs sm:text-sm", appClass)}
                        // CORRECCIÓN 4: Eliminada la propiedad style={style} que daba error
                      >
                        {app}
                      </Badge>
                    );
                  })}
                </div>
              )}

            <div className="flex justify-end gap-2 pt-3 sm:pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStage(null);
                  setFormValues({});
                }}
                className="text-xs sm:text-sm"
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveFields} className="text-xs sm:text-sm">
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
