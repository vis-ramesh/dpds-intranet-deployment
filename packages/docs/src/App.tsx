import Layout from "./components/layout"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@dpds-gov/design-system"
import CardPage from "./pages/card-page"
import DashboardPage from "./pages/dashboard-page"
import ChartsPage from "./pages/charts-page.tsx"
import ButtonsPage from "./pages/buttons-page.tsx"
import UiComponentsPage from "./pages/ui-components-page"
import FormsPage from "./pages/forms-page"
import IconsPage from "./pages/icons-page"
import InputPage from "./pages/input-page"
import InputGroupPage from "./pages/input-group-page"
import SelectPage from "./pages/select-page"
import TabsPage from "./pages/tabs-page"
import TooltipPage from "./pages/tooltip-page"
import ToastPage from "./pages/toast-page"
import DialogPage from "./pages/dialog-page"
import SidebarDocsPage from "./pages/sidebar-page"
import FormPage from "./pages/form-page"
import TablePage from "./pages/table-page"
import LoginPattern from "./patterns/login"
import SignupPattern from "./patterns/signup"
import PatternsLoginPage from "./pages/patterns-login-page"
import PatternsSignupPage from "./pages/patterns-signup-page"
import NotFoundPage from "./pages/not-found-page"
import EmailTemplatesPage from "./pages/email-templates-page"
import LottieIconsPage from "./pages/lottie-icons-page"
import ServicesListingPage from "./pages/services-listing-page"
import InquiryDetailPage from "./pages/inquiry-detail-page"
import InquiryFormPage from "./pages/inquiry-form-page"
import LoginModalPage from "./pages/login-modal-page"
import ServiceStatusPage from "./pages/service-status-page"
import ConfirmationPage from "./pages/confirmation-page"
import TransactionEnquiryPage from "./pages/transaction-enquiry-page"
import RequestDetailPage from "./pages/request-detail-page"
import PagePreviewPage from "./pages/page-preview-page"
import AnimationsPage from "./pages/animations-page"
import BentoDemoPage from "./pages/bento-demo-page"
import AnalyticsPage from "./pages/analytics-page"
import ChangelogPage from "./pages/changelog-page"
import TextareaPage from "./pages/textarea-page"
import CheckboxPage from "./pages/checkbox-page"
import RadioPage from "./pages/radio-page"
import LabelPage from "./pages/label-page"
import SwitchPage from "./pages/switch-page"
import SliderPage from "./pages/slider-page"
import ComboboxPage from "./pages/combobox-page"
import BadgePage from "./pages/badge-page"
import AvatarPage from "./pages/avatar-page"
import SkeletonPage from "./pages/skeleton-page"
import BreadcrumbDocsPage from "./pages/breadcrumb-page"
import PaginationPage from "./pages/pagination-page"
import StepperPage from "./pages/stepper-page"
import CommandPage from "./pages/command-page"
import MenuPage from "./pages/menu-page"
import ContextMenuPage from "./pages/context-menu-page"
import NavbarPage from "./pages/navbar-page"
import ProfileSwitcherPage from "./pages/profile-switcher-page"
import ResizableDashboardPage from "./pages/resizable-dashboard-page"
import ProgressTrackerPage from "./pages/progress-tracker-page"
import CardWidgetPage from "./pages/card-widget-page"
import CardKpiGridPage from "./pages/card-kpi-grid-page"
import CardProfileGridPage from "./pages/card-profile-grid-page"
import CardDashboardMixPage from "./pages/card-dashboard-mix-page"
import CardFlipEsaadPage from "./pages/card-flip-esaad-page"
import DataTablePage from "./pages/data-table-page"
import SpinnerPage from "./pages/spinner-page"
import ProgressPage from "./pages/progress-page"
import AlertPage from "./pages/alert-page"
import PopoverPage from "./pages/popover-page"
import HoverCardPage from "./pages/hover-card-page"
import DrawerSheetPage from "./pages/drawer-page"
import AspectRatioPage from "./pages/aspect-ratio-page"
import SeparatorPage from "./pages/separator-page"
import ContainerPage from "./pages/container-page"
import CollapsiblePage from "./pages/collapsible-page"
import ScrollAreaPage from "./pages/scroll-area-page"
import GridPage from "./pages/grid-page"
import StackPage from "./pages/stack-page"
import AccordionPage from "./pages/accordion-page"
import ResizablePage from "./pages/resizable-page"
import DatepickerPage from "./pages/datepicker-page"
import InputOtpPage from "./pages/input-otp-page"
import FileUploadPage from "./pages/file-upload-page"
import ColorsPage from "./pages/colors-page"
import TypographyPage from "./pages/typography-page"
import SpacingPage from "./pages/spacing-page"
import RadiusPage from "./pages/radius-page"
import MotionPage from "./pages/motion-page"
import ElevationPage from "./pages/elevation-page"
import IconographyPage from "./pages/iconography-page"
import AccessibilityPage from "./pages/accessibility-page"
import TagPage from "./pages/tag-page"
import BannerPage from "./pages/banner-page"
import EmptyStatePage from "./pages/empty-state-page"
import ListPage from "./pages/list-page"
import StatTilePage from "./pages/stat-tile-page"
import IntroductionPage from "./pages/introduction-page"
import ProjectStructurePage from "./pages/project-structure-page"
import InstallationPage from "./pages/installation-page"
import InstallationNewPage from "./pages/installation-new-page"
import ThemingPage from "./pages/theming-page"
import DarkModePage from "./pages/dark-mode-page"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <>
    <Analytics />
    <Toaster />
    <Routes>
      {/* Standalone pages – no sidebar layout. */}
      <Route path="/login" element={<LoginPattern />} />
      <Route path="/signup" element={<SignupPattern />} />
      <Route path="/404" element={<NotFoundPage />} />

      {/* Pattern preview routes – outside <Layout>, full-bleed.
          Used by the <PatternPreview /> iframe and "Open in new tab" affordance. */}
      <Route path="/preview/login" element={<LoginPattern />} />
      <Route path="/preview/signup" element={<SignupPattern />} />

      {/* Dashboard pages – wrapped in Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              {/* ── Patterns (also serves as home) ── */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboards/resizable" element={<ResizableDashboardPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/ui/login-modal" element={<LoginModalPage />} />
              <Route path="/patterns/login" element={<PatternsLoginPage />} />
              <Route path="/patterns/signup" element={<PatternsSignupPage />} />
              <Route path="/email-templates" element={<EmailTemplatesPage />} />
              <Route path="/services" element={<ServicesListingPage />} />
              <Route path="/services/inquiry" element={<InquiryDetailPage />} />
              <Route path="/services/inquiry/form" element={<InquiryFormPage />} />
              <Route path="/services/status" element={<ServiceStatusPage />} />
              <Route path="/services/confirmation" element={<ConfirmationPage />} />
              <Route path="/services/transaction-enquiry" element={<TransactionEnquiryPage />} />
              <Route path="/services/request-detail" element={<RequestDetailPage />} />

              {/* ── Form & Input — pages with real content ── */}
              <Route path="/buttons" element={<ButtonsPage />} />
              <Route path="/forms/form" element={<FormPage />} />
              <Route path="/forms/input" element={<InputPage />} />
              <Route path="/forms/input-group" element={<InputGroupPage />} />
              <Route path="/forms/label" element={<LabelPage />} />
              <Route path="/forms/select" element={<SelectPage />} />
              <Route path="/forms/checkbox" element={<CheckboxPage />} />
              <Route path="/forms/radio" element={<RadioPage />} />
              <Route path="/forms/textarea" element={<TextareaPage />} />
              <Route path="/forms/datepicker" element={<DatepickerPage />} />
              <Route path="/forms/fileupload" element={<FileUploadPage />} />
              <Route path="/forms/slider" element={<SliderPage />} />
              <Route path="/forms/switch" element={<SwitchPage />} />

              {/* Form & Input — consolidations & stubs */}
              {/* Toggle merged into Switch (see STEP_2_DECISIONS.md) */}
              <Route path="/forms/toggle" element={<Navigate to="/forms/switch" replace />} />
              <Route path="/forms/combobox" element={<ComboboxPage />} />
              <Route path="/forms/input-otp" element={<InputOtpPage />} />

              {/* ── Data Display — pages with real content ── */}
              <Route path="/cards" element={<CardPage />} />
              <Route path="/ui/table" element={<TablePage />} />
              <Route path="/ui/data-table" element={<DataTablePage />} />
              <Route path="/ui/badges" element={<BadgePage />} />

              {/* Data Display — stubs */}
              <Route path="/ui/tag" element={<TagPage />} />
              <Route path="/ui/avatar" element={<AvatarPage />} />
              <Route path="/ui/list" element={<ListPage />} />
              <Route path="/ui/stat" element={<StatTilePage />} />
              <Route path="/ui/empty-state" element={<EmptyStatePage />} />
              <Route path="/ui/skeleton" element={<SkeletonPage />} />
              <Route path="/ui/tooltip" element={<TooltipPage />} />

              {/* ── Navigation — pages with real content ── */}
              <Route path="/ui/breadcrumb" element={<BreadcrumbDocsPage />} />
              <Route path="/ui/tabs" element={<TabsPage />} />
              <Route path="/ui/stepper" element={<StepperPage />} />
              <Route path="/ui/navigation-menu" element={<MenuPage />} />
              <Route path="/ui/dropdown-menu" element={<UiComponentsPage section="dropdown-menu" />} />
              <Route path="/ui/profile-switcher" element={<ProfileSwitcherPage />} />

              {/* Navigation — consolidations & stubs */}
              {/* Progress Tracker merged into Stepper (see STEP_2_DECISIONS.md) */}
              <Route path="/ui/progress-tracker" element={<ProgressTrackerPage />} />
              <Route path="/ui/card-widget" element={<CardWidgetPage />} />
              <Route path="/patterns/cards" element={<Navigate to="/patterns/cards/kpi-grid" replace />} />
              <Route path="/patterns/cards/kpi-grid" element={<CardKpiGridPage />} />
              <Route path="/patterns/cards/profile-grid" element={<CardProfileGridPage />} />
              <Route path="/patterns/cards/dashboard-mix" element={<CardDashboardMixPage />} />
              <Route path="/patterns/cards/flip-esaad" element={<CardFlipEsaadPage />} />
              <Route path="/ui/sidebar" element={<SidebarDocsPage />} />
              <Route path="/ui/navbar" element={<NavbarPage />} />
              <Route path="/ui/pagination" element={<PaginationPage />} />
              <Route path="/ui/command" element={<CommandPage />} />
              <Route path="/ui/context-menu" element={<ContextMenuPage />} />

              {/* ── Feedback & Overlay — pages with real content ── */}
              <Route path="/ui/alert" element={<AlertPage />} />
              <Route path="/ui/toast" element={<ToastPage />} />
              <Route path="/ui/modal-popups" element={<DialogPage />} />
              <Route path="/ui/drawer" element={<DrawerSheetPage />} />
              <Route path="/ui/progress-bar" element={<ProgressPage />} />

              {/* Feedback & Overlay — consolidations & stubs */}
              {/* Side Drawers merged into Drawer / Sheet (see STEP_2_DECISIONS.md) */}
              <Route path="/ui/side-drawers" element={<Navigate to="/ui/drawer" replace />} />
              <Route path="/ui/banner" element={<BannerPage />} />
              <Route path="/ui/popover" element={<PopoverPage />} />
              <Route path="/ui/hover-card" element={<HoverCardPage />} />
              <Route path="/ui/spinner" element={<SpinnerPage />} />

              {/* ── Layout — pages with real content ── */}
              <Route path="/ui/accordion" element={<AccordionPage />} />

              {/* Layout — stubs */}
              <Route path="/ui/container" element={<ContainerPage />} />
              <Route path="/ui/grid" element={<GridPage />} />
              <Route path="/ui/stack" element={<StackPage />} />
              <Route path="/ui/separator" element={<SeparatorPage />} />
              <Route path="/ui/collapsible" element={<CollapsiblePage />} />
              <Route path="/ui/resizable" element={<ResizablePage />} />
              <Route path="/ui/scroll-area" element={<ScrollAreaPage />} />
              <Route path="/ui/aspect-ratio" element={<AspectRatioPage />} />

              {/* ── Getting Started — all stubs ── */}
              <Route path="/docs/introduction" element={<IntroductionPage />} />
              <Route path="/docs/project-structure" element={<ProjectStructurePage />} />
              <Route path="/docs/installation" element={<InstallationPage />} />
              <Route path="/docs/installation-new" element={<InstallationNewPage />} />
              <Route path="/docs/theming" element={<ThemingPage />} />
              <Route path="/docs/dark-mode" element={<DarkModePage />} />
              <Route path="/docs/typography" element={<Navigate to="/foundations/typography" replace />} />
              <Route path="/docs/changelog" element={<ChangelogPage />} />

              {/* ── Foundations — all stubs ── */}
              <Route path="/foundations/colors" element={<ColorsPage />} />
              <Route path="/foundations/typography" element={<TypographyPage />} />
              <Route path="/foundations/spacing" element={<SpacingPage />} />
              <Route path="/foundations/iconography" element={<IconographyPage />} />
              <Route path="/foundations/elevation" element={<ElevationPage />} />
              <Route path="/foundations/radius" element={<RadiusPage />} />
              <Route path="/foundations/motion" element={<MotionPage />} />
              <Route path="/foundations/accessibility" element={<AccessibilityPage />} />

              {/* ── Off-nav routes preserved for direct access (see STEP_2_DECISIONS.md) ── */}
              <Route path="/icons/huge-icons" element={<IconsPage />} />
              <Route path="/lottie-icons" element={<LottieIconsPage />} />
              <Route path="/page-previews" element={<PagePreviewPage />} />
              <Route path="/animations" element={<AnimationsPage />} />
              <Route path="/animations/bento" element={<BentoDemoPage />} />
              <Route path="/ui/swiper" element={<UiComponentsPage section="swiper" />} />
              <Route path="/forms/text-editor" element={<FormsPage section="text-editor" />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
    </>
  )
}
