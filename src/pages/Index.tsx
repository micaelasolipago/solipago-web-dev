import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Rocket, Code, Github, Linkedin, Twitter, ArrowDown, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background bg-pattern">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Solipago
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Conectar Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Desarrollo Web{" "}
              <span className="hero-gradient">Moderno</span>, Transparente y{" "}
              <span className="hero-gradient">Descentralizado</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Transformo tus ideas en proyectos digitales impactantes. Con <span className="font-semibold text-primary">Solicoin</span>, 
              cada moneda equivale a una hora de desarrollo dedicada exclusivamente a ti. 
              <br className="hidden md:block" />Sin intermediarios, sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={scrollToServices}
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Ver Servicios
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Descubre más
              </Button>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-40 right-20 w-4 h-4 bg-primary/40 rounded-full float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-60 left-32 w-2 h-2 bg-accent/60 rounded-full float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-40 w-3 h-3 bg-primary/50 rounded-full float" style={{animationDelay: '0.5s'}}></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Elige Tu Proyecto
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada plan está diseñado para diferentes necesidades. Desde sitios simples hasta aplicaciones complejas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Sitio Web Estático */}
            <div className="stagger-animate group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 hover:border-primary/40 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_25px_80px_-15px_hsl(217_91%_60%_/_0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative p-10 h-full flex flex-col">
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg"></div>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Sitio Web Estático
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    La solución perfecta para landing pages, portafolios o sitios informativos. 
                    Diseño moderno, rápido y optimizado para SEO.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Desde</span>
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">15</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary uppercase tracking-wider">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 15 horas dev</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Sitio Web Dinámico - Destacado */}
            <div className="stagger-animate group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-card to-accent/15 border-2 border-primary/40 hover:border-primary/70 transition-all duration-700 hover:scale-[1.05] hover:shadow-[0_30px_100px_-15px_hsl(217_91%_60%_/_0.4)] transform">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
              
              <Badge className="absolute top-6 left-6 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-4 py-2 shadow-xl rounded-full">
                ⭐ Más Popular
              </Badge>
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center pulse-glow">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent"></div>
              </div>
              
              <div className="relative p-10 h-full flex flex-col pt-16">
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-xl pulse-glow">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Sitio Web Dinámico
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Ideal para blogs, sitios de membresía o plataformas que requieren 
                    gestión de contenido. Interactividad y funcionalidades a tu medida.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Desde</span>
                    <div className="flex items-center gap-3">
                      <span className="text-6xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">40</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary uppercase tracking-wider">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 40 horas dev</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] pulse-glow">
                    🚀 Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Aplicación Web Completa */}
            <div className="stagger-animate group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 hover:border-primary/40 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_25px_80px_-15px_hsl(217_91%_60%_/_0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative p-10 h-full flex flex-col">
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-500">
                    <Code className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Aplicación Web Completa
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    La solución total. Incluye desarrollo backend, diseño de base de datos, 
                    integración de APIs y todo lo necesario para tu proyecto más ambicioso.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Desde</span>
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">80</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider">SOLICOIN</span>
                        <span className="text-xs text-muted-foreground">≈ 80 horas dev</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Simple en Tres Pasos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un proceso transparente y eficiente para llevar tu proyecto de la idea a la realidad.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group stagger-animate">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500 shadow-lg">
                  <Wallet className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Conecta tu Wallet</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Usa el botón principal para conectar de forma segura tu wallet preferida. 
                Compatible con MetaMask, WalletConnect y más.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group stagger-animate">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-500 shadow-lg">
                  <Rocket className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Elige tu Servicio</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Selecciona el plan que mejor se adapte a las necesidades de tu proyecto. 
                Cada Solicoin garantiza calidad profesional.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group stagger-animate">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500 shadow-lg">
                  <Code className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Iniciamos el Desarrollo</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Una vez confirmado el pago, comenzamos a construir tu visión. 
                Actualizaciones constantes y comunicación directa.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16 fade-in">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50 bg-gradient-to-r from-background to-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-muted-foreground mb-6 md:mb-0 flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              © 2025 Solipago. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Back to top */}
          <div className="text-center mt-12">
            <Button 
              variant="ghost" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowDown className="w-4 h-4 mr-2 rotate-180 group-hover:animate-bounce" />
              Volver arriba
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;