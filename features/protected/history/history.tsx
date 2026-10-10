import { Container, Paper } from "@mui/material";
import HistoryTable from "./h.table/h.table";
import HistoryControllers from "./h.controllers";
import { HistoryProvider } from "./h.hooks";

export default function HistoryTemplate() {
  return (
    <HistoryProvider>
      <Container className="py-15 px-5" component={Paper}>
        <HistoryControllers />
        <HistoryTable />
      </Container>
    </HistoryProvider>
  );
}
