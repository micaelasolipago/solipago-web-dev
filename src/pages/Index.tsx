import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Rocket, Code, Github, Linkedin, Twitter } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-foreground">
            SoliDev
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Conectar Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Desarrollo Web{" "}
            <span className="hero-gradient">Moderno</span>, Transparente y{" "}
            <span className="hero-gradient">Descentralizado</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transformo tus ideas en proyectos digitales impactantes. Con Solipago, 
            cada moneda equivale a una hora de desarrollo dedicada exclusivamente a ti. 
            Sin intermediarios, sin complicaciones.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver Servicios
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Elige Tu Proyecto</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Sitio Web Estático */}
            <Card className="service-card bg-card border-border/50 hover:border-primary/30">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Sitio Web Estático</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La solución perfecta para landing pages, portafolios o sitios informativos. 
                    Diseño moderno, rápido y optimizado para SEO.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-primary mb-4">
                    Desde 15 Solipago
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    Seleccionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sitio Web Dinámico - Destacado */}
            <Card className="service-card bg-card border-primary/50 relative overflow-hidden">
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                Más Popular
              </Badge>
              <CardContent className="p-8 h-full flex flex-col">
                <div className="mb-6 mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Sitio Web Dinámico</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ideal para blogs, sitios de membresía o plataformas que requieren 
                    gestión de contenido. Interactividad y funcionalidades a tu medida.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-primary mb-4">
                    Desde 40 Solipago
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Seleccionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Aplicación Web Completa */}
            <Card className="service-card bg-card border-border/50 hover:border-primary/30">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Aplicación Web Completa</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La solución total. Incluye desarrollo backend, diseño de base de datos, 
                    integración de APIs y todo lo necesario para tu proyecto más ambicioso.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-primary mb-4">
                    Desde 80 Solipago
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    Seleccionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Simple en Tres Pasos</h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Conecta tu Wallet</h3>
              <p className="text-muted-foreground leading-relaxed">
                Usa el botón principal para conectar de forma segura tu wallet preferida.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Elige tu Servicio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Selecciona el plan que mejor se adapte a las necesidades de tu proyecto.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Iniciamos el Desarrollo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Una vez confirmado el pago, comenzamos a construir tu visión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-muted-foreground mb-4 md:mb-0">
            © 2025 SoliDev. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;