import { useEffect, useState } from "react";
import { Box, Chip, MenuItem, Select } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import styles from "./enrollServiceForm.module.css";
import { NameAndValue } from "common/domain/entity/name_and_value";
import { DayOfWeekOptions } from "common/domain/enum/day_of_week_enum";

type ProviderWindowsProps = {
  refresh: (products: string[]) => void;
  selected: string[];
  disable?: boolean;
};

export default function MultiSelectProduct({
  refresh,
  selected,
  disable,
  ...props
}: ProviderWindowsProps) {
  const [product, setProduct] = useState<NameAndValue[]>(DayOfWeekOptions);

  const [productSelected, setProductSelected] = useState<string[]>([]);

  const handleSelectChange = (event: any) => {
    const selectedIds = event.target.value as string[];
    const selectedItems = DayOfWeekOptions.filter((c) =>
      selectedIds.includes(c.value)
    ).map((e) => e.value);
    setProductSelected(selectedItems ?? []);
    refresh(selectedItems ?? []);
  };

  const loadData = async () => {
    setProductSelected(selected ?? []);
  };

  useEffect(() => {
    loadData();
  }, [selected]);
  const handleRemoveDay = (day: string) => {
    setProductSelected((prev) => prev.filter((id) => id !== day));
  };

  return (
    <>
      <div className={styles.formSection}>
        <label className={styles.label} htmlFor="DayOfWeek">
          Preferred Days:
        </label>
        <Select
          disabled={disable}
          fullWidth
          multiple
          value={productSelected}
          onChange={handleSelectChange}
          sx={{
            // Base styling
            display: "flex",
            gap: 0.5,
            color: "rgba(142, 142, 147, 1)",
            border: "1px solid rgba(228, 228, 228, 1) !important",
            borderRadius: "10px",
            background: "#ffffff",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {productSelected.map((id) => {
                const category = product.find((c) => c.value === id);
                return category ? (
                  <Chip
                    key={id}
                    label={category.name}
                    onDelete={() => handleRemoveDay(id)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                ) : null;
              })}
            </Box>
          )}
        >
          {product.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
}
