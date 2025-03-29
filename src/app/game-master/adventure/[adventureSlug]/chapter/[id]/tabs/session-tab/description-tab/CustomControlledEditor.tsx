'use client';

import React, { useMemo, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { RawDraftContentState } from 'react-draft-wysiwyg';
// Dynamic import is necessary in order to avoid an import before page is loaded
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://medium.com/@farmaan30327/implementing-wysiwyg-editor-in-nextjs-74f46556379f

type CustomEditorProps = {
  sessionDescription?: RawDraftContentState;
  // This is a bit strange but it doesn't trigger the error "TS71007: Props must be serializable for components in the "use client" entry file"
  // todo dga : understand more about this https://github.com/vercel/next.js/discussions/46795
  onContentStateCallback(description?: RawDraftContentState): void;
};
export function CustomControlledEditor({ sessionDescription, onContentStateCallback }: CustomEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>(
    sessionDescription ? EditorState.createWithContent(convertFromRaw(sessionDescription)) : EditorState.createEmpty(),
  );
  const convertedContent = useMemo(() => convertToRaw(editorState.getCurrentContent()), [editorState]);
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const timeoutId = setTimeout(() => {
      onContentStateCallback(convertedContent);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  return <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />;
}
