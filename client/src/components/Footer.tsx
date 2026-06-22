import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, MessageCircle, ChevronRight } from "lucide-react";

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
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-[#001a4d] transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => setModal("contactos")}
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-[#001a4d] transition-colors"
              >
                Contactos
              </button>
              <button
                onClick={() => setModal("privacidade")}
                className="text-base font-black text-foreground hover:text-[#001a4d] dark:hover:text-[#001a4d] transition-colors"
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
            <p>Tem o direito de aceder, corrigir ou eliminar os seus dados pessoais. Para exercer estes direitos, contacte-nos através do email <strong className="text-foreground">sportxthenextlevelofsports@gmail.com</strong></p>

            <h3 className="font-bold text-foreground">6. Contacto</h3>
            <p>Se tiver questões sobre esta Política de Privacidade, contacte-nos em <strong className="text-foreground">sportxthenextlevelofsports@gmail.com</strong></p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Contactos */}
      <Dialog open={modal === "contactos"} onOpenChange={(v) => !v && setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Contactos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6">
            {/* Email */}
            <a
              href="mailto:sportxthenextlevelofsports@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-[#001a4d] hover:bg-accent/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <Mail size={24} className="text-[#001a4d] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium text-foreground">sportxthenextlevelofsports@gmail.com</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </a>

            {/* Telefone */}
            <a
              href="tel:+351963430023"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-[#001a4d] hover:bg-accent/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <Phone size={24} className="text-[#001a4d] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                  <p className="text-sm font-medium text-foreground">963 430 023</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/351963430023"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <MessageCircle size={24} className="text-green-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">WhatsApp</p>
                  <p className="text-sm font-medium text-foreground">963 430 023</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-green-600" />
            </a>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}
