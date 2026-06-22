import { Select } from "antd";
import { useStateWithDraft } from "../hooks/useStateWithDraft";
import { isEqual } from "lodash-es";
import React from "react";

const SelectVariableTabelCell: VariableCell<{
  options: Record<string, string>[];
}> = ({
  value,
  onChange,
  validator = () => true,
  format = (v) => v,
  options = [],
}) => {
  const { editing, draftValue, setDraftValue, startEdit, endEdit } =
    useStateWithDraft(value, {
      commit: onChange,
      validator,
      format,
    });
  return (
    <Select
      style={{ width: 200 }}
      variant="filled"
      value={editing ? draftValue : value}
      options={options}
      onChange={(e) => setDraftValue(e)}
      onClick={startEdit}
      onSelect={() => setTimeout(endEdit, 10)}
    />
  );
};

export default React.memo(SelectVariableTabelCell, isEqual);
