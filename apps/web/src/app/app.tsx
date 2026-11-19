import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AccessPage } from '../features/access'
import { ClientsPage } from '../features/clients'
import { CompanyPage } from '../features/company'
import { ContactPage } from '../features/contact'
import { DemoRequestPage } from '../features/demo-request'
import { HomePage } from '../features/home'
import { PrivacyPage } from '../features/privacy'
import { SiteFooter, SiteHeader } from '../features/site-shell'
import { SolutionsPage } from '../features/solutions'
import { SupportPage } from '../features/support'
import { VideosPage } from '../features/videos'
import { isPagePublished } from '../shared/config/site-config'
import { WhatsappFab } from '../shared/ui/whatsapp-fab'
import { NotFoundPage } from './not-found-page'
import { ScrollManager } from './scroll-manager'

const publishedOr = (path: string, page: ReactNode): ReactNode =>
  isPagePublished(path) ? page : <Navigate to="/" replace />

export const App = () => (
  <div className="ms-page" id="inicio">
    <ScrollManager />
    <SiteHeader />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solucoes" element={<SolutionsPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/clientes" element={publishedOr('/clientes', <ClientsPage />)} />
      <Route path="/suporte" element={<SupportPage />} />
      <Route path="/empresa" element={<CompanyPage />} />
      <Route path="/contato" element={publishedOr('/contato', <ContactPage />)} />
      <Route path="/demonstracao" element={<DemoRequestPage />} />
      <Route path="/acessar-sistemas" element={<AccessPage />} />
      <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <SiteFooter />
    <WhatsappFab />
  </div>
)
