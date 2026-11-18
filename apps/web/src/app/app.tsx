import { Route, Routes } from 'react-router'
import { AccessPage } from '../features/access'
import { ClientsPage } from '../features/clients'
import { CompanyPage } from '../features/company'
import { ContactPage } from '../features/contact'
import { HomePage } from '../features/home'
import { PrivacyPage } from '../features/privacy'
import { SiteFooter, SiteHeader } from '../features/site-shell'
import { SolutionsPage } from '../features/solutions'
import { SupportPage } from '../features/support'
import { NotFoundPage } from './not-found-page'
import { ScrollManager } from './scroll-manager'

export const App = () => (
  <div className="ms-page" id="inicio">
    <ScrollManager />
    <SiteHeader />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solucoes" element={<SolutionsPage />} />
      <Route path="/clientes" element={<ClientsPage />} />
      <Route path="/suporte" element={<SupportPage />} />
      <Route path="/empresa" element={<CompanyPage />} />
      <Route path="/contato" element={<ContactPage />} />
      <Route path="/acessar-sistemas" element={<AccessPage />} />
      <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <SiteFooter />
  </div>
)
