import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

type ModalType = "sobre" | "privacidade" | "contactos" | null;

export default function Footer() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="bg-white dark:bg-black pt-0">
        <div className="w-full px-4">
          {/* Footer content - Topics and Copyright in one row */}
          <div className="flex items-center justify-between border-t border-border py-4">
            {/* Navigation links - Left side */}
            <nav className="flex items-center gap-24 px-12">
              <button
                onClick={() => setModal("sobre")}
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => setModal("contactos")}
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors"
              >
                Contactos
              </button>
              <button
                onClick={() => setModal("privacidade")}
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors"
              >
                Política de Privacidade
              </button>
            </nav>

            {/* Copyright - Right side */}
            <p className="text-sm text-muted-foreground tracking-wider px-12">
              © SportX THE NEXT LEVEL OF SPORTS
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Sobre */}
      <Dialog open={modal === "sobre"} onOpenChange={(v) => !v && setModal(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              <span style={{ color: "#660000" }}>Sport</span>
              <span style={{ color: "#001a4d" }}>X</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              A SportX é a sua loja online de artigos desportivos de qualidade, especializada em chuteiras das marcas Nike, Adidas, New Balance e Puma.
            </p>
            <div className="space-y-3">
              <p>
                O nosso principal objetivo é fornecer aos atletas e aos entusiastas deste desporto os melhores produtos, com preços competitivos e um serviço de excelência, garantindo sempre a satisfação do cliente.
              </p>
              <p>
                Disponibilizamos uma vasta variedade de artigos, assegurando envios rápidos e seguros para toda a União Europeia.
              </p>
              <p>
                Acreditamos que este desporto é para todos e pretendemos ajudá-lo a alcançar o próximo nível do seu desempenho desportivo.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Política de Privacidade */}
      <Dialog open={modal === "privacidade"} onOpenChange={(v) => !v && setModal(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>A SportX compromete-se a proteger a sua privacidade em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.</p>

            <h3 className="font-bold text-foreground">1. Dados Recolhidos</h3>
            <p>Recolhemos dados de identificação (nome, email, telefone), dados de localização (morada, código postal, país), dados de pagamento (processados de forma segura por terceiros certificados) e dados de navegação (cookies, endereço IP).</p>

            <h3 className="font-bold text-foreground">2. Finalidade do Tratamento</h3>
            <p>Os seus dados são utilizados para processamento de encomendas, comunicações relacionadas com compras, melhoria dos nossos serviços e cumprimento de obrigações legais.</p>

            <h3 className="font-bold text-foreground">3. Partilha de Dados</h3>
            <p>Não partilhamos os seus dados pessoais com terceiros para fins comerciais. Apenas partilhamos informações estritamente necessárias com parceiros de logística e processamento de pagamentos.</p>

            <h3 className="font-bold text-foreground">4. Segurança</h3>
            <p>Implementamos medidas de segurança de nível empresarial, incluindo encriptação SSL/TLS, firewalls e controlos de acesso rigorosos para proteger os seus dados.</p>

            <h3 className="font-bold text-foreground">5. Direitos do Utilizador</h3>
            <p>Tem o direito de aceder, corrigir ou eliminar os seus dados pessoais. Para exercer estes direitos, contacte-nos através do email <strong className="text-foreground">SportX@gmail.pt</strong></p>

            <h3 className="font-bold text-foreground">6. Contacto</h3>
            <p>Se tiver questões sobre esta Política de Privacidade, contacte-nos em <strong className="text-foreground">SportX@gmail.pt</strong></p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Contactos */}
      <Dialog open={modal === "contactos"} onOpenChange={(v) => !v && setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contactos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
              <Mail size={20} className="text-[#001a4d] dark:text-blue-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href="mailto:SportX@gmail.pt" className="text-sm font-medium text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors">
                  SportX@gmail.pt
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
              <Phone size={20} className="text-[#001a4d] dark:text-blue-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Telefone</p>
                <a href="tel:+351963430023" className="text-sm font-medium text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors">
                  963 430 023
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
              <MessageCircle size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
                <a
                  href="https://wa.me/351963430023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#001a4d] hover:text-[#000d2e] dark:text-blue-300 dark:hover:text-blue-400 transition-colors"
                >
                  963 430 023
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-accent">
              <p className="text-xs text-muted-foreground mb-1">Horário de Atendimento</p>
              <p className="text-sm text-foreground">Segunda-feira a Sexta-feira: 9h00 – 17h00</p>
              <p className="text-sm text-foreground">Sábado: 9h00 – 13h00</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}
