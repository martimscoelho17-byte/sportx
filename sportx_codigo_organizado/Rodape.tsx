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
              © 2026 SportX. THE NEXT LEVEL OF SPORTS
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
            <p><strong className="text-foreground">Última atualização: Maio de 2026</strong></p>
            
            <p>A SportX ("nós", "nosso" ou "a empresa") compromete-se a proteger a sua privacidade. Esta Política de Privacidade explica como recolhemos, utilizamos, divulgamos e protegemos os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia e legislação aplicável.</p>

            <h3 className="font-bold text-foreground">1. Informações que Recolhemos</h3>
            <p>Recolhemos as seguintes categorias de dados pessoais:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Dados de Identificação:</strong> Nome completo, endereço de email, número de telefone</li>
              <li><strong>Dados de Localização:</strong> Morada de entrega, código postal, país</li>
              <li><strong>Dados de Pagamento:</strong> Informações de cartão de crédito (processadas de forma segura por terceiros certificados, não armazenadas nos nossos servidores)</li>
              <li><strong>Dados de Navegação:</strong> Cookies, endereço IP, tipo de navegador, páginas visitadas</li>
              <li><strong>Dados de Perfil:</strong> Preferências de produtos, histórico de compras</li>
            </ul>

            <h3 className="font-bold text-foreground">2. Como Utilizamos os Seus Dados</h3>
            <p>Os seus dados pessoais são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Processar e entregar as suas encomendas</li>
              <li>Enviar confirmações de encomenda e atualizações de entrega</li>
              <li>Responder às suas questões e pedidos de suporte</li>
              <li>Melhorar a experiência do utilizador e personalizar conteúdo</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Prevenir fraude e atividades ilícitas</li>
              <li>Enviar comunicações de marketing (apenas com o seu consentimento)</li>
            </ul>

            <h3 className="font-bold text-foreground">3. Base Legal para o Tratamento</h3>
            <p>Processamos os seus dados com base em:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Execução de contrato (processamento de encomendas)</li>
              <li>Consentimento (comunicações de marketing)</li>
              <li>Obrigações legais (cumprimento fiscal e regulatório)</li>
              <li>Interesses legítimos (prevenção de fraude, segurança)</li>
            </ul>

            <h3 className="font-bold text-foreground">4. Partilha de Dados</h3>
            <p>Não vendemos os seus dados pessoais a terceiros. Apenas partilhamos informações estritamente necessárias com:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Prestadores de Logística:</strong> Para entrega das suas encomendas</li>
              <li><strong>Processadores de Pagamento:</strong> Para processar transações de forma segura</li>
              <li><strong>Autoridades Legais:</strong> Quando obrigado por lei</li>
            </ul>

            <h3 className="font-bold text-foreground">5. Segurança dos Dados</h3>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger os seus dados:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Encriptação SSL/TLS para transmissão de dados</li>
              <li>Firewalls e sistemas de detecção de intrusões</li>
              <li>Controlos de acesso rigorosos e autenticação multi-fator</li>
              <li>Auditorias de segurança regulares</li>
              <li>Conformidade com padrões de segurança internacionais</li>
            </ul>

            <h3 className="font-bold text-foreground">6. Retenção de Dados</h3>
            <p>Retemos os seus dados pessoais durante o tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Geralmente, mantemos dados de clientes por 7 anos para fins contabilísticos e legais.</p>

            <h3 className="font-bold text-foreground">7. Seus Direitos</h3>
            <p>Sob o RGPD, tem os seguintes direitos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Direito de Acesso:</strong> Solicitar cópia dos seus dados pessoais</li>
              <li><strong>Direito de Retificação:</strong> Corrigir dados imprecisos</li>
              <li><strong>Direito de Eliminação:</strong> Solicitar a eliminação dos seus dados ("direito ao esquecimento")</li>
              <li><strong>Direito de Restrição:</strong> Limitar o processamento dos seus dados</li>
              <li><strong>Direito de Portabilidade:</strong> Receber dados em formato estruturado</li>
              <li><strong>Direito de Oposição:</strong> Opor-se ao processamento para fins de marketing</li>
            </ul>

            <h3 className="font-bold text-foreground">8. Cookies e Tecnologias de Rastreamento</h3>
            <p>Utilizamos cookies para melhorar a sua experiência. Pode controlar as preferências de cookies nas definições do seu navegador. Alguns cookies são essenciais para o funcionamento do site, enquanto outros são opcionais.</p>

            <h3 className="font-bold text-foreground">9. Alterações a Esta Política</h3>
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos de alterações significativas através do email ou de um aviso no nosso site.</p>

            <h3 className="font-bold text-foreground">10. Contacto</h3>
            <p>Para questões sobre esta Política de Privacidade ou para exercer os seus direitos, contacte-nos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Email:</strong> <a href="mailto:sportxthenextlevelofsports@gmail.com" className="text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors">sportxthenextlevelofsports@gmail.com</a></li>
              <li><strong>Telefone:</strong> +351 963 430 023</li>
              <li><strong>WhatsApp:</strong> +351 963 430 023</li>
            </ul>
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
                <a href="mailto:sportxthenextlevelofsports@gmail.com" className="text-sm font-medium text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors">
                  sportxthenextlevelofsports@gmail.com
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
                  className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 transition-colors"
                >
                  963 430 023
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-accent">
              <p className="text-xs text-muted-foreground mb-1">Horário de Atendimento</p>
              <p className="text-sm text-foreground">Segunda-feira a Sexta-feira: 9h00 – 19h00</p>
              <p className="text-sm text-foreground">Sábado: 9h00 – 13h00</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}
