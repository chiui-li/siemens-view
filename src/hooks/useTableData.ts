import { useCallback, useMemo, useState } from "react";
import type { RowDataModel } from "../constants";
import { uniqueId } from "lodash-es";

export default function useTableData() {
  const [list, setList] = useState<RowDataModel[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const names = useMemo(
    () => list.filter((m) => m.name).map((i) => i.name!),
    [list],
  );

  const updateRow = useCallback(
    (targetIndex: number, rowData: RowDataModel) => {
      setList((v) => {
        return v.map((row, index) => {
          return index === targetIndex ? rowData : row;
        });
      });
    },
    [],
  );
  const addRow = useCallback(() => {
    setList((v) => v.concat({ key: uniqueId("row") } as RowDataModel));
  }, []);

  const delRow = useCallback(() => {
    setList((v) => {
      return v
        .filter((i) => !selected?.includes(i.key!))
        .map((i) => {
          return i;
        });
    });
  }, [selected]);

  return {
    list,
    selected,
    setSelected,
    updateRow,
    addRow,
    delRow,
    names,
  };
}
