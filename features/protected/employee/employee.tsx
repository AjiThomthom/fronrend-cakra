import { Container } from "@mui/material";
import EmployeeControllers from "./em.controllers/controllers";
import EmployeeAddDialog from "./em.dialogs/e.add";
import TableEmployee from "./em.table/table";
import { EmployeeProvider } from "./em.hooks/em.hooks";
import EmployeDeleteDialogs from "./em.dialogs/e.delete";

export default function EmployeeFeatures() {
  return (
    <Container className="px-5 py-15">
      <EmployeeProvider>
        <EmployeeControllers />
        <TableEmployee />
        <EmployeeAddDialog />
      </EmployeeProvider>
    </Container>
  );
}
