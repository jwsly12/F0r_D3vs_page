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
      <script defer src="https://t.contentsquare.net/uxa/b7ff0f5d27693.js"></script>
      <script>
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p = null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="gu mu yu bu ku init Qu Zu Wu Vu Yu el Gu ec zu lc uc cc hc dc vc capture getExtension Ju fu mc calculateEventProperties gc register register_once register_for_session unregister unregister_for_session wc Uu yc getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys onActiveMatchingSurveysChanged renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync kc identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset Sc shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty bc rc createPersonProfile setInternalOrTestUser Cu xu opt_in_capturing opt_out_capturing $u has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing nc debug il Os getPageViewId captureTraceFeedback captureTraceMetric Nu".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_sTGCPS6rQbtdJ7kWqYPzfPhUtodABjsLxkywLBNDeNey', {
          api_host: 'https://us.i.posthog.com',
        defaults: '2026-05-30',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
      </script>
    </>
  )
}

export default App
