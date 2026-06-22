import "./VarTable.css";
import { Button, Space, Table } from "antd";
import {
  DataTypeConstants,
  DataTypeOptions,
  type DataType,
  type RowDataModel,
} from "./constants";
import type { ColumnsType } from "antd/es/table";
import InputVariableTabelCell from "./components/InputVariableTabelCell";
import SelectVariableTabelCell from "./components/SelectVariableTabelCell";
import { validName } from "./utils/validator";
import useTableData from "./hooks/useTableData";

function VarTable() {
  const { list, updateRow, names, addRow, selected, setSelected, delRow } =
    useTableData();

  const cols = [
    {
      title: "Index",
      dataIndex: "key",
      key: "key",
      render(_, __, index) {
        return index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render(value, row, index) {
        return (
          <InputVariableTabelCell
            onChange={(v) => {
              updateRow(index, { ...row, name: v });
            }}
            value={value}
            validator={(v) => {
              if (v.length === 0) {
                return `name 不能为空`;
              }
              return validName(v, names) ? true : `${v} 已经存在`;
            }}
          />
        );
      },
    },
    {
      title: "Data Type",
      dataIndex: "dataType",
      key: "dataType",
      render(value, row, index) {
        return (
          <SelectVariableTabelCell
            onChange={(v?: string) => {
              console.log("rowiner", row);
              updateRow(index, {
                ...row,
                dataType: v as DataType,
                defaultValue: DataTypeConstants[v as DataType]?.defaultValue,
              });
            }}
            options={DataTypeOptions}
            value={value}
          />
        );
      },
    },
    {
      title: "defult Value",
      dataIndex: "defaultValue",
      key: "defaultValue",
      render(value, row, index) {
        const dataType = row?.dataType;
        const constants = DataTypeConstants[dataType!];
        return (
          <InputVariableTabelCell
            onChange={(v) => {
              updateRow(index, { ...row, defaultValue: v });
            }}
            value={value}
            format={constants?.format}
            validator={(v) =>
              constants?.validator?.(v) || !v ? true : constants.errorMsg
            }
          />
        );
      },
    },
    {
      title: "comment",
      dataIndex: "comment",
      key: "comment",
      render(value, row, index) {
        return (
          <InputVariableTabelCell
            onChange={(v) => {
              updateRow(index, { ...row, comment: v });
            }}
            value={value}
          />
        );
      },
    },
  ] as ColumnsType<RowDataModel>;

  return (
    <>
      <div className="table-container">
        <Space>
          <Button onClick={addRow}>新增</Button>
          <Button
            onClick={() => {
              delRow();
              setSelected([]);
            }}
          >
            删除
          </Button>
        </Space>
        <Table<RowDataModel>
          rowSelection={{
            selectedRowKeys: selected,
            onChange(selectedRowKeys) {
              setSelected(selectedRowKeys as string[]);
            },
          }}
          rowKey="key"
          pagination={false}
          dataSource={list}
          columns={cols}
        />
      </div>
    </>
  );
}

export default VarTable;
