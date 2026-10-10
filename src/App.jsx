import React, { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import './index.css'

// NOTA: Certifique-se de inicializar o PostHog no seu main.jsx ou aqui antes de usar:
// posthog.init('<SUA_CHAVE_DE_API_POSTHOG>', { api_host: 'https://app.posthog.com' })

function App() {
  const [variant, setVariant] = useState('control') // 'control' ou 'test'
  const [flagsLoaded, setFlagsLoaded] = useState(false)

  useEffect(() => {
    // Escuta o carregamento assíncrono das Feature Flags do PostHog
    posthog.onFeatureFlags(() => {
      // Obtém a variante configurada para o experimento 'cta-button-test'
      const flagVariant = posthog.getFeatureFlag('cta-button-test')
      
      if (flagVariant === 'test') {
        setVariant('test')
      } else {
        setVariant('control')
      }
      setFlagsLoaded(true)
    })
  }, [])

  const handleCtaClick = () => {
    // Registo do evento de conversão no PostHog com a variante usada
    posthog.capture('clicked_main_cta', { variant_used: variant })
    
    // Registo do mesmo evento de conversão no Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'clicked_main_cta', { variant_used: variant })
    }
    
    // Ação do botão (ex: redirecionar para checkout ou abrir modal)
    alert(`Evento registado!\nVariante usada: ${variant}`)
  }

  // Estilos dinâmicos do CTA baseados na variante atual
  const ctaStyles = variant === 'test'
    ? { background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)' }
    : { background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }

  const ctaText = !flagsLoaded 
    ? 'A carregar...' 
    : (variant === 'test' ? '🚀 Garantir Minha Vaga (Grátis)' : 'Começar Jornada')

  return (
    <>
      <nav className="navbar container">
        <div className="logo">F0r_D3vs</div>
        <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Inscreva-se</button>
      </nav>

     <script defer src="https://t.contentsquare.net/uxa/b7ff0f5d27693.js"></script>
      <main>
        <section className="hero container">
          <h1>Programação Orientada ao Mercado</h1>
          <p>
            Domine as tecnologias mais exigidas pelas empresas. Aprenda não apenas a codar,
            mas a tomar decisões baseadas em dados através da <strong>Lógica de Teste A/B e Eventos</strong>.
          </p>
          
          {/* O nosso Botão CTA que muda conforme a Feature Flag */}
          <button 
            onClick={handleCtaClick} 
            className="btn-primary"
            style={ctaStyles}
          >
            {ctaText}
          </button>
        </section>

        <section className="focus-section container">
          <div className="focus-content">
            <div className="focus-text">
              <h2>O Grande Diferencial: Testes A/B e Eventos</h2>
              <p>
                No mercado atual, escrever código não é suficiente. Você precisa entender como os usuários
                interagem com sua aplicação e qual interface gera mais conversão.
              </p>
              <p>
                <strong>Exemplo Real:</strong> O botão principal desta página neste exato momento está a usar 
                o PostHog para determinar a sua cor e texto. Estás atualmente a ver a variante: 
                <strong style={{ color: variant === 'test' ? '#10b981' : '#3b82f6', marginLeft: '0.5rem' }}>
                  {variant.toUpperCase()}
                </strong>
              </p>
              <p>
                Nosso módulo principal mergulha fundo na instrumentação de eventos, análise de funil,
                e na implementação técnica e estatística de <strong>Testes A/B</strong> para escalar produtos reais.
              </p>
            </div>
            <div className="focus-visual">
              <div className="ab-test-visual">
                <div className={`variant ${variant === 'control' ? 'winner' : ''}`}>
                  <h4>Variante Control</h4>
                  <div className="metric" style={{ color: '#3b82f6' }}>Azul Neutro</div>
                  <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '0.5rem' }}>Começar Jornada</p>
                </div>
                <div className="vs">VS</div>
                <div className={`variant ${variant === 'test' ? 'winner' : ''}`}>
                  <h4>Variante Test</h4>
                  <div className="metric" style={{ color: '#10b981' }}>Verde Destaque</div>
                  <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '0.5rem' }}>🚀 Garantir Vaga</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="modules container">
          <h2 className="section-title">O que mais você vai dominar</h2>
          <div className="grid">
            <div className="card">
              <div className="card-icon">⚛️</div>
              <h3>React & Ecossistema</h3>
              <p>Construa interfaces modernas, performáticas e reativas. Domine hooks, state management e arquitetura de componentes.</p>
            </div>
            <div className="card">
              <div className="card-icon">🐍</div>
              <h3>Python & Dados</h3>
              <p>Análise de dados para os testes A/B, automações e criação de APIs robustas para servir sua aplicação.</p>
            </div>
            <div className="card">
              <div className="card-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>Deploy de aplicações, configuração de pipelines CI/CD e monitoramento de eventos em tempo real na nuvem.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} F0r_D3vs - Programação Orientada ao Mercado.</p>
        </div>
      </footer>
    </>
  )
}

export default App
