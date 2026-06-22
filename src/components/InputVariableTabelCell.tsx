import { Input, Space, Typography } from "antd";
import { useStateWithDraft } from "../hooks/useStateWithDraft";
import React from "react";
import { isEqual } from "lodash-es";

const InputVariableTabelCell: VariableCell = ({
  value,
  onChange,
  validator = () => true,
  format = (v) => v,
}) => {
  const { editing, draftValue, setDraftValue, startEdit, endEdit, errorMsg } =
    useStateWithDraft(value, {
      commit: onChange,
      validator,
      format,
    });
  return (
    <Space orientation="vertical">
      <Input
        style={{ width: 200 }}
        variant="filled"
        readOnly={!editing}
        value={editing ? draftValue : value}
        onChange={(e) => {
          setDraftValue(e.target.value);
        }}
        onClick={startEdit}
        onBlur={endEdit}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "enter") {
            e.currentTarget.blur();
            endEdit();
          }
        }}
      />
      {errorMsg?.length > 0 && (
        <Typography.Text type="danger">{errorMsg}</Typography.Text>
      )}
    </Space>
  );
};

export default React.memo(InputVariableTabelCell, isEqual);
