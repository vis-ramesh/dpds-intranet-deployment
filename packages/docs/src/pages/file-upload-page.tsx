import { useState } from "react"
import { useTranslation } from "react-i18next"

import { FileInput, MultiFileInput } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import {
  CodeBlock,
  ComponentPage,
  PreviewBlock,
  PropsTable,
  RelatedLinks,
  Section,
  UsesTokens,
} from "@/components/docs"
import type { PropRow } from "@/components/docs"

/* ── Snippets ── */

const INSTALL_SNIPPET = `import { FileInput, MultiFileInput } from "@dpds-gov/design-system"`

const SINGLE_USAGE_SNIPPET = `import { FileInput } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function PassportAttachment() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="passport">Passport scan</Label>
      <FileInput
        id="passport"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(file) => console.log(file)}
      />
    </div>
  )
}`

const MULTI_USAGE_SNIPPET = `import { MultiFileInput } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function SupportingDocuments() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="supporting">Supporting documents</Label>
      <MultiFileInput
        id="supporting"
        accept=".pdf,.doc,.docx,.jpg,.png"
        maxFiles={5}
        onChange={(files) => console.log(files)}
      />
    </div>
  )
}`

const SINGLE_PREVIEW_SNIPPET = `<FileInput accept=".pdf,.jpg,.png" />`
const MULTI_PREVIEW_SNIPPET = `<MultiFileInput maxFiles={5} accept=".pdf,.doc,.docx,.jpg,.png" />`

const SINGLE_SNIPPETS = {
  default: `<FileInput />`,
  withAccept: `// Restrict to specific MIME types or extensions.
<FileInput accept=".pdf,.jpg,.png" />`,
  withLabel: `<div className="grid gap-2">
  <Label htmlFor="resume">Resume</Label>
  <FileInput id="resume" accept=".pdf,.doc,.docx" />
</div>`,
  withOnChange: `const [file, setFile] = useState<File | null>(null)

<div className="grid gap-2">
  <FileInput onChange={setFile} />
  <p className="text-xs text-muted-foreground">
    {file ? \`Selected: \${file.name}\` : "No file selected."}
  </p>
</div>`,
  imagesOnly: `// Accept only images. The browser's file picker filters
// by MIME group when you use image/*.
<FileInput accept="image/*" />`,
}

const MULTI_SNIPPETS = {
  default: `<MultiFileInput />`,
  withMaxFiles: `// Hard-cap the number of files the user can add.
<MultiFileInput maxFiles={5} />`,
  withAccept: `<MultiFileInput accept=".pdf,.doc,.docx,.jpg,.png" />`,
  withOnChange: `const [files, setFiles] = useState<File[]>([])

<div className="grid gap-2">
  <MultiFileInput onChange={setFiles} />
  <p className="text-xs text-muted-foreground">
    {files.length === 0
      ? "Drop or pick files."
      : \`\${files.length} file\${files.length === 1 ? "" : "s"} selected.\`}
  </p>
</div>`,
  withLabel: `<div className="grid gap-2">
  <Label htmlFor="docs">Supporting documents</Label>
  <MultiFileInput
    id="docs"
    accept=".pdf,.doc,.docx,.jpg,.png"
    maxFiles={5}
  />
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "FileInput.onChange",
      type: "(file: File | null) => void",
      description: "Fires when the user picks a file or removes the selected one. Null on removal.",
    },
    {
      name: "FileInput.accept",
      type: "string",
      description: "Same as the native <input type=\"file\"> accept — comma-separated extensions (.pdf,.png) or MIME groups (image/*).",
    },
    {
      name: "FileInput.id",
      type: "string",
      description: "DOM id for Label htmlFor association. Also used by the internal hidden input that triggers the file picker.",
    },
    {
      name: "FileInput.className",
      type: "string",
      description: "Classes applied to the outer card container.",
    },
    {
      name: "MultiFileInput.onChange",
      type: "(files: File[]) => void",
      description: "Fires whenever files are added or removed. Receives the full current array.",
    },
    {
      name: "MultiFileInput.accept",
      type: "string",
      description: "Same shape as FileInput.accept. Applies to both the picker and drag-and-drop.",
    },
    {
      name: "MultiFileInput.maxFiles",
      type: "number",
      description: "Hard cap on file count. Extra files dropped or picked beyond the limit are silently ignored.",
    },
    {
      name: "MultiFileInput.id",
      type: "string",
      description: "DOM id for Label htmlFor association.",
    },
    {
      name: "MultiFileInput.className",
      type: "string",
      description: "Classes applied to the drop-zone container.",
    },
  ]
}

/* ── Live demo bits ── */

function SingleWithOnChangeExample() {
  const [file, setFile] = useState<File | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FileInput onChange={setFile} />
      <p className="text-xs text-muted-foreground">
        {file ? `Selected: ${file.name}` : "No file selected."}
      </p>
    </div>
  )
}

function MultiWithOnChangeExample() {
  const [files, setFiles] = useState<File[]>([])
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <MultiFileInput onChange={setFiles} />
      <p className="text-xs text-muted-foreground">
        {files.length === 0
          ? "Drop or pick files."
          : `${files.length} file${files.length === 1 ? "" : "s"} selected.`}
      </p>
    </div>
  )
}

/* ── Page ── */

export default function FileUploadPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.fileUpload.title")}
      description={t("docs.fileUpload.description")}
      category={t("docs.fileUpload.category")}
    >
      <Section title={t("docs.fileUpload.preview.title")} description={t("docs.fileUpload.preview.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.fileUpload.preview.singleLabel")}
            code={SINGLE_PREVIEW_SNIPPET}
          >
            <FileInput accept=".pdf,.jpg,.png" className="max-w-md" />
          </PreviewBlock>
          <PreviewBlock
            title={t("docs.fileUpload.preview.multiLabel")}
            code={MULTI_PREVIEW_SNIPPET}
          >
            <MultiFileInput accept=".pdf,.doc,.docx,.jpg,.png" maxFiles={5} className="max-w-md" />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.fileUpload.installation.title")} description={t("docs.fileUpload.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.fileUpload.installation.filename")} />
      </Section>

      <Section title={t("docs.fileUpload.singleUsage.title")} description={t("docs.fileUpload.singleUsage.description")}>
        <CodeBlock code={SINGLE_USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.fileUpload.multiUsage.title")} description={t("docs.fileUpload.multiUsage.description")}>
        <CodeBlock code={MULTI_USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section
        title={t("docs.fileUpload.singleExamples.title")}
        description={t("docs.fileUpload.singleExamples.description")}
      >
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.fileUpload.singleExamples.default.label")}
            description={t("docs.fileUpload.singleExamples.default.description")}
            code={SINGLE_SNIPPETS.default}
          >
            <FileInput className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.singleExamples.withAccept.label")}
            description={t("docs.fileUpload.singleExamples.withAccept.description")}
            code={SINGLE_SNIPPETS.withAccept}
          >
            <FileInput accept=".pdf,.jpg,.png" className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.singleExamples.withLabel.label")}
            description={t("docs.fileUpload.singleExamples.withLabel.description")}
            code={SINGLE_SNIPPETS.withLabel}
          >
            <div className="grid w-full max-w-md gap-2">
              <Label htmlFor="resume-demo">Resume</Label>
              <FileInput id="resume-demo" accept=".pdf,.doc,.docx" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.singleExamples.withOnChange.label")}
            description={t("docs.fileUpload.singleExamples.withOnChange.description")}
            code={SINGLE_SNIPPETS.withOnChange}
          >
            <SingleWithOnChangeExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.singleExamples.imagesOnly.label")}
            description={t("docs.fileUpload.singleExamples.imagesOnly.description")}
            code={SINGLE_SNIPPETS.imagesOnly}
          >
            <FileInput accept="image/*" className="max-w-md" />
          </PreviewBlock>
        </div>
      </Section>

      <Section
        title={t("docs.fileUpload.multiExamples.title")}
        description={t("docs.fileUpload.multiExamples.description")}
      >
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.fileUpload.multiExamples.default.label")}
            description={t("docs.fileUpload.multiExamples.default.description")}
            code={MULTI_SNIPPETS.default}
          >
            <MultiFileInput className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.multiExamples.withMaxFiles.label")}
            description={t("docs.fileUpload.multiExamples.withMaxFiles.description")}
            code={MULTI_SNIPPETS.withMaxFiles}
          >
            <MultiFileInput maxFiles={5} className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.multiExamples.withAccept.label")}
            description={t("docs.fileUpload.multiExamples.withAccept.description")}
            code={MULTI_SNIPPETS.withAccept}
          >
            <MultiFileInput accept=".pdf,.doc,.docx,.jpg,.png" className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.multiExamples.withOnChange.label")}
            description={t("docs.fileUpload.multiExamples.withOnChange.description")}
            code={MULTI_SNIPPETS.withOnChange}
          >
            <MultiWithOnChangeExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.fileUpload.multiExamples.withLabel.label")}
            description={t("docs.fileUpload.multiExamples.withLabel.description")}
            code={MULTI_SNIPPETS.withLabel}
          >
            <div className="grid w-full max-w-md gap-2">
              <Label htmlFor="docs-demo">Supporting documents</Label>
              <MultiFileInput
                id="docs-demo"
                accept=".pdf,.doc,.docx,.jpg,.png"
                maxFiles={5}
              />
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.fileUpload.props.title")} description={t("docs.fileUpload.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.fileUpload.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.fileUpload.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.fileUpload.accessibility.items.label")}</li>
          <li>{t("docs.fileUpload.accessibility.items.accept")}</li>
          <li>{t("docs.fileUpload.accessibility.items.size")}</li>
          <li>{t("docs.fileUpload.accessibility.items.dragdrop")}</li>
          <li>{t("docs.fileUpload.accessibility.items.feedback")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.fileUpload.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Label", href: "/forms/label" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
