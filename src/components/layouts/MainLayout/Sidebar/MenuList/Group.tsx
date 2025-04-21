import { isActiveLink, LinkEnum, sidebarTree } from "common/menu-items";
import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import ItemLink from "components/layouts/MainLayout/Sidebar/MenuList/Item";
import List from "@mui/material/List";

import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

export default function Group() {
  const [selected, setSelected] = useState<number | null>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    handleLinkSelection();
  }, [pathname]);

  const handleLinkSelection = () => {
    for (let idx = 0; idx < sidebarTree.length; idx++) {
      if (
        isActiveLink(sidebarTree[idx].key, pathname) 
      ) {
        setSelected(idx);
        break;
      }
    }
  };

  return (
    <>
      <List
        sx={{
          height: `calc(100vh - 100px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {sidebarTree.map((item, index) => (
            <Fragment key={index}>
              <ItemLink
                item={item.key}
                isGroup={!!item.children.length}
                onClick={() =>
                  setSelected((prev) => (prev === index ? null : index))
                }
                groupSelect={index === selected}
              />
              <Collapse in={index === selected && !!item.children.length}>
                <Box pb="20px">
                  {item.children.map((sub) => (
                    <ItemLink isChild={true} key={sub} item={sub} />
                  ))}
                </Box>
              </Collapse>
            </Fragment>
          ))}
        </Box>
      </List>
    </>
  );
}
