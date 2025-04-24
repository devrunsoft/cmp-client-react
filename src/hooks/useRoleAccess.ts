import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";
import { LinkEnum, mapLinkInfo } from "common/menu-items";
import { useAppDispatch, useAppSelector } from "state/index";
import { setRepresentation } from "state/slice/representation";

type UseRoleAccessReturnType = {
  checkCount: (_: LinkEnum) => number;
  refreshRep: () => void;
};

export default function useRoleAccess(): UseRoleAccessReturnType {
  const rep = useAppSelector((state) => state.representation);
  const dispatch = useAppDispatch();
  function refreshRep() {
    dispatch(setRepresentation({} as ClientRepresentationEntity));
  }

  function checkCount(id: LinkEnum): number {
    const info = mapLinkInfo[id]; // Get the menu item info
    if (!info?.countKey) return 0; // Ensure countKey exists
    return rep?.[info.countKey as keyof ClientRepresentationEntity] || 0;
  }

  return { checkCount, refreshRep };
}
