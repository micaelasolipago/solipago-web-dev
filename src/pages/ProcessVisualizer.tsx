import { useState, useEffect } from "react";
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
  Filter, // Importamos Filter para el ícono de filtros
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

// ===================================
// LISTAS DE VALIDACIÓN EN FRONTEND
// ===================================

const CLIENTE_OPTIONS = [
  "Agroacopio Transportes S.R.L.",
  "Agrosem S.R.L",
  "Agrosilos S.R.L",
  "Avanzar S.A.",
  "Bollo y Cia SA",
  "Calfrac Well Services Argentina S.A.",
  "Castro Matias J.",
  "Cereales Bogliolo S.R.L.",
  "Claverie Pablo A.",
  "Daniela Alanis",
  "Distribuidora Gonzalez S.R.L.",
  "Don Armando Espartillar S.A.",
  "Don Nardo S.A.",
  "Edgardo Valenti",
  "Eskel S.A.",
  "Frathi SRL",
  "G y A Domenech",
  "Granja Kelly S.R.L.",
  "Hormetal",
  "Logistica de Negocios S.A",
  "Marcelo Simon",
  "Praxair Argentina S.R.L.",
  "Siroco S.A (Transporte Carrara)",
  "Transporte Greco SRL",
  "Vitelli Hnos S.A.S",
];

const PRODUCTO_OPTIONS = [
  "Semirremolque Tolva",
  "Carretón Vial",
  "Unidad Especial",
  "Bitren Tolva Módulo Trasero",
  "Bitren Tolva Módulo Delantero",
  "Bitren Portacontenedor Módulo Delantero",
  "Bitren Portacontenedor Módulo Trasero",
  "Bitren Sider Módulo Trasero",
  "Bitren Sider Módulo Delantero",
];

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
  fecha_entrega_final: "Fecha Compromiso",
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

// NUEVA: Interfaz para los datos de la tabla de ventas cerradas
interface ClosedSaleData extends SalesInstance {
  clienteName: string;
  productoName: string;
  fechaEntregaRequerida: string;
  fechaInicioDiseno: string;
  fechaFinDiseno: string;
  fechaDispMateriales: string;
  fechaInicioProduccion: string;
  fechaFinProduccion: string;
  fechaActivacionPedido: string;
  fechaEntregaFinal: string;
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
          "Fecha Compromiso",
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
          "Fecha Compromiso",
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
          "Fecha Compromiso",
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
// COMPONENTE LOGIN
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
        onLoginSuccess(data.user);
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
                autoComplete="new-password"
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

  const [currentUser, setCurrentUser] = useState<UserState>({ name: null });

  // ESTADO PARA VENTAS CERRADAS
  const [closedVentas, setClosedVentas] = useState<ClosedSaleData[]>([]);

  const [salesInstances, setSalesInstances] = useState<SalesInstance[]>([]);
  const [saleCounter, setSaleCounter] = useState(4);

  // Helper para formatear fecha (quitar la T)
  const formatValue = (val: string) => {
    if (!val) return "";
    if (val.includes("T")) {
      return val.split("T")[0];
    }
    return val;
  };

  // -------------------------
  // FUNCIONES DE FETCHING
  // -------------------------

  // Obtener ventas cerradas
  const fetchClosedVentas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/ventas/cerradas`);
      if (!response.ok) {
        throw new Error("Failed to fetch closed ventas");
      }
      const data = await response.json();

      // Mapeamos los datos de la DB a nuestra interfaz ClosedSaleData
      const mappedData: ClosedSaleData[] = data.map((row: any) => ({
        id: row.id,
        processId: row.process_id,
        processName: row.process_name || "Proceso Desconocido",
        clienteName: row.cliente_nombre,
        productoName: row.producto_nombre,
        fechaEntregaRequerida: formatValue(row.fecha_entrega_requerida || ""),
        fechaInicioDiseno: formatValue(row.fecha_inicio_diseno || ""),
        fechaFinDiseno: formatValue(row.fecha_fin_diseno || ""),
        fechaDispMateriales: formatValue(
          row.fecha_disponibilidad_materiales || ""
        ),
        fechaInicioProduccion: formatValue(row.fecha_inicio_produccion || ""),
        fechaFinProduccion: formatValue(row.fecha_fin_produccion || ""),
        fechaActivacionPedido: formatValue(row.fecha_activacion_pedido || ""),
        fechaEntregaFinal: formatValue(row.fecha_entrega_final || ""),
      }));

      setClosedVentas(mappedData);
    } catch (error) {
      console.error("Error fetching closed ventas:", error);
    }
  };

  // Obtener ventas abiertas (activos)
  // Obtener ventas abiertas (activos)
  const fetchSales = async () => {
    try {
      // 1. Fetch sales data (ventas activas)
      const salesResponse = await fetch("http://localhost:3000/api/ventas");
      if (!salesResponse.ok)
        throw new Error("Error al conectar con el servidor de ventas activas");

      const data = await salesResponse.json();

      // 2. NUEVO: Obtener el ID más alto de la base de datos (incluyendo cerradas)
      const maxIdResponse = await fetch(
        "http://localhost:3000/api/ventas/max-id"
      );
      if (!maxIdResponse.ok) throw new Error("Error al obtener el máximo ID");
      const maxIdData = await maxIdResponse.json();
      const nextCounter = maxIdData.maxIdNumber + 1; // El siguiente ID es el máximo + 1

      // 3. Reconstruir SalesInstances
      const loadedInstances: SalesInstance[] = data.map((row: any) => ({
        id: row.id,
        processId: row.process_id,
        processName: row.process_name || "Proceso Desconocido",
      }));
      setSalesInstances(loadedInstances);

      // 4. Reconstruir FieldData
      const loadedFieldData: FieldData = {};

      data.forEach((row: any) => {
        loadedFieldData[row.id] = {};
        const processDef = processes.find((p) => p.id === row.process_id);
        if (!processDef) return;

        processDef.stages.forEach((stage, stageIndex) => {
          loadedFieldData[row.id][stageIndex] = {};
          Object.entries(dbToFrontendMap).forEach(([dbCol, frontendField]) => {
            const cleanField = frontendField.replace(" [SI/NO]", "");
            if (
              stage.fields.some((f) => f.includes(cleanField)) &&
              row[dbCol]
            ) {
              loadedFieldData[row.id][stageIndex][cleanField] = row[dbCol];
            }
          });
        });
      });

      setFieldData(loadedFieldData);

      // 5. Actualizar contador con el valor obtenido del backend
      setSaleCounter(nextCounter); // Usamos el valor máximo + 1 de la DB
    } catch (error) {
      console.error("Error cargando ventas:", error);
      toast.error("No se pudo conectar con el servidor de base de datos");
    }
  };

  // -------------------------
  // USE EFFECTS
  // -------------------------

  useEffect(() => {
    const storedUser = localStorage.getItem("vulcanoUser");
    if (storedUser) {
      setCurrentUser({ name: storedUser });
    }
  }, []);

  useEffect(() => {
    if (!currentUser.name) return;

    fetchSales();
    fetchClosedVentas(); // Cargar también ventas cerradas
  }, [currentUser.name]);

  // -------------------------
  // ACCIONES
  // -------------------------

  const addSale = async (processId: string, processName: string) => {
    const newId = `vta-${String(saleCounter).padStart(3, "0")}`;

    try {
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
    if (
      !window.confirm(
        `¿Estás seguro de que quieres eliminar la venta ${saleId} permanentemente?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/ventas/${saleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar en DB");

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

  const completeSale = async (saleId: string) => {
    if (
      !window.confirm(
        `¿Estás seguro de que quieres CERRAR la venta ${saleId}? Esto la marcará como archivada.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/ventas/${saleId}/close`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) throw new Error("Error al marcar como cerrada en DB");

      // Actualizar frontend
      setSalesInstances((prev) => prev.filter((sale) => sale.id !== saleId));
      setFieldData((prev) => {
        const { [saleId]: _, ...rest } = prev;
        return rest;
      });
      setExpandedProcess(null);

      // Recargar lista cerrada
      fetchClosedVentas();

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
    const saleId = selectedStage.processId;
    const stageName = selectedStage.stage.title;

    try {
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

  const isStageComplete = (
    saleId: string,
    stageIndex: number,
    fields: string[]
  ) => {
    const stageData = fieldData[saleId]?.[stageIndex];
    if (!stageData) return false;

    const processId = salesInstances.find((s) => s.id === saleId)?.processId;
    const isFinalStage =
      processes.find((p) => p.id === processId)?.stages[stageIndex].title ===
      "Ventas Final";

    const allOtherFieldsComplete = fields.every((field) => {
      const isYesNoField = field.includes("[SI/NO]");
      const key = isYesNoField ? field.replace(" [SI/NO]", "") : field;

      const fechaRechazoKey = "Fecha rechazo";
      const fechaActivacionKey = "Fecha activación del pedido";
      const fechaEntregaFinalKey = "Fecha Compromiso";

      if (
        isFinalStage &&
        (key === fechaRechazoKey ||
          key === fechaActivacionKey ||
          key === fechaEntregaFinalKey)
      ) {
        return true;
      }
      return stageData[key] && stageData[key].trim() !== "";
    });

    if (isFinalStage) {
      const fechaRechazoKey = "Fecha rechazo";
      const fechaActivacionKey = "Fecha activación del pedido";
      const fechaEntregaFinalKey = "Fecha Compromiso";
      const usuarioFinalKey = "Usuario Ventas Final";

      const rechazoLleno = !!stageData[fechaRechazoKey];
      const activacionLleno = !!stageData[fechaActivacionKey];
      const entregaLleno = !!stageData[fechaEntregaFinalKey];
      const usuarioLleno = !!stageData[usuarioFinalKey];

      const isRejectedComplete =
        rechazoLleno && !activacionLleno && !entregaLleno && usuarioLleno;
      const isActivatedComplete =
        !rechazoLleno && activacionLleno && entregaLleno && usuarioLleno;

      const isBifurcationValid = isRejectedComplete || isActivatedComplete;
      return isBifurcationValid && allOtherFieldsComplete;
    }

    return allOtherFieldsComplete;
  };

  const isSaleFullyComplete = (saleId: string, process: Process) => {
    if (!fieldData[saleId]) return false;
    return process.stages.every((stage, stageIndex) => {
      return isStageComplete(saleId, stageIndex, stage.fields);
    });
  };

  // -----------------------------------
  // RENDER
  // -----------------------------------
  if (!currentUser.name) {
    return (
      <LoginComponent
        onLoginSuccess={(userName) => {
          localStorage.setItem("vulcanoUser", userName);
          setCurrentUser({ name: userName });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hola, {currentUser.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("vulcanoUser");
                  setCurrentUser({ name: null });
                  setExpandedProcess(null);
                  setSalesInstances([]);
                  setFieldData({});
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-4">
          {processes.map((process) => {
            const isExpanded = expandedProcess === process.id;
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
                    const saleProcess = processes.find(
                      (p) => p.id === sale.processId
                    );

                    if (!saleProcess) return null;

                    return (
                      <div
                        key={sale.id}
                        className="border-t bg-muted/20 pt-3 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6"
                      >
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <span className="text-sm font-bold text-foreground/80">
                            {sale.id}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              size="sm"
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
                        </div>

                        <div className="flex items-stretch gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                          {saleProcess.stages.map((stage, index) => {
                            const isComplete = isStageComplete(
                              sale.id,
                              index,
                              stage.fields
                            );
                            const cardClasses = isComplete
                              ? "bg-stage-complete/20 border-stage-complete"
                              : "bg-stage-pending/20 border-stage-pending";

                            const currentData =
                              fieldData[sale.id]?.[index] || {};

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 h-full"
                              >
                                <Card
                                  className={`${cardClasses} border min-w-[180px] sm:min-w-[200px] md:min-w-[220px] cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full`}
                                  onClick={() => {
                                    setFormValues({});
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
                                    });

                                    setFormValues(initialValues);
                                    setSelectedStage({
                                      processId: sale.id,
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

        {/* ========================================================= */}
        {/* NUEVA SECCIÓN: VENTAS CERRADAS (TABLA) */}
        {/* ========================================================= */}
        <div className="mt-20 pb-6">
          <Card className="border hover:border-primary/30 transition-all duration-200 overflow-hidden shadow-sm">
            <CardHeader
              className="cursor-pointer select-none hover:bg-muted/50 transition-colors py-3 sm:py-4"
              onClick={() =>
                setExpandedProcess(
                  expandedProcess === "ventas-cerradas"
                    ? null
                    : "ventas-cerradas"
                )
              }
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="text-base sm:text-lg font-semibold flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
                  <span className="break-words">Ventas Cerradas</span>
                  <Badge
                    variant="secondary"
                    className="font-normal text-xs whitespace-nowrap"
                  >
                    {closedVentas.length}{" "}
                    {closedVentas.length === 1 ? "Venta" : "Ventas"}
                  </Badge>
                </CardTitle>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    {expandedProcess === "ventas-cerradas" ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Contenido Colapsable */}
            {expandedProcess === "ventas-cerradas" && (
              <div className="border-t bg-muted/20 px-4 sm:px-6 py-6">
                {/* Cabecera con Título y Filtros */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Fechas comprometidas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Detalle de hitos y cumplimiento de fechas.
                    </p>
                  </div>

                  {/* Filtros Placeholder */}
                  <div className="flex gap-2">
                    <div className="w-[200px]">
                      <Label className="text-xs mb-1 block">
                        Filtrar por Cliente
                      </Label>
                      <Input
                        placeholder="Buscar cliente..."
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="w-[200px]">
                      <Label className="text-xs mb-1 block">
                        Filtrar por Producto
                      </Label>
                      <Input
                        placeholder="Buscar producto..."
                        className="h-8 text-xs"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="h-8 mt-auto">
                      <Filter className="w-3 h-3 mr-1" />
                      Filtrar
                    </Button>
                  </div>
                </div>

                {closedVentas.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No hay ventas cerradas actualmente.
                  </p>
                ) : (
                  // TABLA RESPONSIVA
                  <div className="relative w-full overflow-auto border rounded-md bg-background">
                    <table className="w-full caption-bottom text-xs">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            ID
                          </th>
                          <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            Cliente
                          </th>
                          <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            Producto
                          </th>
                          <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            Tipo de Producto
                          </th>

                          {/* Fechas */}
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground bg-green-50/50 dark:bg-green-900/20">
                            Activación
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground bg-blue-50/50 dark:bg-blue-900/20">
                            Entrega Req.
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground">
                            Inicio Diseño
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground">
                            Fin Diseño
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground">
                            Disp. Materiales
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground">
                            Inicio Prod.
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground">
                            Fin Prod.
                          </th>
                          <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground bg-green-50/50 dark:bg-green-900/20">
                            Fecha Compromiso
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {closedVentas.map((sale) => (
                          <tr
                            key={sale.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-2 align-middle font-bold">
                              {sale.id}
                            </td>
                            <td className="p-2 align-middle">
                              {sale.clienteName || "-"}
                            </td>
                            <td className="p-2 align-middle">
                              {sale.productoName || "-"}
                            </td>
                            <td className="p-2 align-middle">
                              <Badge
                                variant="outline"
                                className="font-normal text-[10px] whitespace-nowrap"
                              >
                                {sale.processName}
                              </Badge>
                            </td>

                            {/* Fechas Centradas */}
                            <td className="p-2 align-middle text-center bg-green-50/30 dark:bg-green-900/10">
                              {sale.fechaActivacionPedido}
                            </td>
                            <td className="p-2 align-middle text-center bg-blue-50/30 dark:bg-blue-900/10 font-medium">
                              {sale.fechaEntregaRequerida}
                            </td>
                            <td className="p-2 align-middle text-center">
                              {sale.fechaInicioDiseno}
                            </td>
                            <td className="p-2 align-middle text-center">
                              {sale.fechaFinDiseno}
                            </td>
                            <td className="p-2 align-middle text-center">
                              {sale.fechaDispMateriales}
                            </td>
                            <td className="p-2 align-middle text-center">
                              {sale.fechaInicioProduccion}
                            </td>
                            <td className="p-2 align-middle text-center">
                              {sale.fechaFinProduccion}
                            </td>
                            <td className="p-2 align-middle text-center bg-green-50/30 dark:bg-green-900/10 font-bold">
                              {sale.fechaEntregaFinal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </Card>
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

                const isUserField = formKey.includes("Usuario");
                // Bloquear campo si es de usuario y ya tiene valor, o si la lógica lo requiere
                const isDisabled = isUserField && !!formValues[formKey];

                // ---------------------------------------------------------
                // 1. DETECTAR SI ES CAMPO DE CLIENTE O PRODUCTO
                // ---------------------------------------------------------
                const isClientField = cleanField === "Nombre del Cliente";
                const isProductField = cleanField === "Nombre del Producto";
                const isCustomSelect = isClientField || isProductField;

                // Definir qué lista usar
                const selectOptions = isClientField
                  ? CLIENTE_OPTIONS
                  : isProductField
                  ? PRODUCTO_OPTIONS
                  : [];

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

                    {/* ---------------------------------------------------------
                        2. RENDERIZADO CONDICIONAL (LISTA vs SI/NO vs TEXTO)
                       --------------------------------------------------------- */}

                    {isCustomSelect ? (
                      // CASO A: Lista Desplegable (Cliente / Producto)
                      <Select
                        value={formValues[formKey] || ""}
                        onValueChange={(value) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [formKey]: value,
                          }))
                        }
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Seleccione ${cleanField}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {selectOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : isYesNoField ? (
                      // CASO B: Lista SI/NO
                      <Select
                        value={formValues[formKey] || ""}
                        onValueChange={(value) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [formKey]: value,
                          }))
                        }
                        disabled={isDisabled}
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
                      // CASO C: Input Normal (Texto o Fecha)
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
