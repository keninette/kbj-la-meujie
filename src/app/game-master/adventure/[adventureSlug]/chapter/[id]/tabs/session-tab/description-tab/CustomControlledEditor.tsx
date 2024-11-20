'use client';

import React, { useEffect, useState } from 'react';
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
  onContentStateCallback: (description?: RawDraftContentState) => void;
};
export function CustomControlledEditor({ sessionDescription, onContentStateCallback }: CustomEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>(
    sessionDescription ? EditorState.createWithContent(convertFromRaw(sessionDescription)) : EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState<RawDraftContentState>();

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  // Use effects
  useEffect(() => {
    if (!editorState.getCurrentContent().hasText()) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setConvertedContent(convertToRaw(editorState.getCurrentContent()));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [editorState]);

  // todo improve dependencies no ?
  useEffect(() => {
    onContentStateCallback(convertedContent);
  }, [convertedContent, onContentStateCallback, sessionDescription]);

  return <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />;
}
