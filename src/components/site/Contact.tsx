import { useState, useEffect, useRef } from "react";
import { Send, ChevronDown, Check } from "lucide-react";
import { FadeInHeader, ScrollReveal } from "./SectionHeader";

const AVAILABLE_SERVICES = [
  "Agenciamento de Modelos",
  "Aluguel de Estúdio de Fotografia",
  "Estúdio de Fotografia",
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [openServicesDropdown, setOpenServicesDropdown] = useState(false);
  const [sent, setSent] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setOpenServicesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleService = (service: string) => {
    let updated: string[];
    if (selectedServices.includes(service)) {
      updated = selectedServices.filter((s) => s !== service);
    } else {
      updated = [...selectedServices, service];
    }
    setSelectedServices(updated);
    setForm((prev) => ({
      ...prev,
      services: updated.join(", "),
    }));
  };

  const handleManualServicesChange = (text: string) => {
    setForm((prev) => ({ ...prev, services: text }));
    // Synchronize selectedServices list based on presence in text
    const matched = AVAILABLE_SERVICES.filter((s) =>
      text.toLowerCase().includes(s.toLowerCase())
    );
    setSelectedServices(matched);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Capturar todas as informações preenchidas no formulário
    const name = form.name.trim();
    if (!name) return;

    const phone = form.phone.trim();
    const email = form.email.trim();
    const services = form.services.trim() || (selectedServices.length > 0 ? selectedServices.join(", ") : "");
    const userMsg = form.message.trim();

    // 2. Montar a mensagem completa do WhatsApp (sem emojis, títulos em negrito)
    const blocks: string[] = [];

    // Bloco inicial: Saudação, Nome e Dados de contato (somente quando preenchidos)
    const introLines: string[] = ["Olá, tudo bem?", "", `Meu nome é ${name}.`];

    if (phone) {
      introLines.push(`*Telefone:* ${phone}`);
    }
    if (email) {
      introLines.push(`*E-mail:* ${email}`);
    }
    blocks.push(introLines.join("\n"));

    // Bloco de Serviços de interesse
    blocks.push(`*Serviços de interesse:*\n${services || "A definir"}`);

    // Bloco de Observação
    blocks.push(`*Observação:*\n${userMsg || "—"}`);

    // Bloco de Encerramento
    blocks.push("Aguardo o retorno de vocês. Desde já, agradeço!");

    const formattedMessage = blocks.join("\n\n");

    // 3. Montar a URL oficial e iniciar redirecionamento para o WhatsApp
    const OFFICIAL_WHATSAPP_NUMBER = "5519998675962";
    const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // 4. Limpeza automática imediata de todos os campos do formulário no site
    setForm({
      name: "",
      email: "",
      phone: "",
      services: "",
      message: "",
    });
    setSelectedServices([]);
    setOpenServicesDropdown(false);

    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contato" className="bg-[#0a0a0a] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInHeader className="text-center mb-16">
          <span
            className="text-[#C9A96E] uppercase block mb-4 font-semibold"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
          >
            Entre em Contato
          </span>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Fale Conosco
          </h2>
          <p className="text-white/60 max-w-lg mx-auto" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
            Seja você um modelo em busca de representação ou uma marca procurando talentos e produções,
            estamos prontos para atendê-lo.
          </p>
        </FadeInHeader>

        <div className="max-w-3xl mx-auto">
          {/* Form */}
          <ScrollReveal direction="up" duration={800}>
            <div className="bg-[#111111] border border-white/10 p-8 sm:p-12 rounded-[24px] shadow-2xl shadow-black/80">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Row 1: Nome Completo (Obrigatório) & Telefone / WhatsApp (Opcional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="text-white/80 block mb-2 font-medium"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#181818] border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-300"
                      style={{ fontSize: "0.92rem" }}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label
                      className="text-white/80 block mb-2 font-medium"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                    >
                      Telefone / WhatsApp <span className="text-white/40 normal-case font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#181818] border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-300"
                      style={{ fontSize: "0.92rem" }}
                      placeholder="(19) 99999-9999"
                    />
                  </div>
                </div>

                {/* Row 2: E-mail (Opcional) */}
                <div>
                  <label
                    className="text-white/80 block mb-2 font-medium"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                  >
                    E-mail <span className="text-white/40 normal-case font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#181818] border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-300"
                    style={{ fontSize: "0.92rem" }}
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Row 3: Serviços de Interesse — Seleção Múltipla com preenchimento em texto */}
                <div ref={servicesRef} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className="text-white/80 block font-medium"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                    >
                      Serviços de Interesse
                    </label>
                    <span className="text-xs text-[#C9A96E] font-medium">
                      {selectedServices.length > 0
                        ? `${selectedServices.length} selecionado${selectedServices.length > 1 ? "s" : ""}`
                        : "Seleção múltipla"}
                    </span>
                  </div>

                  {/* Campo de texto dos serviços */}
                  <div className="relative">
                    <input
                      type="text"
                      value={form.services}
                      onChange={(e) => handleManualServicesChange(e.target.value)}
                      onClick={() => setOpenServicesDropdown(true)}
                      className="w-full bg-[#181818] border border-white/15 px-4 py-3.5 pr-12 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-300 cursor-pointer"
                      style={{ fontSize: "0.92rem" }}
                      placeholder="Clique para selecionar os serviços de interesse..."
                    />
                    <button
                      type="button"
                      onClick={() => setOpenServicesDropdown(!openServicesDropdown)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A96E] hover:text-white transition-colors p-1 cursor-pointer bg-transparent border-none"
                      aria-label="Abrir opções de serviços"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openServicesDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Menu Dropdown de Seleção Múltipla */}
                  {openServicesDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-[#1c1c1c] border border-[#C9A96E]/40 rounded-xl z-30 shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-[11px] uppercase tracking-wider text-[#C9A96E] px-3 py-2 font-semibold border-b border-white/10 mb-1">
                        Selecione um ou mais serviços:
                      </div>

                      <div className="flex flex-col gap-1">
                        {AVAILABLE_SERVICES.map((service) => {
                          const isChecked = selectedServices.includes(service);
                          return (
                            <div
                              key={service}
                              onClick={() => toggleService(service)}
                              className={`flex items-center justify-between px-3.5 py-3 rounded-lg cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-[#C9A96E]/20 text-[#FAF3E0] font-medium"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span className="text-sm">{service}</span>
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? "bg-[#C9A96E] border-[#C9A96E] text-black"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {isChecked && <Check size={13} strokeWidth={3} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Rodapé com ação de limpar */}
                      {selectedServices.length > 0 && (
                        <div className="pt-2 mt-1 px-3 border-t border-white/10 flex justify-between items-center text-xs">
                          <span className="text-white/50">
                            Inseridos automaticamente no campo
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedServices([]);
                              setForm((prev) => ({ ...prev, services: "" }));
                            }}
                            className="text-[#C9A96E] hover:underline cursor-pointer bg-transparent border-none text-xs"
                          >
                            Limpar seleção
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Row 4: Observação (Opcional) */}
                <div>
                  <label
                    className="text-white/80 block mb-2 font-medium"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                  >
                    Observação <span className="text-white/40 normal-case font-normal">(Opcional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#181818] border border-white/15 p-4 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-300 resize-none"
                    style={{ fontSize: "0.92rem" }}
                    placeholder="Escreva sua observação ou detalhes do projeto..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-[#C9A96E] text-black hover:bg-white transition-all duration-300 cursor-pointer border-none font-semibold shadow-lg shadow-black/50"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
                  >
                    <Send size={15} />
                    Enviar Mensagem
                  </button>
                </div>

                {sent && (
                  <div className="mt-2 p-4 border border-[#C9A96E]/40 bg-[#C9A96E]/10 rounded-xl">
                    <p className="text-[#C9A96E] text-center font-medium" style={{ fontSize: "0.9rem" }}>
                      Mensagem enviada com sucesso! Nossa equipe retornará em breve.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}


