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
            Solipago
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
            Transformo tus ideas en proyectos digitales impactantes. Con Solicoin, 
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
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-10px_hsl(217_91%_60%_/_0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <div className="w-6 h-6 rounded bg-primary/60"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Sitio Web Estático
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La solución perfecta para landing pages, portafolios o sitios informativos. 
                    Diseño moderno, rápido y optimizado para SEO.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">Desde</span>
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">15</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 15 horas</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
                    Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Sitio Web Dinámico - Destacado */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_25px_80px_-10px_hsl(217_91%_60%_/_0.4)] transform">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-3 py-1 shadow-lg">
                ⭐ Más Popular
              </Badge>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
              </div>
              <div className="relative p-8 h-full flex flex-col mt-6">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Sitio Web Dinámico
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ideal para blogs, sitios de membresía o plataformas que requieren 
                    gestión de contenido. Interactividad y funcionalidades a tu medida.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">Desde</span>
                    <div className="flex items-center gap-2">
                      <span className="text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">40</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 40 horas</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                    🚀 Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Aplicación Web Completa */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-10px_hsl(217_91%_60%_/_0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Code className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Aplicación Web Completa
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La solución total. Incluye desarrollo backend, diseño de base de datos, 
                    integración de APIs y todo lo necesario para tu proyecto más ambicioso.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">Desde</span>
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">80</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-accent">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 80 horas</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
                    Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>
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
            © 2025 Solipago. Todos los derechos reservados.
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