import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetTitle } from "@dpds-gov/design-system"

function IframePreview({ title, src }: { title: string; src: string }) {
  return (
    <CardWidget className="overflow-hidden p-0">
      <CardWidgetHeader className="px-4 py-3 border-b border-border">
        <CardWidgetTitle>{title}</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="p-0">
        <iframe
          src={src}
          title={title}
          className="w-full border-0"
          style={{ height: "calc(100vh - 500px)", minHeight: 500 }}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export default function PagePreviewPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300">
            Page Previews
          </h1>
          <p className="text-sm md:text-2xl text-gray-500">Login &amp; Signup pages rendered in iframe</p>
        </div>

        <div className="grid grid-cols-1 gap-6 ">
          <IframePreview title="Login Page" src="/login" />
          <IframePreview title="Signup Page" src="/signup" />
        </div>
      </main>
    </div>
  )
}
