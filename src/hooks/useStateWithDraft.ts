import { useCallback, useEffect, useRef, useState } from "react";

export function useStateWithDraft<T>(
  value?: T,
  options?: {
    validator?: (draftValue?: T) => boolean | string;
    format?: (draftValue?: T) => T;
    commit?: (newValue?: T) => void;
  },
) {
  const {
    validator = () => true,
    format = (v: any) => v,
    commit = () => {},
  } = options || {};

  const [editing, setEditing] = useState(false);
  const [draftValue, setDraftValue] = useState<T | undefined>(value);
  const [errorMsg, setErrorMsg] = useState("");

  const draftValueRef = useRef(draftValue);
  draftValueRef.current = draftValue;

  const commitRef = useRef(commit);
  commitRef.current = commit;

  const syncDraftToValue = () => {
    if (draftValueRef.current === value) {
      return;
    }
    const formatedValue = format(draftValueRef.current);
    const passOrErr = validator(formatedValue);
    if (typeof passOrErr === "boolean") {
      commitRef.current(formatedValue);
    } else if (typeof passOrErr === "string") {
      setErrorMsg(passOrErr);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [value]);

  const syncValueToDraft = () => {
    setDraftValue(value);
  };

  const endEdit = useCallback(() => {
    syncDraftToValue();
    setEditing(false);
  }, [draftValue, value]);

  return {
    editing,
    draftValue,
    setDraftValue,
    startEdit: () => {
      setErrorMsg("");
      syncValueToDraft();
      setEditing(true);
    },
    endEdit,
    errorMsg,
  };
}
