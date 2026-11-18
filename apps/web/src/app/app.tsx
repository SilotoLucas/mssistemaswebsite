import { Route, Routes } from 'react-router'
import { CompanyPage } from '../features/company'
import { HomePage } from '../features/home'
import { SiteFooter, SiteHeader } from '../features/site-shell'
import { SolutionsPage } from '../features/solutions'
import { NotFoundPage } from './not-found-page'
import { ScrollManager } from './scroll-manager'

export const App = () => (
  <div className="ms-page" id="inicio">
    <ScrollManager />
    <SiteHeader />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solucoes" element={<SolutionsPage />} />
      <Route path="/empresa" element={<CompanyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <SiteFooter />
  </div>
)
