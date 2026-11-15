"use client";

import { Node } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import type { DOMOutputSpec } from "@tiptap/pm/model";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  Underline,
} from "@primeicons/react";
import { Controller, useFormContext } from "react-hook-form";
import { Suspense } from "react";
import type { ReactNode } from "react";
import type { AddProductFormData } from "../../types";
import VideoIcon, { videoIconPath } from "./Icons/VideoIcon";
import FileIcon, { fileIconPath } from "./Icons/File";

import styles from "./MainSection.module.scss";

export interface MainSectionProps {
  name: "name" | "cardName";
  labelName: string;
  description: "description" | "cardDescription";
  labelDescription: string;
  nameRules?: FieldRules;
  descriptionRules?: FieldRules;
}

interface FieldRules {
  required?: string;
  maxLength?: { value: number; message: string };
}

const InlineSvgIcon = Node.create({
  name: "inlineSvgIcon",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      icon: {
        default: "video",
        parseHTML: (element) => element.getAttribute("data-inline-svg-icon"),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-inline-svg-icon]" }];
  },

  renderHTML({ node }) {
    const icon: "video" | "pdf" = node.attrs.icon === "pdf" ? "pdf" : "video";
    const svgPaths: Record<"video" | "pdf", DOMOutputSpec[]> = {
      video: [
        [
          "path",
          {
            d: videoIconPath,
            "stroke-width": "2",
            "stroke-linecap": "round",
            stroke: "#D60D21",
          },
        ],
      ],
      pdf: [
        [
          "path",
          {
            d: fileIconPath,
            "stroke-width": "2",
            "stroke-linecap": "round",
            stroke: "#D60D21",
          },
        ],
      ],
    };

    return [
      "span",
      {
        "data-inline-svg-icon": icon,
        contenteditable: "false",
        role: "img",
        "aria-label": icon === "video" ? "Іконка відео" : "Іконка PDF",
      },
      [
        "http://www.w3.org/2000/svg svg",
        {
          width: icon === "pdf" ? "13" : "16",
          height: "16",
          viewBox: icon === "pdf" ? "0 0 13 16" : "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
        },
        ...svgPaths[icon],
      ],
    ];
  },
});

const MainSection = ({
  name,
  labelName,
  description,
  labelDescription,
  nameRules,
  descriptionRules,
}: MainSectionProps) => {
  const { control, register, formState: { errors } } =
    useFormContext<AddProductFormData>();
  const nameError = errors[name]?.message;

  return (
    <div className={styles.section}>
      <label className={styles.field} htmlFor={name}>
        <span>{labelName}</span>
        <input
          id={name}
          className={styles.input}
          type="text"
          {...register(name, nameRules)}
        />
        {nameError && <span role="alert" className={styles.error}>{nameError}</span>}
      </label>

      <Controller
        control={control}
        name={description}
        rules={{
          required: descriptionRules?.required,
          validate: (html?: string) => {
            const maxLength = descriptionRules?.maxLength;
            if (!maxLength || !html) return true;

            const document = new DOMParser().parseFromString(html, "text/html");
            const iconCount = document.querySelectorAll(
              "[data-inline-svg-icon]",
            ).length;
            document
              .querySelectorAll("[data-inline-svg-icon] svg")
              .forEach((svg) => svg.remove());
            const characterCount = (document.body.textContent ?? "").length + iconCount;

            return (
              characterCount <= maxLength.value || maxLength.message
            );
          },
        }}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Suspense fallback={<DescriptionEditorFallback label={labelDescription} />}>
            <DescriptionEditor
              label={labelDescription}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
            />
          </Suspense>
        )}
      />
    </div>
  );
};

const DescriptionEditorFallback = ({ label }: { label: string }) => (
  <div className={styles.field}>
    <span>{label}</span>
    <div className={styles.editor} aria-hidden="true">
      <div className={styles.editorContent} />
    </div>
  </div>
);

interface DescriptionEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errorMessage?: string;
}

const DescriptionEditor = ({
  label,
  value,
  onChange,
  onBlur,
  errorMessage,
}: DescriptionEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        link: false,
        orderedList: false,
        strike: false,
      }),
      InlineSvgIcon,
    ],
    content: value,
    editorProps: {
      attributes: {
        "aria-label": label,
      },
      transformPastedHTML: (html) => {
        const document = new DOMParser().parseFromString(html, "text/html");
        document
          .querySelectorAll("img, video, audio, iframe, source, object, embed")
          .forEach((media) => media.remove());
        return document.body.innerHTML;
      },
      handlePaste: (_view, event) => {
        const hasMediaFile = Array.from(event.clipboardData?.files ?? []).some(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("video/"),
        );

        if (!hasMediaFile) return false;
        event.preventDefault();
        return true;
      },
      handleDrop: (_view, event) => {
        const hasMediaFile = Array.from(event.dataTransfer?.files ?? []).some(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("video/"),
        );

        if (!hasMediaFile) return false;
        event.preventDefault();
        return true;
      },
    },
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
    onBlur,
  });

  const addInlineIcon = (icon: "video" | "pdf") => {
    editor
      ?.chain()
      .focus()
      .insertContent({ type: "inlineSvgIcon", attrs: { icon } })
      .run();
  };

  return (
    <div className={styles.field}>
      <span>{label}</span>
      {errorMessage && <span role="alert" className={styles.error}>{errorMessage}</span>}
      <div className={styles.editor}>
        <div
          className={styles.toolbar}
          role="toolbar"
          aria-label="Форматування тексту"
        >
          <ToolbarButton
            label="Bold"
            editor={editor}
            active={() => editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            editor={editor}
            active={() => editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            editor={editor}
            active={() => editor?.isActive("underline")}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Заголовок H1"
            editor={editor}
            active={() => editor?.isActive("heading", { level: 1 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Заголовок H2"
            editor={editor}
            active={() => editor?.isActive("heading", { level: 2 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Заголовок H3"
            editor={editor}
            active={() => editor?.isActive("heading", { level: 3 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={18} />
          </ToolbarButton>
          <span className={styles.separator} />
          <ToolbarButton
            label="Маркований список"
            editor={editor}
            active={() => editor?.isActive("bulletList")}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            label="Вставити SVG-іконку відео"
            editor={editor}
            onClick={() => addInlineIcon("video")}
          >
            <VideoIcon />
          </ToolbarButton>
          <ToolbarButton
            label="Вставити SVG-іконку PDF"
            editor={editor}
            onClick={() => addInlineIcon("pdf")}
          >
            <FileIcon />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} className={styles.editorContent} />
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  label: string;
  editor: Editor | null;
  active?: () => boolean | undefined;
  onClick: () => void;
  children: ReactNode;
}

const ToolbarButton = ({
  label,
  editor,
  active,
  onClick,
  children,
}: ToolbarButtonProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    aria-pressed={Boolean(active?.())}
    disabled={!editor}
    className={active?.() ? styles.toolbarButtonActive : styles.toolbarButton}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    {children}
  </button>
);

export default MainSection;
