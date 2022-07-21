import { useEffect } from "react";
import { Box } from "@mui/material";
import { useBackgroundClient } from "@coral-xyz/recoil";
import { UI_RPC_METHOD_KEYRING_RESET } from "@coral-xyz/common";
import {
  Header,
  HeaderIcon,
  SubtextParagraph,
  DangerButton,
  SecondaryButton,
} from "../../common";
import { WarningIcon } from "../../Icon";
import { useNavStack } from "../../Layout/NavStack";
import { useDrawerContext } from "../../Layout/Drawer";

export function ResetWarning() {
  const background = useBackgroundClient();
  const nav = useNavStack();
  const { close } = useDrawerContext();
  const onNext = async () => {
    await background.request({
      method: UI_RPC_METHOD_KEYRING_RESET,
      params: [],
    });
  };
  useEffect(() => {
    nav.setTitle("");
    nav.setStyle({ borderBottom: "none" });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ margin: "0 24px" }}>
        <HeaderIcon icon={<WarningIcon />} />
        <Header text="Reset your secret recovery phrase" />
        <SubtextParagraph>
          This will remove all wallets and replace them with a new wallet.
          Ensure you have your existing secret recovery phrase and private keys
          saved.
        </SubtextParagraph>
      </Box>
      <Box
        sx={{
          marginLeft: "16px",
          marginRight: "16px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "167.5px" }}>
          <SecondaryButton label="Cancel" onClick={close} />
        </Box>
        <Box sx={{ width: "167.5px" }}>
          <DangerButton label="Reset" onClick={() => onNext()} />
        </Box>
      </Box>
    </Box>
  );
}